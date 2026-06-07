package net.english.app.englishappbackend.security.dtos;

import jakarta.validation.constraints.NotBlank;

public record VerifyRequest(
        @NotBlank String token
) {
}