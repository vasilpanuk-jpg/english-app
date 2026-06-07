package net.english.app.englishappbackend.vocabulary.dto;

import lombok.Data;

@Data
public class WordRequest {
    private String english;
    private String partOfSpeech;
    private String transcription;
    private String example1;
    private String example2;
    private String complexity; // enum name as string
}
