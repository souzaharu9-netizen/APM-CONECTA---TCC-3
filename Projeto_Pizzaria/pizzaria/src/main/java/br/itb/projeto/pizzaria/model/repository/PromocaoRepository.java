package br.itb.projeto.pizzaria.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.pizzaria.model.entity.Promocao;

@Repository
public interface PromocaoRepository extends JpaRepository<Promocao, Long> {

}
