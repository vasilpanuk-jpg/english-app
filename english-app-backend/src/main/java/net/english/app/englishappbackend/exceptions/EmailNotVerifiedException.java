package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;

public class EmailNotVerifiedException extends AppException {

    public EmailNotVerifiedException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
