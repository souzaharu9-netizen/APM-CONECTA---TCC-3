package br.itb.projeto.pizzaria.service;

import org.springframework.stereotype.Service;

import br.itb.projeto.pizzaria.model.repository.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

}
