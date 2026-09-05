package it.university.tweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import it.university.tweb.dto.IncomeRequest;
import it.university.tweb.model.Income;
import it.university.tweb.model.User;
import it.university.tweb.repository.IncomeRepository;

@Service
public class IncomeService {
    private final IncomeRepository repository;

    public IncomeService(IncomeRepository repository) { this.repository = repository; }

    public List<Income> findAll() { return repository.findAll(); }

    public Income create(IncomeRequest request, User user) {
        Income income = new Income();
        income.setSource(request.source());
        income.setAmount(request.amount());
        income.setDate(request.date());
        income.setUser(user);
        return repository.save(income);
    }

    public void delete(Long id) {
        repository.findById(id).ifPresentOrElse(repository::delete,
                () -> { throw new IllegalArgumentException("Income not found"); });
    }
}
