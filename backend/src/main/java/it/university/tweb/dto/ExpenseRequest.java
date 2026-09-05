package it.university.tweb.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ExpenseRequest(
        @NotBlank String source,
        @NotNull @DecimalMin("0.01") BigDecimal amount,
        @NotNull LocalDate date) {
}
