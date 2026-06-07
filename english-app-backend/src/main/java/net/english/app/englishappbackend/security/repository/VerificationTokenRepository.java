package net.english.app.englishappbackend.security.repository;

import net.english.app.englishappbackend.security.entity.User;
import net.english.app.englishappbackend.security.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, UUID> {
    Optional<VerificationToken> findByToken(String token);
    Optional<VerificationToken> findByUser(User user);

    @Transactional
    void deleteByExpiresAtBefore(LocalDateTime expiresAtBefore);

    @Transactional
    void deleteByToken(String token);
}
