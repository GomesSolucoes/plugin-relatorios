import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgxMaskModule } from "ngx-mask";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatExpansionModule } from "@angular/material/expansion";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { CdkTableModule } from "@angular/cdk/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MensagensPTBRRelatorios } from "./plugin-relatorios-frontend/src/app/i18n/MensagensPTBRRelatorios";
import { ServiceConfigRelatorios } from "./plugin-relatorios-frontend/src/app/service/ServiceConfigRelatorios";
import { RelatoriosComponent } from "./plugin-relatorios-frontend/src/app/pages/relatorios/relatorios.component";
import { UtilConstantesRelatorios } from "./plugin-relatorios-frontend/src/app/util/util-constantes-relatorios";
import { UtilRelatorios } from "./plugin-relatorios-frontend/src/app/util/util-relatorio";
import { FechamentoLivroCaixaComponent } from "./plugin-relatorios-frontend/src/app/pages/relatorios/fechamento-livro-caixa/fechamento-livro-caixa.component";
@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatPaginatorModule,
    MatTableModule,
    CdkTableModule,
    MatTabsModule,
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
