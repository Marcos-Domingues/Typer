var tempoInicial = $("#sec").text()
var digitacao = $("#digitacao")

$(function () {
  atualizaTamanhoFrase();
  contadorCampo();
  iniciaCronometro();
  $("#reiniciar").click(reiniciaJogo);
  inicializaMarcadores();
});

// Contador de palavras no pre-texto
function atualizaTamanhoFrase() {
  var palavras = $("#lorem").text();
  var numDePalavras = palavras.split(" ")
  var numText = numDePalavras.length
  $("#contadorDePalavras").text(numText)
};
// Contador do campo

function contadorCampo() {
  digitacao.on("input", function () {
    var conteudo = digitacao.val()
    var passarValor = conteudo.split(/\S+/).length - 1;
    var caracterCount = conteudo.length
    $("#letras").text(caracterCount)
    $("#palavras").text(passarValor)
  })
};

//tempo e desabilitar o campo


function iniciaCronometro() {
  var tempoRestante = $("#sec").text()
  digitacao.one("focus", function () {
    var limpa = setInterval(function () {
      tempoRestante--;
      $("#sec").text(tempoRestante);
      if (tempoRestante < 1) {
        clearInterval(limpa)
        finalizaJogo();
      }
    }, 1000);
  });
}

function inicializaMarcadores() {

  var frase = $("#lorem").text();
  digitacao.on("input", function () {
    var digitado = digitacao.val();
    var comparavel = frase.substr(0, digitado.length);
    console.log("Digitado:" + digitado);
    console.log("Frase C.:" + comparavel);
    if (digitado == comparavel) {
      digitacao.addClass("borda-verde");
      digitacao.removeClass("borda-vermelha");
    } else {
      digitacao.addClass("borda-vermelha");
      digitacao.removeClass("borda-verde");
    }
  });
}

function finalizaJogo() {
  inserePlacar();
  digitacao.attr("disabled", true)
  digitacao.toggleClass("campo-desabilitado")

}

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Marcos";
  var numPalavras = $("#palavras").text();
  var linha = "<tr>" +
    "<td>" + usuario + "</td>" +
    "<td>" + numPalavras + "</td>" +
    "</tr>";

  corpoTabela.append(linha);
}

//reiniciar jogo
function reiniciaJogo() {
  digitacao.attr("disabled", false);
  digitacao.val(null);
  $("#palavras").text("0");
  $("#letras").text("0");
  $("#sec").text(tempoInicial);
  iniciaCronometro();
  digitacao.toggleClass("campo-desabilitado");
  digitacao.removeClass("borda-vermelha");
  digitacao.removeClass("borda-verde");
}