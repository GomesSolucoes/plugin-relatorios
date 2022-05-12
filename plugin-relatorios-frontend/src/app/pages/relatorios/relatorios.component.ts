import { Component, ElementRef, OnInit } from "@angular/core";
import { MensagensPTBRCore } from "src/plugins/plugin-core/plugin-core-frontend/src/app/i18n/MensagensPTBRCore";
import { MensagensPTBRRelatorios } from "../../i18n/MensagensPTBRRelatorios";
@Component({
  selector: "app-relatorios",
  templateUrl: "./relatorios.component.html",
  styleUrls: [
    "./relatorios.component.scss",
    "./../../../../../../root/assets-project/scss/style-project.scss",
  ],
})
export class RelatoriosComponent implements OnInit {
  constructor(
    private mensagensPTBRRelatorios: MensagensPTBRRelatorios,
    private mensagensPTBRCore: MensagensPTBRCore,
  ) { }

  ngOnInit(): void {

  }

}
