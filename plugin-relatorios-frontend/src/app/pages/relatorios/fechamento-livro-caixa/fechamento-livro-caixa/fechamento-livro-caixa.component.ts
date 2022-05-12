import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart } from "node_modules/chart.js";
import { MensagensPTBRCore } from 'src/plugins/plugin-core/plugin-core-frontend/src/app/i18n/MensagensPTBRCore';
import { ServiceConfigCore } from 'src/plugins/plugin-core/plugin-core-frontend/src/app/service/ServiceConfigCore';
import { UtilConstants } from 'src/plugins/plugin-core/plugin-core-frontend/src/app/util/util-constants';
import { UtilFuncoes } from 'src/plugins/plugin-core/plugin-core-frontend/src/app/util/util-funcoes';
import { UtilMensagens } from 'src/plugins/plugin-core/plugin-core-frontend/src/app/util/util-mensagens';
import { UtilService } from 'src/plugins/plugin-core/plugin-core-frontend/src/app/util/util-service';
import { MensagensPTBRFinanceiro } from 'src/plugins/plugin-financeiro/plugin-financeiro-frontend/src/app/i18n/MensagensPTBRFinanceiro';
import { MensagensPTBRRelatorios } from '../../../../i18n/MensagensPTBRRelatorios';
import { FechamentoLivroCaixa } from '../../../../interface/ListaFechamentoLivroCaixa';
import { ServiceConfigRelatorios } from '../../../../service/ServiceConfigRelatorios';
import { UtilConstantesRelatorios } from '../../../../util/util-constantes-relatorios';
import { UtilRelatorios } from '../../../../util/util-relatorio';

@Component({
  selector: 'app-fechamento-livro-caixa',
  templateUrl: './fechamento-livro-caixa.component.html',
  styleUrls: ['./fechamento-livro-caixa.component.css',
    "./../../../../../../../../root/assets-project/scss/style-project.scss"]
})
export class FechamentoLivroCaixaComponent implements OnInit {

  private labelFechamento = []
  private valoresFechamento = []
  private typeGraph: string;
  private quantidadeDiasParaConsultarFechamentoLivroCaixa: number = 0;
  private filtroFechamentoLivroCaixaForm = new FormGroup({
    dataInicio: new FormControl(
      { value: "" },
      Validators.compose([Validators.required])
    ), dataFinal: new FormControl(
      { value: "" },
      Validators.compose([Validators.required])
    )
  })
  constructor(private elementRef: ElementRef,
    private mensagensPTBRCore: MensagensPTBRCore,
    private utilConstants: UtilConstants,
    private mensagensPTBRFinanceiro: MensagensPTBRFinanceiro,
    private utilService: UtilService,
    private serviceConfigRelatorios: ServiceConfigRelatorios,
    private mensagensPTBRRelatorios: MensagensPTBRRelatorios,
    private serviceConfigCore: ServiceConfigCore,
    private utilMensagens: UtilMensagens,
    private utilFuncoes: UtilFuncoes,
    private utilRelatorios: UtilRelatorios,
    private utilConstantesRelatorios: UtilConstantesRelatorios) { }

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
      dataInicial = this.utilFuncoes.jsNativeDateFormatToBrasillianFormat(this.filtroFechamentoLivroCaixaForm.get("dataInicio").value)
      dataFinal = this.utilFuncoes.jsNativeDateFormatToBrasillianFormat(this.filtroFechamentoLivroCaixaForm.get("dataFinal").value)
      let daysDiff: number = this.utilFuncoes.getDiffDays(dataInicial, dataFinal);
      if (daysDiff > this.quantidadeDiasParaConsultarFechamentoLivroCaixa) {
        this.utilMensagens.mostrarMensagemAlerta(this.mensagensPTBRRelatorios.mensagens.label.quantidadeDiasMaiorQueParamentro + this.quantidadeDiasParaConsultarFechamentoLivroCaixa)
      } else {
        this.consultarfechamentoLivroCaixaByFiltro();
      }
    } else { 
      this.utilMensagens.mostrarMensagemAlerta(this.mensagensPTBRRelatorios.mensagens.label.camposDataInicialOuDataFinalNaoPreenchidos)
    }
  }

  consultarQuantidadeDiasParaConsultarFechamentoLivroCaixa() {
    this.serviceConfigCore.serviceInterfaceCore.consultarValorParametroById.urlParam = "?idParametro=" + this.utilConstants.ID_TIPO.PARAMETRO.QUANTIDADE_DIAS_CONSULTAR_FECHAMENTO_LIVRO_CAIXA
    this.utilService.service(this.serviceConfigCore.serviceInterfaceCore.consultarValorParametroById).then((quantidadeDias: string) => {
      this.quantidadeDiasParaConsultarFechamentoLivroCaixa = Number(quantidadeDias)
    }).catch(() => {
      this.utilMensagens.mostrarMensagemAlerta(this.mensagensPTBRCore.mensagens.label.error.erroAoConsultarParametro + this.utilConstants.ID_TIPO.PARAMETRO.QUANTIDADE_DIAS_CONSULTAR_FECHAMENTO_LIVRO_CAIXA);
    })
  }

  consultarfechamentoLivroCaixaByFiltro() {
    let dataInicial: string = this.utilFuncoes.jsNativeDateFormatToBrasillianFormat(this.filtroFechamentoLivroCaixaForm.get("dataInicio").value)
    let dataFinal: string = this.utilFuncoes.jsNativeDateFormatToBrasillianFormat(this.filtroFechamentoLivroCaixaForm.get("dataFinal").value)

    this.serviceConfigRelatorios.serviceInterfaceFinanceiro.consultarfechamentoLivroCaixaByFiltro.urlParam = "?dataFinal=" + dataFinal + "&dataInicial=" + dataInicial + "&numeroDocumentoCNPJ=" + localStorage.getItem(this.utilConstants.SESSAO.CNPJEMPRESA);

    this.utilService.service(this.serviceConfigRelatorios.serviceInterfaceFinanceiro.consultarfechamentoLivroCaixaByFiltro).then((listaFechamentoLivroCaixa: FechamentoLivroCaixa[]) => {
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
      this.utilMensagens.mostrarMensagemAlerta(this.mensagensPTBRRelatorios.mensagens.label.error.erroAoConsultarFechamentoLivroCaixa + err);
    })
  }

  consultarfechamentoLivroCaixaSemanal() {
    this.serviceConfigRelatorios.serviceInterfaceFinanceiro.consultarfechamentoLivroCaixaSemanal.urlParam = "?numeroDocumentoCNPJ=" + localStorage.getItem(this.utilConstants.SESSAO.CNPJEMPRESA);

    this.utilService.service(this.serviceConfigRelatorios.serviceInterfaceFinanceiro.consultarfechamentoLivroCaixaSemanal).then((listaFechamentoLivroCaixa: FechamentoLivroCaixa[]) => {
      this.labelFechamento = []
      this.valoresFechamento = []
      listaFechamentoLivroCaixa.forEach((fechamentoLivroCaixa: FechamentoLivroCaixa) => {
        this.labelFechamento.push(fechamentoLivroCaixa.dataAbertura)
        this.valoresFechamento.push(Number(fechamentoLivroCaixa.valorFechamentoCaixa).toFixed(2))
      })
      this.gerarGraficoFechamentoLivroCaixa(this.utilConstantesRelatorios.TIPO_GRAFICO.BARRAS)
    }).catch((err) => {
      this.utilMensagens.mostrarMensagemAlerta(this.mensagensPTBRRelatorios.mensagens.label.error.erroAoConsultarFechamentoLivroCaixa + err);
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
