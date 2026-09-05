package it.university.tweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.university.tweb.model.Fund;

public interface FundRepository extends JpaRepository<Fund, Long> {
}
