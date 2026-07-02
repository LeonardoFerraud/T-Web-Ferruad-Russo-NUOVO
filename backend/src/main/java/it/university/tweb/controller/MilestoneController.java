package it.university.tweb.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.university.tweb.model.Milestone;
import it.university.tweb.service.MilestoneService;

@RestController
@RequestMapping("/api/milestones")
public class MilestoneController {
    private final MilestoneService milestoneService;

    public MilestoneController(MilestoneService milestoneService) {
        this.milestoneService = milestoneService;
    }

    @GetMapping
    public List<Milestone> getAll() {
        return milestoneService.findAll();
    }

    @PostMapping
    public ResponseEntity<Milestone> create(@RequestBody Milestone milestone) {
        return ResponseEntity.status(HttpStatus.CREATED).body(milestoneService.save(milestone));
    }
}
