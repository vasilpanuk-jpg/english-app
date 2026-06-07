package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;

public class EmailAlreadyExistsException extends AppException {

    public EmailAlreadyExistsException(
            String message
    ) {
        super(message, HttpStatus.CONFLICT);
    }
}
