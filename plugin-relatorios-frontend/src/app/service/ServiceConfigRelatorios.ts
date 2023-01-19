import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { UtilCore } from "plugins/plugin-core/plugin-core-frontend/src/app/util/util-core";
import { ServiceInterfaceRelatorios } from "./ServiceInterfaceRelatorios";

@Injectable({
  providedIn: "root",
})
export class ServiceConfigRelatorios {
  constructor(
    public utilCore: UtilCore
  ) { }

  public serviceInterfaceFinanceiro: ServiceInterfaceRelatorios = {
    consultarfechamentoLivroCaixaSemanal: {
      endPoint:
      environment.env + 
        "/graficos/fechamentoLivroCaixaSemanal",
      method: this.utilCore.utilConstants.ID_TIPO.REQUEST.GET,
      headers: new HttpHeaders().append("Access-Control-Allow-Origin", "*"),
      urlParam: null,
      json: {},
    },
    consultarfechamentoLivroCaixaByFiltro: {
      endPoint:
      environment.env + 
        "/graficos/fechamentoLivroCaixaByFiltro",
      method: this.utilCore.utilConstants.ID_TIPO.REQUEST.GET,
      headers: new HttpHeaders().append("Access-Control-Allow-Origin", "*"),
      urlParam: null,
      json: {},
    },
  };
}
