package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;

public class RefreshTokenExpiredException extends AppException {
    public RefreshTokenExpiredException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
