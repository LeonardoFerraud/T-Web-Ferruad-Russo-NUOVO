package it.university.tweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.university.tweb.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByCategory(String category);
}
