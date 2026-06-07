package net.english.app.englishappbackend.security.service;

import lombok.RequiredArgsConstructor;
import net.english.app.englishappbackend.exceptions.RefreshTokenExpiredException;
import net.english.app.englishappbackend.exceptions.RefreshTokenNotFoundException;
import net.english.app.englishappbackend.security.entity.RefreshToken;
import net.english.app.englishappbackend.security.entity.User;
import net.english.app.englishappbackend.security.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository repository;

    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;

    public RefreshToken createRefreshToken(User user) {

        repository.deleteByUser(user);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshExpiration))
                .build();

        return repository.save(refreshToken);
    }

    public RefreshToken verifyToken(String token) {

        RefreshToken refreshToken = repository.findByToken(token).orElseThrow(
                () -> new RefreshTokenNotFoundException("Refresh token not found"));

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            repository.delete(refreshToken);

            throw new RefreshTokenExpiredException("Token " + token + " expired!");
        }

        return refreshToken;
    }

    public void deleteByToken(String token) {
        repository.deleteByToken(token);
    }
}
