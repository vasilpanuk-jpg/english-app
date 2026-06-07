package net.english.app.englishappbackend.vocabulary;

import org.springframework.web.bind.annotation.GetMapping;

public class VocabularyController {
    @GetMapping("/hello")
    public String hello() {
        return "SECURED ENDPOINT";
    }
}
