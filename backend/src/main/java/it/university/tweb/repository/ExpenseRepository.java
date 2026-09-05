package it.university.tweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.university.tweb.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
