package net.english.app.englishappbackend.security.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ResendRequest(
        @Email
        @NotBlank
        String email
) {
}
