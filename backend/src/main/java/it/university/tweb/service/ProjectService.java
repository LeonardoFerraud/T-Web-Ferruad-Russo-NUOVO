package it.university.tweb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import it.university.tweb.model.Project;
import it.university.tweb.model.User;
import it.university.tweb.repository.ProjectRepository;
import it.university.tweb.repository.UserRepository;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }

    public List<Project> findByOwnerId(Long ownerId) {
        return projectRepository.findByOwnerId(ownerId);
    }

    public Project create(Project project, Long ownerId) {
        User owner = userRepository.findById(ownerId).orElseThrow(() -> new IllegalArgumentException("Owner not found"));
        project.setOwner(owner);
        return projectRepository.save(project);
    }

    public Project updateStatus(Long id, String status) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Project not found"));
        project.setStatus(status);
        return projectRepository.save(project);
    }
}
