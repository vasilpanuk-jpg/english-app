package com.sportsclub.dto;

import com.sportsclub.entity.Client;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ClientRequest {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    @NotBlank private String phone;
    private String email;
    private LocalDate birthDate;
    private String address;
    private String emergencyContact;
    private String notes;
}