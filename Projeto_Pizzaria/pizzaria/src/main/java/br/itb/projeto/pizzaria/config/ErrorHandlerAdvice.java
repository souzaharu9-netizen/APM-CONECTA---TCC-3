package br.itb.projeto.pizzaria.config;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

/**
 * Centralizado tratamento global de erros para todos os controllers REST.
 * Evita expor stack traces, credentials ou detalhes de implementação
 * para o cliente (frontend / navegador).
 */
@RestControllerAdvice
public class ErrorHandlerAdvice {

    // Handler: payload de requisição inválido (JSON mal formado)
    @ExceptionHandler(MethodMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleMessageNotReadable(
            MethodMessageNotReadableException ex) {
        Map<String, Object> body = Map.of(
                "timestamp", LocalDateTime.now(),
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", "Bad Request",
                "message", "Payload de requisição inválido. Verifique o formato JSON.",
                "path", "/"
        );
        return ResponseEntity.badRequest().body(body);
    }

    // Handler: validação de DTOs falhou (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .toList();

        Map<String, Object> body = Map.of(
                "timestamp", LocalDateTime.now(),
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", "Validation Failed",
                "message", "Dados inválidos enviados.",
                "errors", errors,
                "path", "/"
        );
        return ResponseEntity.badRequest().body(body);
    }

    // Handler: upload de arquivo muito grande
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, Object>> handleMaxFileSize(
            MaxUploadSizeExceededException ex) {
        Map<String, Object> body = Map.of(
                "timestamp", LocalDateTime.now(),
                "status", HttpStatus.PAYLOAD_TOO_LARGE.value(),
                "error", "File Too Large",
                "message", "O arquivo enviado excede o tamanho máximo permitido.",
                "path", "/"
        );
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(body);
    }

    // Handler: recurso não encontrado (404)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(
            ResourceNotFoundException ex) {
        Map<String, Object> body = Map.of(
                "timestamp", LocalDateTime.now(),
                "status", HttpStatus.NOT_FOUND.value(),
                "error", "Not Found",
                "message", ex.getMessage(),
                "path", "/"
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    // Handler: erro de negócio genérico (ex.: regra de negócio quebrada)
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Map<String, Object>> handleBusiness(
            BusinessException ex) {
        Map<String, Object> body = Map.of(
                "timestamp", LocalDateTime.now(),
                "status", HttpStatus.CONFLICT.value(),
                "error", "Conflict",
                "message", ex.getMessage(),
                "path", "/"
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    // Handler: qualquer exceção inesperada (NUNCA expõe stack trace)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(
            Exception ex) {
        // Em modo produção, não logar a exceção inteira para não expor
        // detalhes sensíveis. Logar via logger aqui (não mostrado no corpo).
        Map<String, Object> body = Map.of(
                "timestamp", LocalDateTime.now(),
                "status", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "error", "Internal Server Error",
                "message", "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
                "path", "/"
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
