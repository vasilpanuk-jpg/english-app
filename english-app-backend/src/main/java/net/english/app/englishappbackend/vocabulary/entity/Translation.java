package net.english.app.englishappbackend.vocabulary.entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@EnableAspectJAutoProxy
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "translation", uniqueConstraints = @UniqueConstraint(columnNames = {"word_id" ,"language_code"}))
public class Translation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "word_id", nullable = false)
    private Word word;

    @ManyToOne
    @JoinColumn(name = "language_code")
    private Language language;


}
