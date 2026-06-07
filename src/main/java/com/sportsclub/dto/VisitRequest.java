package com.sportsclub.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import com.sportsclub.entity.Visit;

@Data
public class VisitRequest {
    @NotNull private Long clientId;
    private Long membershipId;
    private Long trainerId;
    @NotNull private Visit.VisitType type;
    private String notes;
}