package com.example.demo.controller;

import com.example.demo.Dto.UserDto;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtDecoder jwtDecoder;

    @Autowired
    public AuthController(UserService userService, JwtDecoder jwtDecoder) {
        this.userService = userService;
        this.jwtDecoder = jwtDecoder;
    }

    @PostMapping("/register-or-update")
    public ResponseEntity<UserDto> registerOrUpdateUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        try {
            Jwt decodedJwt = jwtDecoder.decode(token);
            User user = userService.findOrCreateUser(decodedJwt);

            // Tworzymy obiekt DTO z rolami użytkownika
            List<String> roles = user.getRoles().stream()
                    .map(role -> role.getName())
                    .collect(Collectors.toList());

            UserDto userDto = new UserDto(user.getId(), user.getAuth0Id(), user.getEmail(), user.getUsername(), roles);
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } catch (JwtException e) {
            System.err.println("JWT decoding failed: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            System.err.println("An unexpected error occurred: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
