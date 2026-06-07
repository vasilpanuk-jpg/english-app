package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;

public class ExpiredTokenException extends AppException {
    public ExpiredTokenException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
