import { Component, OnInit } from "@angular/core";
import { MensagensPTBRCore } from "app/plugins/plugin-core/plugin-core-frontend/src/app/i18n/MensagensPTBRCore";
import { UtilCore } from "app/plugins/plugin-core/plugin-core-frontend/src/app/util/util-core";
import { MensagensPTBRRelatorios } from "../../i18n/MensagensPTBRRelatorios";
@Component({
  selector: "app-relatorios",
  templateUrl: "./relatorios.component.html",
  styleUrls: [
    "./relatorios.component.scss"
  ],
})
export class RelatoriosComponent implements OnInit {
  constructor(
    public mensagensPTBRRelatorios: MensagensPTBRRelatorios,
    public utilCore: UtilCore,
  ) { }

  ngOnInit(): void {

  }

}
