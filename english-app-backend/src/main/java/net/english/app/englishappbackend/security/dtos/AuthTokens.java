package net.english.app.englishappbackend.security.dtos;

public record AuthTokens(
        String accessToken,
        String refreshToken) {
}