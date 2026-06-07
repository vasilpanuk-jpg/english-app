package com.sportsclub.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class MembershipRequest {
    @NotNull private Long clientId;
    @NotNull private Long membershipTypeId;
    @NotNull private LocalDate startDate;
}