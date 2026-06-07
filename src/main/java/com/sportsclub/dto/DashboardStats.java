package com.sportsclub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private Long totalClients;
    private Long activeMemberships;
    private Long todayVisits;
    private BigDecimal todayRevenue;
    private Long newClientsThisMonth;
    private Long expiringMemberships;
}