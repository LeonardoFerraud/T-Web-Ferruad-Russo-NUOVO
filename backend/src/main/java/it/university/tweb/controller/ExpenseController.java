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

import it.university.tweb.dto.ExpenseRequest;
import it.university.tweb.model.Expense;
import it.university.tweb.service.ExpenseService;
import it.university.tweb.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;
    private final UserService userService;

    public ExpenseController(ExpenseService expenseService, UserService userService) {
        this.expenseService = expenseService;
        this.userService = userService;
    }

    @GetMapping
    public List<Expense> findMine() {
        return expenseService.findAll();
    }

    @PostMapping
    public ResponseEntity<Expense> create(@Valid @RequestBody ExpenseRequest request, Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.create(request,
                userService.requireByUsername(authentication.getName())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        expenseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
