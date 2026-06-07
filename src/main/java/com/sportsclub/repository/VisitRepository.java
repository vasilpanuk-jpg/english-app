package com.sportsclub.repository;

import com.sportsclub.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findByClientId(Long clientId);
    @Query("SELECT v FROM Visit v WHERE v.visitTime BETWEEN ?1 AND ?2")
    List<Visit> findByDateRange(LocalDateTime start, LocalDateTime end);
    @Query("SELECT COUNT(v) FROM Visit v WHERE v.visitTime BETWEEN ?1 AND ?2")
    Long countByDateRange(LocalDateTime start, LocalDateTime end);
}