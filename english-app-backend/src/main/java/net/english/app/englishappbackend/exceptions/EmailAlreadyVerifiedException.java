package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;

public class EmailAlreadyVerifiedException extends AppException {

    public EmailAlreadyVerifiedException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
