const btnAnterior = $("button[onclick='anterior(event)']");
const btnProximo = $("button[onclick='proxima(event)']");
const btnSubmit = $("button[type=submit]");
const indicador = $("#indicador");
const quantidadePaginas = $('[id^="pagina"][id*="pagina"]').length;

$(function () {

  //Inicializa o Indicador
  indicador.html("1/" + quantidadePaginas);

  //Desabilita todas as div com o id 'pagina' seguido de algum numero que seja diferente de pagina1 que é a primeira
  $('[id^="pagina"][id*="pagina"]').each(function () {
      var id = $(this).attr('id');
      if(id !== 'pagina1'){
          $(this).hide();
      }
  });

  //desabilite o botão anterior pois não tem anterior na pagina1
  btnAnterior.prop("disabled", true);

  //desabilite o botão submit
  btnSubmit.hide();
});

function proxima(e) {
  e.preventDefault(); //Remove evento de recarregamento da tela.

  //localiza qual pagina está ativa
  let paginaAtiva = $('[id^="pagina"][id*="pagina"]:visible:first').attr('id');
  //pega o número da pagina ativa e converte em inteiro
  let numPaginaAtual = parseInt(paginaAtiva.split("pagina")[1], 10);
  let numPaginaProxima = numPaginaAtual + 1;
  let numPaginaSeguinte = numPaginaProxima + 1;

  //Atualiza indicador
  indicador.html(numPaginaProxima + "/" + quantidadePaginas);

  $("#pagina" + numPaginaAtual).hide();      
  $("#pagina" + numPaginaProxima).show();

  //Valida se botão anterior deve ser habilitado ou não
  if (numPaginaProxima > 1) {
    btnAnterior.prop("disabled", false);
  }

  //Valida de Próxima pagina existe
  if (!$("#pagina" + numPaginaSeguinte).length) {
    //Se não exite oculta o botão próxima e mostra o Submit
    btnSubmit.show();
    btnProximo.hide();
  }
}

function anterior(e) {
  e.preventDefault(); //Remove evento de recarregamento da tela.

  //localiza qual pagina está ativa
  let paginaAtiva = $('[id^="pagina"][id*="pagina"]:visible:first').attr('id');

  //pega o número da pagina ativa e converte em inteiro
  let numPaginaAtual = parseInt(paginaAtiva.split("pagina")[1], 10);
  let numPaginaAnterior = numPaginaAtual - 1;

  //Atualiza indicador
  indicador.html(numPaginaAnterior + "/" + quantidadePaginas);

  //Verifica se o botão submit está visível
  if (btnSubmit.is(":visible")) {
    //oculta o botão submite e mostra o botão anterior
    btnSubmit.hide();
    btnProximo.show();
  }

  $("#pagina" + numPaginaAtual).hide();
  $("#pagina" + numPaginaAnterior).show();

  //Valida de existe Pagina Anterior
  if (!$("#pagina" + (numPaginaAnterior - 1)).length) {
    //Se não exite oculta o botão próxima e mostra o Submit
    btnSubmit.hide();
    btnAnterior.prop("disabled", true);
    btnProximo.show();
  }
}