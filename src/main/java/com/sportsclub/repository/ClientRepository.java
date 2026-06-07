package com.sportsclub.repository;

import com.sportsclub.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findByPhone(String phone);
    List<Client> findByActiveTrue();
    @Query("SELECT c FROM Client c WHERE c.firstName LIKE %?1% OR c.lastName LIKE %?1% OR c.phone LIKE %?1%")
    List<Client> search(String keyword);
}