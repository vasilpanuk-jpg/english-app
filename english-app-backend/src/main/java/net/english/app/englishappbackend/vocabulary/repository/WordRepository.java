package net.english.app.englishappbackend.vocabulary.repository;

import net.english.app.englishappbackend.vocabulary.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    // Spring Data JPA provides basic CRUD methods
}
