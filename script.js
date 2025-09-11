const palavrasOriginais = {
  facil: ['app', 'bug', 'html', 'css', 'api'],
  medio: ['android', 'backend', 'firebase', 'flutter'],
  dificil: ['asynchronous', 'dependency', 'injection', 'typescript']
};

// Recupera palavras restantes do localStorage ou inicia com todas
let palavrasRestantes = JSON.parse(localStorage.getItem('palavrasRestantes')) || JSON.parse(JSON.stringify(palavrasOriginais));

let nivel = localStorage.getItem('nivel') || 'facil';

// Se não houver mais palavras, reinicia a lista
if (palavrasRestantes[nivel].length === 0) {
  palavrasRestantes[nivel] = [...palavrasOriginais[nivel]];
}

let indice = Math.floor(Math.random() * palavrasRestantes[nivel].length);
let palavra = palavrasRestantes[nivel][indice].toUpperCase();

// Remove a palavra usada
palavrasRestantes[nivel].splice(indice, 1);
localStorage.setItem('palavrasRestantes', JSON.stringify(palavrasRestantes));

let acertos = [];
let erros = [];
let pontos = 30;

const palavraDiv = document.getElementById('palavra');
const letrasDiv = document.getElementById('letras');
const errosDiv = document.getElementById('erros');
const pontosDiv = document.getElementById('pontos');
const mensagemDiv = document.getElementById('mensagem');
const selosDiv = document.getElementById('selos');

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
    if (!acertos.includes(letra)) {
      acertos.push(letra);
      pontos += 2;
    }
  } else {
    if (!erros.includes(letra)) {
      erros.push(letra);
      pontos -= 5;
    }
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
    mensagemDiv.innerHTML = '🎉 Você venceu!<br><span class="selo">🏅 Selo conquistado!</span>';
    adicionarSelo();
    desativarTeclado();
  }
}

function adicionarSelo() {
  let selos = localStorage.getItem('selos') || '';
  selos += '🏅 ';
  localStorage.setItem('selos', selos);
  selosDiv.textContent = 'Selos: ' + selos;
}

function desativarTeclado() {
  document.querySelectorAll('#letras button').forEach(btn => btn.disabled = true);
}

function reiniciar() {
  location.href = 'index.html';
}

mostrarPalavra();
criarTeclado();
selosDiv.textContent = 'Selos: ' + (localStorage.getItem('selos') || '');
