package br.itb.projeto.pizzaria.service;

import org.springframework.stereotype.Service;

import br.itb.projeto.pizzaria.model.repository.ProdutoPromocaoRepository;
import br.itb.projeto.pizzaria.model.repository.ProdutoRepository;
import br.itb.projeto.pizzaria.model.repository.PromocaoRepository;

@Service
public class PromocaoService {

    private final PromocaoRepository promocaoRepository;
    private final ProdutoRepository produtoRepository;
    private final ProdutoPromocaoRepository produtoPromocaoRepository;

    public PromocaoService(ProdutoPromocaoRepository produtoPromocaoRepository, ProdutoRepository produtoRepository, PromocaoRepository promocaoRepository) {
        this.produtoPromocaoRepository = produtoPromocaoRepository;
        this.produtoRepository = produtoRepository;
        this.promocaoRepository = promocaoRepository;
    }

  

}