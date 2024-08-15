package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = userService.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            // Zwracanie JSON-a z polem 'message' w przypadku błędu
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());

        if (existingUser == null || !userService.checkPassword(user.getPassword(), existingUser.getPassword())) {
            // Zwracanie błędu 403 z wiadomością JSON, jeśli dane logowania są nieprawidłowe
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Collections.singletonMap("message", "Invalid username or password"));
        }

        if (!existingUser.isEmailConfirmed()) {
            // Zwracanie błędu 403 z wiadomością JSON, jeśli e-mail nie jest potwierdzony
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Collections.singletonMap("message", "Email not confirmed. Please check your inbox."));
        }

        // Jeśli logowanie się powiedzie, zwracamy użytkownika lub token, jeśli JWT jest używane
        return ResponseEntity.ok(existingUser);
    }


    @GetMapping("/confirm")
    public ResponseEntity<?> confirmEmail(@RequestParam("token") String token) {
        boolean isConfirmed = userService.confirmEmail(token);
        if (isConfirmed) {
            return ResponseEntity.ok(Collections.singletonMap("message", "Email confirmed successfully"));
        } else {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", "Invalid or expired confirmation token"));
        }
    }
}
