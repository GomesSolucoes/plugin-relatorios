export interface FechamentoLivroCaixa {
    valorFechamentoCaixa: string;
    dataAbertura: string;
    diaSemana: string;
    diaSemanaNumerico: string;
    primeiroDiaSemana: string;
    ultimoDiaSemana: string;
}

export interface ListaFechamentoLivroCaixa{
    listaFechamentoLivroCaixa : FechamentoLivroCaixa[]
}