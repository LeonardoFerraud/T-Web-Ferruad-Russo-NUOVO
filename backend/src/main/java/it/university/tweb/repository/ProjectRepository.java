package it.university.tweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.university.tweb.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOwnerId(Long ownerId);
}
