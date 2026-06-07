package com.sportsclub.repository;

import com.sportsclub.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    List<Trainer> findByActiveTrue();
}