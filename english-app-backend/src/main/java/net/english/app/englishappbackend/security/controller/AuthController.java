package net.english.app.englishappbackend.security.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.english.app.englishappbackend.ratelimiting.RateLimit;
import net.english.app.englishappbackend.security.dtos.*;
import net.english.app.englishappbackend.security.service.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

        private static final String REFRESH_COOKIE_NAME = "refreshToken";

        private final AuthService authService;


        @Value("${jwt.refresh-expiration}")
        private Long refreshExpiration;

        @PostMapping("/login")
        @RateLimit(requests = 5, durationSeconds = 900, key = "login:${#request.email}")
        public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
                AuthTokens authTokens = authService.login(request);
                ResponseCookie refreshCookie = buildRefreshTokenCookie(authTokens.refreshToken());

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                                .body(new AuthResponse(authTokens.accessToken()));
        }

        @PostMapping("/register")
        @RateLimit(requests = 3, durationSeconds = 86400, key = "register:${#request.email}")
        public void register(
                        @RequestBody RegisterRequest request) {
                log.info("Register new user {}, with email: {}", request.username(), request.email());
                authService.register(request);
        }

        @PostMapping("/resend")
        @RateLimit(requests = 5, durationSeconds = 900, key = "resend:${#request.email}")
        public void resendVerification(
                        @RequestBody ResendRequest request) {
                log.info("Resend verification for email: {}", request.email());
                authService.resendVerification(request.email());
        }

        @PostMapping("/verify")
        public ResponseEntity<AuthResponse> verify(
                        @RequestBody VerifyRequest request) {
                AuthTokens authTokens = authService.verify(request.token());
                ResponseCookie refreshCookie = buildRefreshTokenCookie(authTokens.refreshToken());

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                                .body(new AuthResponse(authTokens.accessToken()));
        }

        @PostMapping("/refresh")
        public ResponseEntity<AuthResponse> refresh(
                        @RequestBody(required = false) RefreshRequest request,
                        HttpServletRequest servletRequest) {
                String refreshTokenValue = extractRefreshTokenFromCookie(servletRequest);

                if ((refreshTokenValue == null || refreshTokenValue.isBlank()) && request != null) {
                        refreshTokenValue = request.refreshToken();
                }

                AuthTokens authTokens = authService.refresh(refreshTokenValue);
                ResponseCookie refreshCookie = buildRefreshTokenCookie(authTokens.refreshToken());

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                                .body(new AuthResponse(authTokens.accessToken()));
        }

        @PostMapping("/logout")
        public ResponseEntity<Void> logout(
                        @RequestBody(required = false) RefreshRequest request,
                        HttpServletRequest servletRequest) {
                String refreshTokenValue = extractRefreshTokenFromCookie(servletRequest);

                if ((refreshTokenValue == null || refreshTokenValue.isBlank()) && request != null) {
                        refreshTokenValue = request.refreshToken();
                }

                authService.logout(refreshTokenValue);

                return ResponseEntity.noContent()
                                .header(HttpHeaders.SET_COOKIE, clearRefreshTokenCookie().toString())
                                .build();
        }

        private ResponseCookie buildRefreshTokenCookie(String refreshToken) {
                return ResponseCookie.from(REFRESH_COOKIE_NAME, refreshToken)
                                .httpOnly(true)
                                .secure(false)
                                .sameSite("Lax")
                                .path("/")
                                .maxAge(refreshExpiration / 1000)
                                .build();
        }

        private ResponseCookie clearRefreshTokenCookie() {
                return ResponseCookie.from(REFRESH_COOKIE_NAME, "")
                                .httpOnly(true)
                                .secure(false)
                                .sameSite("Lax")
                                .path("/")
                                .maxAge(0)
                                .build();
        }

        private String extractRefreshTokenFromCookie(HttpServletRequest request) {
                Cookie[] cookies = request.getCookies();

                if (cookies == null) {
                        return null;
                }

                for (Cookie cookie : cookies) {
                        if (REFRESH_COOKIE_NAME.equals(cookie.getName())) {
                                return cookie.getValue();
                        }
                }

                return null;
        }

}
