package it.university.tweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.university.tweb.model.Milestone;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {}
