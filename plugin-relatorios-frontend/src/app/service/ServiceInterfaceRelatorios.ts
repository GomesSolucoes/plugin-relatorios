import { ServiceRequest } from "app/plugins/plugin-core/plugin-core-frontend/src/app/util/util-interface/ServiceRequest"


export interface ServiceInterfaceRelatorios {
  consultarfechamentoLivroCaixaSemanal: ServiceRequest
  consultarfechamentoLivroCaixaByFiltro: ServiceRequest
}
