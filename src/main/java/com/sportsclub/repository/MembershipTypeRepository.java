package com.sportsclub.repository;

import com.sportsclub.entity.MembershipType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MembershipTypeRepository extends JpaRepository<MembershipType, Long> {
    List<MembershipType> findByActiveTrue();
}