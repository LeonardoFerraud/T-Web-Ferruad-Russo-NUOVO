package it.university.tweb.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.university.tweb.dto.IncomeRequest;
import it.university.tweb.model.Income;
import it.university.tweb.service.IncomeService;
import it.university.tweb.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {
    private final IncomeService incomeService;
    private final UserService userService;

    public IncomeController(IncomeService incomeService, UserService userService) {
        this.incomeService = incomeService;
        this.userService = userService;
    }

    @GetMapping
    public List<Income> findMine() {
        return incomeService.findAll();
    }

    @PostMapping
    public ResponseEntity<Income> create(@Valid @RequestBody IncomeRequest request, Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(incomeService.create(request,
                userService.requireByUsername(authentication.getName())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        incomeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
