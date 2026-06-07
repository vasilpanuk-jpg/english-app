package net.english.app.englishappbackend.vocabulary.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import java.util.HashSet;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "language")
public class Language {
    @Id
    @Column(name = "code", length = 2)
    private String code;  // 'uk', 'pl', 'de', 'fr'

    @Column(name = "name", nullable = false)
    private String name;  // 'Українська', 'Польська'

    @OneToMany(mappedBy = "language", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Translation> translations = new HashSet<>();
}
