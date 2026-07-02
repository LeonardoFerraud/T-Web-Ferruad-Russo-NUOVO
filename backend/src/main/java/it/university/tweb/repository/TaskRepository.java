package it.university.tweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.university.tweb.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
}
