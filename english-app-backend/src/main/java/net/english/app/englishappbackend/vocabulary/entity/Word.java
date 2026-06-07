package net.english.app.englishappbackend.vocabulary.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import java.util.HashSet;
import java.util.Set;

@EnableAspectJAutoProxy
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "word")
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "english", nullable = false, unique = true)
    private String english;
    @Column(name = "part_of_speech")
    private String partOfSpeech;
    @Column(name = "transcription")
    private String transcription;
    @Column(name = "example1", columnDefinition = "TEXT")
    private String example1;
    @Column(name = "example2", columnDefinition = "TEXT")
    private String example2;
    @Column(name = "complexity")
    @Enumerated(EnumType.STRING)
    private Complexity complexity;
    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Translation> translations = new HashSet<>();



}
