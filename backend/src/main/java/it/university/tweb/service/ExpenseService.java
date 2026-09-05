package it.university.tweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import it.university.tweb.dto.ExpenseRequest;
import it.university.tweb.model.Expense;
import it.university.tweb.model.User;
import it.university.tweb.repository.ExpenseRepository;

@Service
public class ExpenseService {
    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) { this.repository = repository; }
    public List<Expense> findAll() { return repository.findAll(); }

    public Expense create(ExpenseRequest request, User user) {
        Expense expense = new Expense();
        expense.setSource(request.source());
        expense.setAmount(request.amount());
        expense.setDate(request.date());
        expense.setUser(user);
        return repository.save(expense);
    }

    public void delete(Long id) {
        repository.findById(id).ifPresentOrElse(repository::delete,
                () -> { throw new IllegalArgumentException("Expense not found"); });
    }
}
