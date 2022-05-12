package com.grupotfp.pluginrelatorios.service.graficos;

import java.util.List;

import com.grupotfp.pluginfinanceiro.util.dto.FechamentoLivroCaixaByFiltroDto;
import com.grupotfp.pluginfinanceiro.util.dto.FechamentoLivroCaixaDto;

public interface GraficosManager {

	/**
	 * Realiza a consulta dos fechamentos do caixa de forma semanal. <br>
	 * [Domingo, Segunda, Terça, Quarta, Quinta, Sexta, Sabado] <br>
	 * Criado em 7 de mai. de 2022 as 21:56:51 <br>
	 * 
	 * @author Paulo Gomes Marques <br>
	 * @param idEmpresa
	 */
	List<FechamentoLivroCaixaDto> fechamentoLivroCaixaSemanal(String numeroDocumentoCNPJ);

	/**
	 * Realiza a consulta dos fechamentos do caixa pelo filtro de data. <br>
	 * Criado em 8 de mai. de 2022 as 01:14:26 <br>
	 * 
	 * @author Paulo Gomes Marques <br>
	 * @param numeroDocumentoCNPJ
	 * @param dataInicial
	 * @param dataFinal
	 * @return
	 */
	List<FechamentoLivroCaixaByFiltroDto> fechamentoLivroCaixaByFiltro(String numeroDocumentoCNPJ, String dataInicial,
			String dataFinal);
}
