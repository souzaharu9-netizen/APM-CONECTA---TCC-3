package br.itb.projeto.pizzaria.config;

/**
 * Exceção de domínio lançada quando uma regra de negócio é violada
 * (ex.: username já cadastrado, registro vinculado a outro registro).
 */
public class BusinessException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public BusinessException(String message) {
        super(message);
    }
}
