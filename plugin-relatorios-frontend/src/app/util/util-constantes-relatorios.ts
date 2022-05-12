import { Injectable } from "@angular/core";

@Injectable()
export class UtilConstantesRelatorios {

    constructor() { }

    public TIPO_GRAFICO = {
        BARRAS: 'bar',
        DOUGHNUT: 'doughnut',
        LINE: 'line',
        PIZZA:'pie'
    }
}