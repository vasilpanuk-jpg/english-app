package net.english.app.englishappbackend.exceptions;


import java.time.LocalDateTime;

public record ErrorResponse(

        String message,

        int status,

        LocalDateTime timestamp

) {
}