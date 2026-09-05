package it.university.tweb.config;

import java.time.Instant;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<?> validationError(MethodArgumentNotValidException exception) {
        return error(HttpStatus.BAD_REQUEST, "Dati non validi");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<?> notFound(IllegalArgumentException exception) {
        return error(HttpStatus.NOT_FOUND, exception.getMessage());
    }

    private ResponseEntity<?> error(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(Map.of(
                "status", status.value(),
                "message", message,
                "timestamp", Instant.now().toString()));
    }
}