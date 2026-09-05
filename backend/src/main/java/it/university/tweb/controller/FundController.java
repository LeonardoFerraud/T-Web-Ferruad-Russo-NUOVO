package it.university.tweb.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.university.tweb.dto.FundRequest;
import it.university.tweb.model.Fund;
import it.university.tweb.service.FundService;
import it.university.tweb.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/funds")
public class FundController {
    private final FundService fundService;
    private final UserService userService;

    public FundController(FundService fundService, UserService userService) {
        this.fundService = fundService;
        this.userService = userService;
    }

    @GetMapping
    public List<Fund> findMine() {
        return fundService.findAll();
    }

    @PostMapping
    public ResponseEntity<Fund> create(@Valid @RequestBody FundRequest request, Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(fundService.create(request,
                userService.requireByUsername(authentication.getName())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        fundService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
