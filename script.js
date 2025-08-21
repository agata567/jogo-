const palavrasFacil = ["HTML", "CSS", "JAVA", "LINUX", "IOS"];
const palavrasMedio = ["PYTHON", "REACT", "NODEJS", "GITHUB", "FRONTEND"];
const palavrasDificil = [
  "AUTENTICACAO", "ENCRIPTACAO", "CIBERSEGURANCA",
  "COMPILADOR", "PROCESSADOR", "ALGORITMO", "INTELIGENCIA",
  "MACHINELEARNING", "DATABASE", "FRAMEWORK"
];

let palavraSecreta;
let letrasCertas;
let letrasErradas;
let tentativas;
let pontos;
let jogadorAtual = 1;
const maxTentativas = 6;

const palavraElemento = document.getElementById("palavra");
const forcaImgElemento = document.getElementById("forca-img");
const tecladoElemento = document.getElementById("teclado");
const mensagemElemento = document.getElementById("mensagem");
const reiniciarBtn = document.getElementById("reiniciar-btn");
const letrasErradasElemento = document.getElementById("letras-erradas");
const pontuacaoElemento = document.getElementById("pontuacao");
const jogadorElemento = document.getElementById("jogador-atual");

function escolherPalavra() {
  const nivel = document.getElementById("nivel").value;
  let lista;
  if (nivel === "facil") lista = palavrasFacil;
  else if (nivel === "medio") lista = palavrasMedio;
  else lista = palavrasDificil;
  return lista[Math.floor(Math.random() * lista.length)];
}

function inicializarJogo() {
  palavraSecreta = escolherPalavra();
  letrasCertas = Array(palavraSecreta.length).fill("_");
  letrasErradas = [];
  tentativas = 0;
  pontos = 0;
  jogadorAtual = 1;

  atualizarPalavraNaTela();
  atualizarForca();
  atualizarLetrasErradas();
  atualizarPontuacao();
  atualizarJogador();
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

function atualizarLetrasErradas() {
  letrasErradasElemento.textContent = "Letras erradas: " + letrasErradas.join(", ");
}

function atualizarPontuacao() {
  pontuacaoElemento.textContent = "Pontuação: " + pontos;
}

function atualizarJogador() {
  jogadorElemento.textContent = "Jogador: " + jogadorAtual;
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
  if (letrasCertas.includes(letra) || letrasErradas.includes(letra)) return;

  if (palavraSecreta.includes(letra)) {
    let acertos = 0;
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (palavraSecreta[i] === letra && letrasCertas[i] !== letra) {
        letrasCertas[i] = letra;
        acertos++;
      }
    }
    pontos += acertos * 10;
  } else {
    letrasErradas.push(letra);
    tentativas++;
    pontos -= 5;
  }

  atualizarPalavraNaTela();
  atualizarForca();
  atualizarLetrasErradas();
  atualizarPontuacao();
  verificarFimDeJogo();
  desabilitarBotao(letra);
  alternarJogador();
}

function desabilitarBotao(letra) {
  const botoes = tecladoElemento.querySelectorAll("button");
  botoes.forEach(botao => {
    if (botao.textContent === letra) {
      botao.disabled = true;
    }
  });
}

function alternarJogador() {
  jogadorAtual = jogadorAtual === 1 ? 2 : 1;
  atualizarJogador();
}

function verificarFimDeJogo() {
  if (letrasCertas.join("") === palavraSecreta) {
    mostrarMensagem("🎉 Parabéns! Você venceu!");
    finalizarJogo();
  } else if (tentativas >= maxTentativas) {
    mostrarMensagem(`😢 Você perdeu! A palavra era: ${palavraSecreta}`);
    finalizarJogo();
  }
}

function mostrarMensagem(texto) {
  mensagemElemento.textContent = texto;
}

function finalizarJogo() {
