package com.grupotfp.pluginrelatorios.service.graficos.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupotfp.plugincore.domain.MestreEmpresaEntity;
import com.grupotfp.plugincore.repository.MestreEmpresaRepository;
import com.grupotfp.plugincore.services.exception.impl.ExceptionServiceImpl;
import com.grupotfp.plugincore.util.corefuncoes.CoreFuncoes;
import com.grupotfp.pluginfinanceiro.repository.MestreFinanceiroCaixaRepository;
import com.grupotfp.pluginfinanceiro.util.dto.FechamentoLivroCaixaByFiltroDto;
import com.grupotfp.pluginfinanceiro.util.dto.FechamentoLivroCaixaDto;
import com.grupotfp.pluginrelatorios.service.graficos.GraficosManager;

@Service
public class GraficosManagerImpl implements GraficosManager {

	@Autowired
	private MestreFinanceiroCaixaRepository mestreFinanceiroCaixaRepository;

	@Autowired
	private MestreEmpresaRepository mestreEmpresaRepository;

	@Autowired
	private CoreFuncoes coreFuncoes;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.grupotfp.pluginrelatorios.service.graficos.GraficosManager#
	 * fechamentoLivroCaixaSemanal()
	 */
	@Override
	public List<FechamentoLivroCaixaDto> fechamentoLivroCaixaSemanal(String numeroDocumentoCNPJ) {
		MestreEmpresaEntity mestreEmpresaEntity = mestreEmpresaRepository
				.consultarMestreEmpresaPorNumeroDocumentoCNPJ(numeroDocumentoCNPJ);
		return mestreFinanceiroCaixaRepository.consultarFechamentoLivroCaixaSemanal(mestreEmpresaEntity.getIdEmpresa());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.grupotfp.pluginrelatorios.service.graficos.GraficosManager#
	 * fechamentoLivroCaixaByFiltro(java.lang.String, java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public List<FechamentoLivroCaixaByFiltroDto> fechamentoLivroCaixaByFiltro(String numeroDocumentoCNPJ,
			String dataInicial, String dataFinal) {

		List<FechamentoLivroCaixaByFiltroDto> listaFechamentoLivroCaixaByFiltroDto = new ArrayList<>();

		try {
			MestreEmpresaEntity mestreEmpresaEntity = mestreEmpresaRepository
					.consultarMestreEmpresaPorNumeroDocumentoCNPJ(numeroDocumentoCNPJ);

			Date dataInicio = coreFuncoes.stringToDate(dataInicial);
			Date dataFim = coreFuncoes.stringToDate(dataFinal);

			listaFechamentoLivroCaixaByFiltroDto = mestreFinanceiroCaixaRepository
					.consultarFechamentoLivroCaixaByFiltro(dataInicio, dataFim, mestreEmpresaEntity.getIdEmpresa());
		} catch (ExceptionServiceImpl e) {

			e.printStackTrace();
		}
		return listaFechamentoLivroCaixaByFiltroDto;

	}
}
