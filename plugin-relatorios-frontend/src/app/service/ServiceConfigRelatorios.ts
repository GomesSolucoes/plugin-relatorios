import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { ID_TIPO } from "plugins/plugin-core/plugin-core-frontend/src/app/util/util-constants";
import { UtilCore } from "plugins/plugin-core/plugin-core-frontend/src/app/util/util-core";
import { ServiceInterfaceRelatorios } from "./ServiceInterfaceRelatorios";

@Injectable({
  providedIn: "root",
})
export class ServiceConfigRelatorios {
  constructor(
  ) { }

  public serviceInterfaceFinanceiro: ServiceInterfaceRelatorios = {
    consultarfechamentoLivroCaixaSemanal: {
      endPoint:
      environment.url + 
        "/graficos/fechamentoLivroCaixaSemanal",
      method: ID_TIPO.REQUEST.GET,
      headers: new HttpHeaders().append("Access-Control-Allow-Origin", "*"),
      urlParam: null,
      json: {},
    },
    consultarfechamentoLivroCaixaByFiltro: {
      endPoint:
      environment.url + 
        "/graficos/fechamentoLivroCaixaByFiltro",
      method: ID_TIPO.REQUEST.GET,
      headers: new HttpHeaders().append("Access-Control-Allow-Origin", "*"),
      urlParam: null,
      json: {},
    },
  };
}
