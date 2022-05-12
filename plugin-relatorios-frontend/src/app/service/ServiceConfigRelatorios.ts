import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configuration } from "configuration/ambient/Configuration";
import { UtilConstants } from "src/plugins/plugin-core/plugin-core-frontend/src/app/util/util-constants";
import { ServiceInterfaceRelatorios } from "./ServiceInterfaceRelatorios";


@Injectable()
export class ServiceConfigRelatorios {
  constructor(
    private utilConstants: UtilConstants,
    private configuration: Configuration
  ) { }

  public serviceInterfaceFinanceiro: ServiceInterfaceRelatorios = {
    consultarfechamentoLivroCaixaSemanal:{
      endPoint: this.configuration.ambient.endPoint + "/graficos/fechamentoLivroCaixaSemanal",
      method: this.utilConstants.ID_TIPO.REQUEST.GET,
      headers: new HttpHeaders().append('Access-Control-Allow-Origin', '*'),
      urlParam:null,
      json: {}
    },
    consultarfechamentoLivroCaixaByFiltro:{
      endPoint: this.configuration.ambient.endPoint + "/graficos/fechamentoLivroCaixaByFiltro",
      method: this.utilConstants.ID_TIPO.REQUEST.GET,
      headers: new HttpHeaders().append('Access-Control-Allow-Origin', '*'),
      urlParam:null,
      json: {}
    },
  }
}


