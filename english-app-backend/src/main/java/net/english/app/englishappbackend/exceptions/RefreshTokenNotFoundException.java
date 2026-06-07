package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;

public class RefreshTokenNotFoundException extends AppException {
    public RefreshTokenNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
