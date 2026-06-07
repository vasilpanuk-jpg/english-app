package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> handleAppException(
            AppException ex
    ) {

        ErrorResponse response = new ErrorResponse(
                        ex.getMessage(),
                        ex.getStatus().value(),
                        LocalDateTime.now()
                );

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(response);
    }



    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse>
    handleUnknown(Exception ex) {

        ErrorResponse response =
                new ErrorResponse(
                        "Internal server error",
                        500,
                        LocalDateTime.now()
                );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }



    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(
            MethodArgumentNotValidException ex
    ) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors()
                .forEach(error -> {
                    errors.put(
                            error.getField(),
                            Objects.requireNonNullElse(
                                    error.getDefaultMessage(),
                                    "Validation exception"
                            )
                    );
                });

        return ResponseEntity.badRequest().body(errors);
    }


}
