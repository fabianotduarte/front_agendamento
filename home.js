/* qual o objetivo dessa função? 
   1 - acessar o localStorage e ver se existe um item chamado ScheduleUSER
       se tiver, recupera, trata e usa as informações para preencher as lacunas dos dados do 
       usuario
   2 - se não existir esse item? retorna para o index (sinal que não tem usuário conectado)

*/

var templateFoto = `<img src="{{LINKFOTO}}" width="100%">`;
var templateInfo = `Nome: {{NOME}} <br>
                    Email: {{EMAIL}} <br>
                    RACF: {{RACF}} <br>
                    Funcional: {{FUNCIONAL}} <br>
                    Departamento: {{DEPARTAMENTO}} / {{UNIDADE}}`;
function carregarInfoUsuario(){
    var userSTR = localStorage.getItem("ScheduleUSER");
    if (!userSTR){    // o objeto não existe no Local Storage
        window.location = "index.html";
    }
    else{
        // vou ter que converter de STRING para Objeto
        var user = JSON.parse(userSTR);

        document.getElementById("fotoUSER").innerHTML = templateFoto.replace("{{LINKFOTO}}",user.linkFoto);

        var infoUser = templateInfo.replace("{{NOME}}", user.nome)
                                   .replace("{{EMAIL}}", user.email)
                                   .replace("{{RACF}}",  user.racf)        
                                   .replace("{{FUNCIONAL}}", user.funcional)
                                   .replace("{{DEPARTAMENTO}}", user.depto.nome)    
                                   .replace("{{UNIDADE}}", user.depto.unidade);
        document.getElementById("infoUSER").innerHTML = infoUser;  
        
        // agora vou carregar os dados da agencia
        carregaAgencias();
    }


}

    

function carregaAgencias(){
   fetch("http://localhost:8088/agencias")
    .then(res => res.json())    // equivale a var res = fetch
    .then(listaAgencias => preencheComboBox(listaAgencias)); // equivale a combinar a linha anterior com listaAgencia = res.json()

    /*
    var res = fetch("......");
    var listaAgencias = res.json();
    preencheComboBox(listaAgencias);
    */
}

function preencheComboBox(listaAgencias){
    var templateSelect = `<select class="form-control" id="selectAg"> {{OPCOES}} </select> `;
    var templateOption = `<option value="{{VALOR}}"> {{NOME}} </option>`;
    
    var opcoes = "";
    for (i=0; i<listaAgencias.length; i++){
        var ag = listaAgencias[i];
        opcoes = opcoes + templateOption.replace("{{VALOR}}", ag.id)
                                        .replace("{{NOME}}", ag.nome);
    }
    var novoSelect = templateSelect.replace("{{OPCOES}}", opcoes);
    document.getElementById("optionAgencia").innerHTML = novoSelect;
}

function gerarRelatorio(){
    // para saber se tá todo mundo "checado"
    var combinacao = 0;
    if (document.getElementById("selectAgencia").checked){
        combinacao = combinacao + 1;
    } 
    if (document.getElementById("selectData").checked){
        combinacao = combinacao + 2;
    } 
    if (document.getElementById("selectCliente").checked){
        combinacao = combinacao + 4;
    } 
    console.log("Combinacao = "+combinacao);
   
    var op = document.getElementById("selectAg");
    console.log(op.options[op.selectedIndex].value);
    console.log(document.getElementById("txtData").value);
    console.log(document.getElementById("txtCliente").value);

    var url = "http://localhost:8088/agendamentos";
    // preciso complementar todas as URL 
    if (combinacao == 0){
        url = url + "/todos";
    }
    else if (combinacao == 1){
        url = url + "/filtrarporagencia?agencia="+document.getElementById("selectAg").value;
    }
    else if (combinacao == 2){
        
    }
    else if (combinacao == 3){

    }
    else if (combinacao == 4){
        
    }
    else if (combinacao == 5){
        
    }
    else if (combinacao == 6){
        
    }
    else if (combinacao == 7){
        
    }


    fetch(url)
       .then(res => res.json())
       .then(res => preencheRelatorio(res));
}

function preencheRelatorio(res){
    var templateLinha = `<div class="row">
                <div class="col-1"> {{PROTO}} </div>
                <div class="col-2"> {{CLI}} </div>
                <div class="col-2"> {{EMAIL}} </div>
                <div class="col-2"> {{CEL}} </div>
                <div class="col-1"> {{AG}} </div>
                <div class="col-2"> {{DATAHORA}} </div>
                <div class="col-2"> {{OBS}} </div>
       </div>`;

       var rel = "";
       for (i=0;i<res.length; i++){
           var ag = res[i];
           rel += templateLinha.replace("{{PROTO}}", ag.numSeq)
                               .replace("{{CLI}}", ag.nomeCliente)
                               .replace("{{EMAIL}}", ag.emailCliente)
                               .replace("{{CEL}}", ag.celularCliente)
                               .replace("{{AG}}", ag.agencia.nome)
                               .replace("{{DATAHORA}}", ag.dataAgendamento+"-"+ag.horaAgendamento)
                               .replace("{{OBS}}", ag.observacoes);
       }
       document.getElementById("relatorio").innerHTML = rel;
}

function logout(){
    localStorage.removeItem("ScheduleUSER");
    window.location = "index.html";
}