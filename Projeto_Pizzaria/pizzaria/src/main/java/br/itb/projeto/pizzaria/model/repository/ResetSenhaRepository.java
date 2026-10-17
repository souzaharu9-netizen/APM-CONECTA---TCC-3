package br.itb.projeto.pizzaria.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.pizzaria.model.entity.ResetSenha;

@Repository
public interface ResetSenhaRepository extends JpaRepository<ResetSenha, Long> {
    Optional<ResetSenha> findByEmailAndCodigo(String email, String codigo);
}

