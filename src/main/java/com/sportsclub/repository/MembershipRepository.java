package com.sportsclub.repository;

import com.sportsclub.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
    List<Membership> findByClientId(Long clientId);
    @Query("SELECT m FROM Membership m WHERE m.client.id = ?1 AND m.status = 'ACTIVE' AND m.endDate >= ?2")
    List<Membership> findActiveByClientId(Long clientId, LocalDate date);
    @Query("SELECT m FROM Membership m WHERE m.status = 'ACTIVE' AND m.endDate < ?1")
    List<Membership> findExpired(LocalDate date);
}