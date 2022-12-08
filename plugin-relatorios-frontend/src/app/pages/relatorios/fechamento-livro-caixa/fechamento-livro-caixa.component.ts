import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MensagensPTBRCore } from 'app/plugins/plugin-core/plugin-core-frontend/src/app/i18n/MensagensPTBRCore';
import { ServiceConfigCore } from 'app/plugins/plugin-core/plugin-core-frontend/src/app/service/ServiceConfigCore';
import { MensagensPTBRFinanceiro } from 'app/plugins/plugin-financeiro/plugin-financeiro-frontend/src/app/i18n/MensagensPTBRFinanceiro';
import { Chart } from "./../../../.././../../../../../../node_modules/chart.js";
import { MensagensPTBRRelatorios } from '../../../i18n/MensagensPTBRRelatorios';
import { FechamentoLivroCaixa } from '../../../interface/ListaFechamentoLivroCaixa';
import { ServiceConfigRelatorios } from '../../../service/ServiceConfigRelatorios';
import { UtilConstantesRelatorios } from '../../../util/util-constantes-relatorios';
import { UtilCore } from '../../../../../../../plugin-core/plugin-core-frontend/src/app/util/util-core';
import { UtilRelatorios } from '../../../util/util-relatorio';

@Component({
  selector: 'app-fechamento-livro-caixa',
  templateUrl: './fechamento-livro-caixa.component.html'
})
export class FechamentoLivroCaixaComponent implements OnInit {

  constructor(
    public utilCore: UtilCore,
    public elementRef: ElementRef,
    public mensagensPTBRCore: MensagensPTBRCore,
    public mensagensPTBRFinanceiro: MensagensPTBRFinanceiro,
    public serviceConfigRelatorios: ServiceConfigRelatorios,
    public mensagensPTBRRelatorios: MensagensPTBRRelatorios,
    public serviceConfigCore: ServiceConfigCore,
    public utilRelatorios: UtilRelatorios,
    public utilConstantesRelatorios: UtilConstantesRelatorios) { }
    
  public labelFechamento = []
  public valoresFechamento = []
  public typeGraph: string;
  public quantidadeDiasParaConsultarFechamentoLivroCaixa: any = 0;

  public filtroFechamentoLivroCaixaForm = new FormGroup({
    dataInicio: new FormControl(
      { value: "" },
      Validators.compose([Validators.required])
    ), dataFinal: new FormControl(
      { value: "" },
      Validators.compose([Validators.required])
    )
  })
  ngOnInit(): void {
    this.consultarQuantidadeDiasParaConsultarFechamentoLivroCaixa()
    this.consultarfechamentoLivroCaixaSemanal();
  }

  limparFiltroGraficoFechamentoLivroCaixa() {
    this.typeGraph = null;
    this.filtroFechamentoLivroCaixaForm.reset()
    this.consultarfechamentoLivroCaixaSemanal();
  }

  verificarQuantidadeDiasDiferencaDatas() {

    let dataInicial: string = this.filtroFechamentoLivroCaixaForm.get("dataInicio").value
    let dataFinal: string = this.filtroFechamentoLivroCaixaForm.get("dataFinal").value
    
    if (this.filtroFechamentoLivroCaixaForm.valid) {
      dataInicial = this.utilCore.utilFuncoes.jsNativeDateFormatToBrasillianFormat(this.filtroFechamentoLivroCaixaForm.get("dataInicio").value)
      dataFinal = this.utilCore.utilFuncoes.jsNativeDateFormatToBrasillianFormat(this.filtroFechamentoLivroCaixaForm.get("dataFinal").value)
      let daysDiff: number = this.utilCore.utilFuncoes.getDiffDays(dataInicial, dataFinal);
      if (daysDiff > this.quantidadeDiasParaConsultarFechamentoLivroCaixa) {
        this.utilCore.utilMensagens.mostrarMensagemAlerta(this.mensagensPTBRRelatorios.mensagens.label.quantidadeDiasMaiorQueParamentro + this.quantidadeDiasParaConsultarFechamentoLivroCaixa)
      } else {
        this.consultarfechamentoLivroCaixaByFiltro();
      }
    } else { 
      this.utilCore.utilMensagens.mostrarMensagemAlerta(this.mensagensPTBRRelatorios.mensagens.label.camposDataInicialOuDataFinalNaoPreenchidos)
    }
  }

  consultarQuantidadeDiasParaConsultarFechamentoLivroCaixa() {
    this.serviceConfigCore.serviceInterfaceCore.consultarValorParametroById.urlParam = "?idParametro=" + this.utilCore.utilConstants.ID_TIPO.PARAMETRO.QUANTIDADE_DIAS_CONSULTAR_FECHAMENTO_LIVRO_CAIXA
    this.utilCore.utilService.service(this.serviceConfigCore.serviceInterfaceCore.consultarValorParametroById).then((quantidadeDias: string) => {
      this.quantidadeDiasParaConsultarFechamentoLivroCaixa = Number(quantidadeDias)
    }).catch(() => {
      this.utilCore.utilMensagens.mostrarMensagemAlerta(this.mensagensPTBRCore.mensagens.label.error.erroAoConsultarParametro + this.utilCore.utilConstants.ID_TIPO.PARAMETRO.QUANTIDADE_DIAS_CONSULTAR_FECHAMENTO_LIVRO_CAIXA);
    })
  }

  consultarfechamentoLivroCaixaByFiltro() {
    let dataInicial: string = this.utilCore.utilFuncoes.jsNativeDateFormatToBrasillianFormat(this.filtroFechamentoLivroCaixaForm.get("dataInicio").value)
    let dataFinal: string = this.utilCore.utilFuncoes.jsNativeDateFormatToBrasillianFormat(this.filtroFechamentoLivroCaixaForm.get("dataFinal").value)

    this.serviceConfigRelatorios.serviceInterfaceFinanceiro.consultarfechamentoLivroCaixaByFiltro.urlParam = "?dataFinal=" + dataFinal + "&dataInicial=" + dataInicial + "&numeroDocumentoCNPJ=" + localStorage.getItem(this.utilCore.utilConstants.SESSAO.CNPJEMPRESA);

    this.utilCore.utilService.service(this.serviceConfigRelatorios.serviceInterfaceFinanceiro.consultarfechamentoLivroCaixaByFiltro).then((listaFechamentoLivroCaixa: FechamentoLivroCaixa[]) => {
      this.labelFechamento = []
      this.valoresFechamento = []
      listaFechamentoLivroCaixa.forEach((fechamentoLivroCaixa: FechamentoLivroCaixa) => {
        this.labelFechamento.push(fechamentoLivroCaixa.dataAbertura)
        this.valoresFechamento.push(Number(fechamentoLivroCaixa.valorFechamentoCaixa).toFixed(2))
      })
      this.typeGraph = null;
      this.gerarGraficoFechamentoLivroCaixa(this.utilConstantesRelatorios.TIPO_GRAFICO.BARRAS)
    }).catch((err) => {
      console.error(err)
      this.utilCore.utilMensagens.mostrarMensagemAlerta(this.mensagensPTBRRelatorios.mensagens.label.error.erroAoConsultarFechamentoLivroCaixa + err);
    })
  }

  consultarfechamentoLivroCaixaSemanal() {
    this.serviceConfigRelatorios.serviceInterfaceFinanceiro.consultarfechamentoLivroCaixaSemanal.urlParam = "?numeroDocumentoCNPJ=" + localStorage.getItem(this.utilCore.utilConstants.SESSAO.CNPJEMPRESA);

    this.utilCore.utilService.service(this.serviceConfigRelatorios.serviceInterfaceFinanceiro.consultarfechamentoLivroCaixaSemanal).then((listaFechamentoLivroCaixa: FechamentoLivroCaixa[]) => {
      this.labelFechamento = []
      this.valoresFechamento = []
      listaFechamentoLivroCaixa.forEach((fechamentoLivroCaixa: FechamentoLivroCaixa) => {
        this.labelFechamento.push(fechamentoLivroCaixa.dataAbertura)
        this.valoresFechamento.push(Number(fechamentoLivroCaixa.valorFechamentoCaixa).toFixed(2))
      })
      this.gerarGraficoFechamentoLivroCaixa(this.utilConstantesRelatorios.TIPO_GRAFICO.BARRAS)
    }).catch((err) => {
      this.utilCore.utilMensagens.mostrarMensagemAlerta(this.mensagensPTBRRelatorios.mensagens.label.error.erroAoConsultarFechamentoLivroCaixa + err);
    })
  }

  gerarGraficoFechamentoLivroCaixa(typeGraph: string) {

    if (this.typeGraph != typeGraph) {
      this.typeGraph = typeGraph
      this.utilRelatorios.limparCanvasGrafico("divChart", "myChart")
      const myChart = new Chart(
        this.elementRef.nativeElement.querySelector("#myChart"),
        {
          type: typeGraph,
          data: {
            labels: this.labelFechamento,
            datasets: [
              {
                label: [
                  this.mensagensPTBRFinanceiro.mensagens.label.graficos
                    .labelFechamentoCaixa
                ],
                data: this.valoresFechamento,
                fill: false,
                backgroundColor: this.utilRelatorios.gerarCoresAleatorias(this.valoresFechamento.length),
                borderColor:'#6ec1e4',
                borderWidth: 3,
                tension: 0.3,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        }
      );
    }
  }
}
