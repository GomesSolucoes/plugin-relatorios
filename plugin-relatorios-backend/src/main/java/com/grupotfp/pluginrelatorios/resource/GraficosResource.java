package com.grupotfp.pluginrelatorios.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupotfp.pluginfinanceiro.util.dto.FechamentoLivroCaixaByFiltroDto;
import com.grupotfp.pluginfinanceiro.util.dto.FechamentoLivroCaixaDto;
import com.grupotfp.pluginrelatorios.service.graficos.GraficosManager;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/graficos")
public class GraficosResource {

	@Autowired
	private GraficosManager graficosManager;

	@GetMapping("/fechamentoLivroCaixaSemanal")
	public List<FechamentoLivroCaixaDto> fechamentoLivroCaixaSemanal(String numeroDocumentoCNPJ) {
		return graficosManager.fechamentoLivroCaixaSemanal(numeroDocumentoCNPJ);
	}

	@GetMapping("/fechamentoLivroCaixaByFiltro")
	public List<FechamentoLivroCaixaByFiltroDto> fechamentoLivroCaixaByFiltro(String numeroDocumentoCNPJ,
			String dataInicial, String dataFinal) {
		return graficosManager.fechamentoLivroCaixaByFiltro(numeroDocumentoCNPJ, dataInicial, dataFinal);
	}
}
