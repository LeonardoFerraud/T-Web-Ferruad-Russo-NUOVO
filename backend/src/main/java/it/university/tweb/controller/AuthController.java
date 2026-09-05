package it.university.tweb.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.university.tweb.service.UserService;
import it.university.tweb.dto.RegisterRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;

    public AuthController(UserService userService, AuthenticationManager authenticationManager,
                          SecurityContextRepository securityContextRepository) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload,
                                   HttpServletRequest request, HttpServletResponse response) {
        String username = payload.get("username");
        String password = payload.get("password");
        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Credenziali mancanti"));
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);
            securityContextRepository.saveContext(context, request, response);
            return userService.findByUsername(username)
                    .map(user -> ResponseEntity.ok(Map.of("username", user.getUsername(), "role", user.getRole())))
                    .orElseGet(() -> ResponseEntity.status(401).body(Map.of("error", "Credenziali non valide")));
        } catch (org.springframework.security.core.AuthenticationException exception) {
            return ResponseEntity.status(401).body(Map.of("error", "Credenziali non valide"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            var user = userService.register(request);
            return ResponseEntity.status(201).body(Map.of("username", user.getUsername(), "role", user.getRole()));
        } catch (IllegalStateException exception) {
            return ResponseEntity.status(409).body(Map.of("error", "Nome utente già in uso"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> currentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Utente non autenticato"));
        }
        return userService.findByUsername(authentication.getName())
                .map(user -> ResponseEntity.ok(Map.of("username", user.getUsername(), "role", user.getRole())))
                .orElseGet(() -> ResponseEntity.status(401).build());
    }
}
