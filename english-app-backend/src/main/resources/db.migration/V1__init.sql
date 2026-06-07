CREATE TABLE users (
                       id UUID PRIMARY KEY,
                       username VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       enabled BOOlEAN NOT NULL DEFAULT FALSE,
                       created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE user_profile (
                              id UUID PRIMARY KEY,
                              image_url VARCHAR(500),
                              user_id UUID UNIQUE,

                              CONSTRAINT fk_user_profile_user
                                  FOREIGN KEY (user_id)
                                    REFERENCES users(id)
                                  ON DELETE CASCADE
);

CREATE TABLE verification_token (
                                    id BIGINT PRIMARY KEY,
                                    token VARCHAR(255) NOT NULL,
                                    expires_at TIMESTAMP NOT NULL,
                                    user_id BIGINT NOT NULL UNIQUE,
                                    CONSTRAINT fk_verification_token_user
                                        FOREIGN KEY (user_id)
                                        REFERENCES users (id)
                                        ON DELETE CASCADE
);

CREATE INDEX idx_users_username
    ON users(username);