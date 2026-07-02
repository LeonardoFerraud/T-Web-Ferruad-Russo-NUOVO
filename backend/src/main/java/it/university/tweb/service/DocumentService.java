package it.university.tweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import it.university.tweb.model.Document;
import it.university.tweb.repository.DocumentRepository;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<Document> findByCategory(String category) {
        return documentRepository.findByCategory(category);
    }

    public Document save(Document document) {
        return documentRepository.save(document);
    }
}
