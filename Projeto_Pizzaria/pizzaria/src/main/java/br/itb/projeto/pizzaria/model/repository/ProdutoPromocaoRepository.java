package br.itb.projeto.pizzaria.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.pizzaria.model.entity.ProdutoPromocao;

@Repository
public interface ProdutoPromocaoRepository extends JpaRepository<ProdutoPromocao, Long> {

}