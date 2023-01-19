import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { CdkTableModule } from "@angular/cdk/table";
import { MensagensPTBRRelatorios } from "./i18n/MensagensPTBRRelatorios";
import { FechamentoLivroCaixaComponent } from "./pages/relatorios/fechamento-livro-caixa/fechamento-livro-caixa.component";
import { RelatoriosComponent } from "./pages/relatorios/relatorios.component";
import { ServiceConfigRelatorios } from "./service/ServiceConfigRelatorios";
import { UtilConstantesRelatorios } from "./util/util-constantes-relatorios";
import { UtilRelatorios } from "./util/util-relatorio";
import { MaterialModule } from "app/modules/material.module";
import { NgxMaskModule } from "ngx-mask";
@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    CdkTableModule,
    MaterialModule
  ],
  declarations: [FechamentoLivroCaixaComponent, RelatoriosComponent,FechamentoLivroCaixaComponent],
  exports: [RelatoriosComponent, FechamentoLivroCaixaComponent],
  providers: [
    ServiceConfigRelatorios,
    MensagensPTBRRelatorios,
    UtilConstantesRelatorios,
    UtilRelatorios,
  ],
})
export class PluginRelatoriosModule {}
