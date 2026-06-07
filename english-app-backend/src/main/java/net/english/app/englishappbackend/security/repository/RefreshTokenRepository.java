package net.english.app.englishappbackend.security.repository;

import net.english.app.englishappbackend.security.entity.RefreshToken;
import net.english.app.englishappbackend.security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    void deleteByUser(User user);

    void deleteByToken(String token);
}
