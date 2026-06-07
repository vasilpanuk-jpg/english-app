package net.english.app.englishappbackend.security.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @Email
        @NotBlank
        String email,
        @NotBlank
        @Size(min = 8, max = 64)
        String password,
        @NotBlank
        @Size(min = 4, max = 32)
        String username
) {
}
