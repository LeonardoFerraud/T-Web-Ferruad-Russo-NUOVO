package it.university.tweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import it.university.tweb.dto.FundRequest;
import it.university.tweb.model.Fund;
import it.university.tweb.model.User;
import it.university.tweb.repository.FundRepository;

@Service
public class FundService {
    private final FundRepository repository;

    public FundService(FundRepository repository) { this.repository = repository; }
    public List<Fund> findAll() { return repository.findAll(); }

    public Fund create(FundRequest request, User user) {
        Fund fund = new Fund();
        fund.setName(request.name());
        fund.setValue(request.value());
        fund.setUser(user);
        return repository.save(fund);
    }

    public void delete(Long id) {
        repository.findById(id).ifPresentOrElse(repository::delete,
                () -> { throw new IllegalArgumentException("Fund not found"); });
    }
}
