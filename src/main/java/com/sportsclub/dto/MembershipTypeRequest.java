package com.sportsclub.dto;

import com.sportsclub.entity.MembershipType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class MembershipTypeRequest {
    @NotBlank private String name;
    private String description;
    @Positive private Integer durationDays;
    @Positive private BigDecimal price;
}