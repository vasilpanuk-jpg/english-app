package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;

public class UserAlreadyExistsException extends AppException {
    public UserAlreadyExistsException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}
