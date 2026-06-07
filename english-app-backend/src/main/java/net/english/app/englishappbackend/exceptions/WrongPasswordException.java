package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;

public class WrongPasswordException extends AppException {
    public WrongPasswordException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
