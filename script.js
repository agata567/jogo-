const palavraSecreta = "copo";
let palavraAtual = ["_", "_", "_", "_"];
let pontuacao = 0;

document.getElementById("palavra").textContent = palavraAtual.join(" ");

function verificarLetra() {
  const letra = document.getElementById("letra").value.toLowerCase();
  let acertou = false;

  for (let i = 0; i < palavraSecreta.length; i++) {
    if (palavraSecreta[i] === letra && palavraAtual[i] === "_") {
      palavraAtual[i] = letra;
      acertou = true;
    }
  }

  if (acertou) {
    document.getElementById("acerto").play();
    pontuacao += 10;
    document.getElementById("mensagem").textContent = "Acertou!";
  } else {
    document.getElementById("erro").play();
    pontuacao -= 5;
    document.getElementById("mensagem").textContent = "Errou!";
  }

  document.getElementById("palavra").textContent = palavraAtual.join(" ");
  document.getElementById("pontuacao").textContent = pontuacao;
  atualizarRanking();
  document.getElementById("letra").value = "";
}

function atualizarRanking() {
  const melhor = localStorage.getItem("melhorPontuacao") || 0;
  if (pontuacao > melhor) {
    localStorage.setItem("melhorPontuacao", pontuacao);
  }
  document.getElementById("ranking").textContent = localStorage.getItem("melhorPontuacao");
}
