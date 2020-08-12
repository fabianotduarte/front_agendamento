var valor=0;

function mudavalor(){
    valor++;
    document.getElementById("textoAModificar").innerHTML = "Valor Atual = "+valor;

}

function recuperaDoBanco(){
    fetch("http://localhost:8088/agencias")
        .then(res => res.json())                  // aqui vou extrair o "JSON" que veio no body
        .then(bodyjson => preencheHTML(bodyjson))  // se deu certo essa extração, chamo a função pra preencher
}

function preencheHTML(bodyjson){
    // nesta função eu recebo uma lista
    // como percorrer a lista??
    var textoHTML="";
    for (i=0; i<bodyjson.length; i++){
        var agencia = bodyjson[i];  
        textoHTML = textoHTML + agencia.nome+ " abertura: "+agencia.horaInicio+" fechamento:"+agencia.horaFim+"<br>";

    }
    document.getElementById("textoAModificar").innerHTML = textoHTML;


}