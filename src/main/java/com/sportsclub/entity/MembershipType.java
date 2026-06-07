package com.sportsclub.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "membership_types")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MembershipType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Integer durationDays;

    @Column(nullable = false)
    private BigDecimal price;

    private boolean active = true;
}
