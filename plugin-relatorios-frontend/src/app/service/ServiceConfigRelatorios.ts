import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UtilCore } from "app/plugins/plugin-core/plugin-core-frontend/src/app/util/utilCore";
import { Configuration } from "app/plugins/root/configuration/ambient/Configuration";
import { ServiceInterfaceRelatorios } from "./ServiceInterfaceRelatorios";

@Injectable({
  providedIn: "root",
})
export class ServiceConfigRelatorios {
  constructor(
    public utilCore: UtilCore,
    public configuration: Configuration
  ) { }

  public serviceInterfaceFinanceiro: ServiceInterfaceRelatorios = {
    consultarfechamentoLivroCaixaSemanal: {
      endPoint:
        this.configuration.ambient.endPoint +
        "/graficos/fechamentoLivroCaixaSemanal",
      method: this.utilCore.utilConstants.ID_TIPO.REQUEST.GET,
      headers: new HttpHeaders().append("Access-Control-Allow-Origin", "*"),
      urlParam: null,
      json: {},
    },
    consultarfechamentoLivroCaixaByFiltro: {
      endPoint:
        this.configuration.ambient.endPoint +
        "/graficos/fechamentoLivroCaixaByFiltro",
      method: this.utilCore.utilConstants.ID_TIPO.REQUEST.GET,
      headers: new HttpHeaders().append("Access-Control-Allow-Origin", "*"),
      urlParam: null,
      json: {},
    },
  };
}
