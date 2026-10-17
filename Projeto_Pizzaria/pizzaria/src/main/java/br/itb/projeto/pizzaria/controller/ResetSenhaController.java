package br.itb.projeto.pizzaria.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.pizzaria.service.ResetSenhaService;

@RestController
@RequestMapping("/reset-senha")
public class ResetSenhaController {

    private ResetSenhaService resetSenhaService;

    public ResetSenhaController(ResetSenhaService resetSenhaService) {
        this.resetSenhaService = resetSenhaService;
    }

    @PostMapping("/recuperar")
    public String recuperar(@RequestParam String email) {
        resetSenhaService.solicitarRecuperacao(email);
        return "Código enviado para o email";
    }

    @PostMapping("/validar")
    public String validar(@RequestParam String email,
                          @RequestParam String codigo) {

        resetSenhaService.validarCodigo(email, codigo);
        return "Código válido. Pode alterar a senha.";
    }
}
