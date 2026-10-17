package br.itb.projeto.pizzaria.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import br.itb.projeto.pizzaria.model.entity.ResetSenha;
import br.itb.projeto.pizzaria.model.entity.Usuario;
import br.itb.projeto.pizzaria.model.repository.ResetSenhaRepository;
import br.itb.projeto.pizzaria.model.repository.UsuarioRepository;

@Service
public class ResetSenhaService {

    private ResetSenhaRepository resetSenhaRepository;
    private UsuarioRepository usuarioRepository;
    private EmailService emailService;

    public ResetSenhaService(EmailService emailService, ResetSenhaRepository resetSenhaRepository, UsuarioRepository usuarioRepository) {
        this.emailService = emailService;
        this.resetSenhaRepository = resetSenhaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public void solicitarRecuperacao(String email) {
        Usuario usuario = usuarioRepository.findByUsername(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (usuario != null) {
            String codigo = gerarCodigo();

            ResetSenha resetSenha = new ResetSenha();
            resetSenha.setEmail(email);
            resetSenha.setCodigo(codigo);
            resetSenha.setExpiracao(LocalDateTime.now().plusMinutes(10));

            resetSenhaRepository.save(resetSenha);

            emailService.enviarCodigo(email, codigo);
        }
    }

    public void validarCodigo(String email, String codigo) {
        ResetSenha resetSenha = resetSenhaRepository
                .findByEmailAndCodigo(email, codigo)
                .orElseThrow(() -> new RuntimeException("Código inválido"));

        if (resetSenha.getExpiracao().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Código expirado");
        }
    }

    private String gerarCodigo() {
        return String.valueOf((int) (Math.random() * 900000) + 100000);
    }
}
