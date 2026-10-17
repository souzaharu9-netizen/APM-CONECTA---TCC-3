package br.itb.projeto.pizzaria.config;

/**
 * Exceção de domínio lançada quando um recurso não é encontrado.
 * Usada para retornar 404 com uma mensagem amigável em vez de um RuntimeException.
 */
public class ResourceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
