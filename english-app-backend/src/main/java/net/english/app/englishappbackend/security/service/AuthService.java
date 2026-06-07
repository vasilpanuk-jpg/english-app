package net.english.app.englishappbackend.security.service;

import net.english.app.englishappbackend.security.dtos.AuthTokens;
import net.english.app.englishappbackend.security.dtos.LoginRequest;
import net.english.app.englishappbackend.security.dtos.RegisterRequest;

public interface AuthService {

    AuthTokens login(LoginRequest request);

    AuthTokens verify(String token);

    AuthTokens refresh(String refreshToken);

    void logout(String refreshToken);

    void register(RegisterRequest request);

    void resendVerification(String email);

}
