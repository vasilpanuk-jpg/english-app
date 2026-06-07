package net.english.app.englishappbackend.security.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.english.app.englishappbackend.exceptions.ExpiredTokenException;
import net.english.app.englishappbackend.exceptions.RefreshTokenNotFoundException;
import net.english.app.englishappbackend.exceptions.UserAlreadyExistsException;
import net.english.app.englishappbackend.exceptions.WrongPasswordException;
import net.english.app.englishappbackend.exceptions.WrongVerificationTokenException;
import net.english.app.englishappbackend.security.JwtService;
import net.english.app.englishappbackend.security.dtos.AuthTokens;
import net.english.app.englishappbackend.security.dtos.LoginRequest;
import net.english.app.englishappbackend.security.dtos.RegisterRequest;
import net.english.app.englishappbackend.security.entity.RefreshToken;
import net.english.app.englishappbackend.security.entity.User;
import net.english.app.englishappbackend.security.entity.VerificationToken;
import net.english.app.englishappbackend.security.repository.UserRepository;
import net.english.app.englishappbackend.security.repository.VerificationTokenRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.dao.DataIntegrityViolationException;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import net.english.app.englishappbackend.exceptions.TooManyRequestsException;
import net.english.app.englishappbackend.exceptions.UserNotFoundException;
import net.english.app.englishappbackend.exceptions.EmailAlreadyVerifiedException;

@RequiredArgsConstructor
@Service
@Slf4j
public class DefaultAuthService implements AuthService {

    private final UserRepository userRepository;
    private final VerificationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    SecureRandom secureRandom = new SecureRandom();

    @Override
    @Transactional
    public AuthTokens login(LoginRequest request) {
        final String invalidCredentialsMessage = "Invalid email or password";

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new WrongPasswordException(invalidCredentialsMessage));

        if (!user.isEnabled()) {
            throw new WrongPasswordException(invalidCredentialsMessage);
        }

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new WrongPasswordException(invalidCredentialsMessage);
        }

        String accessToken = jwtService.generateToken(user.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        return new AuthTokens(accessToken, refreshToken.getToken());
    }

    @Override
    @Transactional
    public AuthTokens verify(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new WrongVerificationTokenException("Wrong verification code"));

        if (verificationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ExpiredTokenException("Verification code expired");
        }

        User user = verificationToken.getUser();
        user.setEnabled(true);

        userRepository.save(user);
        tokenRepository.deleteByToken(token);

        String accessToken = jwtService.generateToken(user.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        return new AuthTokens(accessToken, refreshToken.getToken());
    }

    @Override
    @Transactional
    public AuthTokens refresh(String refreshTokenValue) {
        if (refreshTokenValue == null || refreshTokenValue.isBlank()) {
            throw new RefreshTokenNotFoundException("Refresh token not found");
        }

        RefreshToken refreshToken = refreshTokenService.verifyToken(refreshTokenValue);
        User user = refreshToken.getUser();

        RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user);
        String accessToken = jwtService.generateToken(user.getEmail());

        return new AuthTokens(accessToken, newRefreshToken.getToken());
    }

    @Override
    @Transactional
    public void logout(String refreshTokenValue) {
        if (refreshTokenValue == null || refreshTokenValue.isBlank()) {
            return;
        }

        refreshTokenService.deleteByToken(refreshTokenValue);
    }

    @Override
    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new UserAlreadyExistsException("Email already exists");
        }
        if (userRepository.existsByUsername(request.username())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setUsername(request.username());

        user.setPassword(
                passwordEncoder.encode(request.password()));

        try {
            userRepository.save(user);
        } catch (DataIntegrityViolationException ex) {
            throw new UserAlreadyExistsException("Email or username already exists");
        }

        int code = 100000 + secureRandom.nextInt(900000);
        String token = String.valueOf(code);

        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpiresAt(
                LocalDateTime.now().plusMinutes(10));
        verificationToken.setLastSentAt(LocalDateTime.now());

        tokenRepository.save(verificationToken);

        try {
            emailService.sendVerificationEmail(
                    user.getEmail(), token);
        } catch (MessagingException e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void resendVerification(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found"));

        if (user.isEnabled()) {
            throw new EmailAlreadyVerifiedException("Email already verified");
        }

        VerificationToken token = tokenRepository.findByUser(user).orElse(null);

        LocalDateTime now = LocalDateTime.now();
        final long COOLDOWN_SECONDS = 30;

        if (token == null) {
            // create new token
            int code = 100000 + secureRandom.nextInt(900000);
            String newToken = String.valueOf(code);

            VerificationToken verificationToken = new VerificationToken();
            verificationToken.setToken(newToken);
            verificationToken.setUser(user);
            verificationToken.setExpiresAt(now.plusMinutes(10));
            verificationToken.setLastSentAt(now);

            tokenRepository.save(verificationToken);

            try {
                emailService.sendVerificationEmail(user.getEmail(), newToken);
            } catch (MessagingException e) {
                log.error(e.getMessage());
            }

            return;
        }

        if (token.getLastSentAt() != null && now.isBefore(token.getLastSentAt().plusSeconds(COOLDOWN_SECONDS))) {
            throw new TooManyRequestsException("Please wait before requesting another verification email");
        }

        // generate new code and update token
        int code = 100000 + secureRandom.nextInt(900000);
        String newToken = String.valueOf(code);

        token.setToken(newToken);
        token.setExpiresAt(now.plusMinutes(10));
        token.setLastSentAt(now);

        tokenRepository.save(token);

        try {
            emailService.sendVerificationEmail(user.getEmail(), newToken);
        } catch (MessagingException e) {
            log.error(e.getMessage());
        }
    }
}
