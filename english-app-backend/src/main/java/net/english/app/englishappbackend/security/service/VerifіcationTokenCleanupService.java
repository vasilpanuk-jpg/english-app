package net.english.app.englishappbackend.security.service;


import lombok.RequiredArgsConstructor;
import net.english.app.englishappbackend.security.repository.VerificationTokenRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class VerifіcationTokenCleanupService {

    private final VerificationTokenRepository repository;

    @Scheduled(fixedRate = 1000 * 60)
    public void cleanupExpiredToken() {
        repository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}
