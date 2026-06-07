package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;

public class WrongVerificationTokenException extends AppException {
    public WrongVerificationTokenException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
