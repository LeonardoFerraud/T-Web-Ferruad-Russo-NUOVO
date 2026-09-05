package it.university.tweb.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FundRequest(
        @NotBlank String name,
        @NotNull @DecimalMin("0.00") BigDecimal value) {
}
