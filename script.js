const palavras = {
  facil: ['app', 'bug', 'html', 'css'],
  medio: ['android', 'backend', 'firebase'],
  dificil: ['asynchronous', 'dependency', 'injection']
};

let nivel = localStorage.getItem('nivel') || 'facil';
let palavra = palavras[nivel][Math.floor(Math.random() * palavras[nivel].length)].toUpperCase();
let acertos = [];
let erros = [];
let pontos = 30;

const palavraDiv = document.getElementById('palavra');
const letrasDiv = document.getElementById('letras');
const errosDiv = document.getElementById('erros');
const pontosDiv = document.getElementById('pontos');
const mensagemDiv = document.getElementById('mensagem');

function mostrarPalavra() {
  palavraDiv.innerHTML = palavra.split('').map(l => acertos.includes(l) ? l : '_').join(' ');
}

function criarTeclado() {
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const btn = document.createElement('button');
    btn.textContent = letra;
    btn.onclick = () => verificarLetra(letra, btn);
    letrasDiv.appendChild(btn);
  }
}

function verificarLetra(letra, btn) {
  btn.disabled = true;
  if (palavra.includes(letra)) {
    acertos.push(letra);
  } else {
    erros.push(letra);
    pontos -= 5;
  }
  atualizar();
}

function atualizar() {
  mostrarPalavra();
  errosDiv.textContent = 'Erros: ' + erros.join(', ');
  pontosDiv.textContent = 'Pontos: ' + pontos;

  if (pontos <= 0) {
    mensagemDiv.textContent = '💥 Game Over!';
    desativarTeclado();
  } else if (palavra.split('').every(l => acertos.includes(l))) {
    mensagemDiv.textContent = '🎉 Você venceu!';
    desativarTeclado();
  }
}

function desativarTeclado() {
  document.querySelectorAll('#letras button').forEach(btn => btn.disabled = true);
}

function reiniciar() {
  location.href = 'index.html';
}

mostrarPalavra();
criarTeclado();

