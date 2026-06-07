package net.english.app.englishappbackend.exceptions;

import org.springframework.http.HttpStatus;

public class MessagingException extends AppException {

    public MessagingException(String message) {
        super(message, HttpStatus.CONFLICT);
    }

}
