import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UtilRelatorios {

    constructor() { }

    /**
     * Limpa a div do canvas
     *  <div id="divChart">
     *      <canvas id="myChart"></canvas>
     *  </div>
     * @param id 
     * @param idCanvas 
     */
    limparCanvasGrafico(id: string, idCanvas: string): void {
        try {
            let container = document.getElementById(id);
            container.innerHTML = "";
            container.innerHTML = "<canvas id=" + idCanvas + "></canvas>";
        } catch (error) {

        }
    }

    gerarCoresAleatorias(qtd: number) {
        let listaCores = []
        for (let i = 1; i <= qtd; i++) {
            let r = Math.random() * 255;
            let g = Math.random() * 255;
            let b = Math.random() * 255;
            listaCores.push('rgba(' + Number(r).toFixed(0) + ', ' + Number(g).toFixed(0) + ', ' + Number(b).toFixed(0) + ', 0.7)');
        }
        return listaCores;
    }

}