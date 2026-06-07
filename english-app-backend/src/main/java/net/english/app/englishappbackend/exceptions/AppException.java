package net.english.app.englishappbackend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class AppException
        extends RuntimeException {

    private final HttpStatus status;

    public AppException(
            String message,
            HttpStatus status
    ) {
        super(message);
        this.status = status;
    }
}
