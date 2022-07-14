import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MensagensPTBRRelatorios {
  public mensagens = {
    abas: {},
    botoes: {},
    label: {
      tituloRelatorioFechamentoLivroCaixaSemanal:
        "Relatório de fechamento do livro caixa",
      tituloRelatorioFechamentoLivroCaixaSemanalDescricao:
        "Permite visualizar os valores dos livros caixas que foram fechados, o relatório esta definido para carregar os valores de acordo com a semana atual, permitindo o uso de filtros para até <DIAS> dias.",
      quantidadeDiasMaiorQueParamentro:
        "A quantidade de dias selecionado é maior que o total permitido: Quantidade de dias permitido: ",
      escolhaTipoGrafico: "Escolha o gráfico clicando nos botões abaixo",
      filtrarPorData: "Filtre o fechamento do livro caixa por data",
      camposDataInicialOuDataFinalNaoPreenchidos:
        "Para aplicar o filtro deve-se preencher os campos",
      error: {
        erroAoConsultarFechamentoLivroCaixa:
          "Não Foi possivel consultar o fechamento do livro caixa: ",
      },
    },
    input: {
      placeholder: {},
    },
  };
}
