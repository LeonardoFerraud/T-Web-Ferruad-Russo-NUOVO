package it.university.tweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.university.tweb.model.Income;

public interface IncomeRepository extends JpaRepository<Income, Long> {
}
