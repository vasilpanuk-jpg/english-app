package net.english.app.englishappbackend.vocabulary.controller;

import net.english.app.englishappbackend.vocabulary.dto.WordRequest;
import net.english.app.englishappbackend.vocabulary.entity.Word;
import net.english.app.englishappbackend.vocabulary.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vocabulary")
public class VocabularyController {

    private final WordRepository wordRepository;

    @Autowired
    public VocabularyController(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<Word> addWord(@RequestBody WordRequest request) {
        Word word = Word.builder()
                .english(request.getEnglish())
                .partOfSpeech(request.getPartOfSpeech())
                .transcription(request.getTranscription())
                .example1(request.getExample1())
                .example2(request.getExample2())
                .complexity(request.getComplexity() != null
                        ? net.english.app.englishappbackend.vocabulary.entity.Complexity
                                .valueOf(request.getComplexity())
                        : null)
                .build();
        Word saved = wordRepository.save(word);
        return ResponseEntity.ok(saved);
    }
}
