package it.university.tweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import it.university.tweb.model.Milestone;
import it.university.tweb.repository.MilestoneRepository;

@Service
public class MilestoneService {
    private final MilestoneRepository milestoneRepository;

    public MilestoneService(MilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    public List<Milestone> findAll() {
        return milestoneRepository.findAll();
    }

    public Milestone save(Milestone milestone) {
        return milestoneRepository.save(milestone);
    }
}
