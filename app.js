let listaDeNumerosAleatorios = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAletorio();
let tentativas = 1;

function criarTexto(tag, frase){
    let campo = document.querySelector(tag);
    campo.innerHTML = frase;
    responsiveVoice.speak(frase, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial (){
    criarTexto("h1", "Jogo do número secreto");
    criarTexto("p", "Escolha um número entre 1 e 100: ");
}

exibirMensagemInicial();
exibirMensagemInicial();

function gerarNumeroAletorio(){
    let numeroEscolhido = parseInt(Math.random()* numeroLimite + 1);
    let quantidadeElementosLista = listaDeNumerosAleatorios.length;

    if (quantidadeElementosLista == numeroLimite){
        listaDeNumerosAleatorios = [];
    }

    if (listaDeNumerosAleatorios.includes(numeroEscolhido)) {
        return gerarNumeroAletorio();
    } else {
        listaDeNumerosAleatorios.push(numeroEscolhido);
        console.log(listaDeNumerosAleatorios);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function verificarChute() {
    let chute = parseInt(document.querySelector("input").value);
    if (chute == numeroSecreto){
        criarTexto("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let  mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        criarTexto("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto){
        criarTexto("h1", "Errou!");
        criarTexto("p", "O número secreto é menor");
        } else {
        criarTexto("h1", "Errou");
        criarTexto("p", "O número secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAletorio();
    limparCampo(); 
    tentativas = 1;
    exibirMensagemInicial();
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true)
}