package com.sportsclub.repository;

import com.sportsclub.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByClientId(Long clientId);
    @Query("SELECT p FROM Payment p WHERE p.createdAt BETWEEN ?1 AND ?2")
    List<Payment> findByDateRange(LocalDateTime start, LocalDateTime end);
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.createdAt BETWEEN ?1 AND ?2 AND p.status = 'COMPLETED'")
    BigDecimal sumAmountByDateRange(LocalDateTime start, LocalDateTime end);
}