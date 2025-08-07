const palavras = ["PROGRAMACAO", "JAVASCRIPT", "FORCA", "TECLADO", "COMPUTADOR"];
let palavraSecreta;
let letrasCertas;
let tentativas;
const maxTentativas = 6;

const palavraElemento = document.getElementById("palavra");
const forcaImgElemento = document.getElementById("forca-img");
const tecladoElemento = document.getElementById("teclado");
const mensagemElemento = document.getElementById("mensagem");
const reiniciarBtn = document.getElementById("reiniciar-btn");

function escolherPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)];
}

function inicializarJogo() {
    palavraSecreta = escolherPalavra();
    letrasCertas = Array(palavraSecreta.length).fill("_");
    tentativas = 0;

    atualizarPalavraNaTela();
    atualizarForca();
    criarTeclado();
    mostrarMensagem("");
    reiniciarBtn.style.display = "none";
}

function atualizarPalavraNaTela() {
    palavraElemento.textContent = letrasCertas.join(" ");
}

function atualizarForca() {
    forcaImgElemento.src = `img/forca-${tentativas}.png`;
}

function criarTeclado() {
    tecladoElemento.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i);
        const botao = document.createElement("button");
        botao.textContent = letra;
        botao.addEventListener("click", () => jogar(letra));
        tecladoElemento.appendChild(botao);
    }
}

function jogar(letra) {
    if (palavraSecreta.includes(letra)) {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (palavraSecreta[i] === letra) {
                letrasCertas[i] = letra;
            }
        }
    } else {
        tentativas++;
    }

    atualizarPalavraNaTela();
    atualizarForca();
    verificarFimDeJogo();
    desabilitarBotao(letra);
}

function desabilitarBotao(letra) {
    const botoes = tecladoElemento.querySelectorAll("button");
    botoes.forEach(botao => {
        if (botao.textContent === letra) {
            botao.disabled = true;
        }
    });
}

function verificarFimDeJogo() {
    if (letrasCertas.join("") === palavraSecreta) {
        mostrarMensagem("Parabéns! Você venceu!");
        finalizarJogo();
    } else if (tentativas >= maxTentativas) {
        mostrarMensagem(`Você perdeu! A palavra era: ${palavraSecreta}`);
        finalizarJogo();
    }
}

function mostrarMensagem(texto) {
    mensagemElemento.textContent = texto;
}

function finalizarJogo() {
    const botoes = tecladoElemento.querySelectorAll("button");
    botoes.forEach(botao => botao.disabled = true);
    reiniciarBtn.style.display = "block";
}

reiniciarBtn.addEventListener("click", inicializarJogo);

inicializarJogo();