package com.example.demo.controller;

import com.example.demo.model.Course;
import com.example.demo.model.User;
import com.example.demo.service.CourseService;
//import com.example.demo.service.PurchaseService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final UserService userService;
    private final JwtDecoder jwtDecoder;

    @Autowired
    public CourseController(CourseService courseService, UserService userService, JwtDecoder jwtDecoder) {
        this.courseService = courseService;
        this.userService = userService;
        this.jwtDecoder = jwtDecoder;
    }

    // Dekodowanie JWT i pobieranie użytkownika
    private Optional<User> getUserFromToken(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        try {
            Jwt decodedJwt = jwtDecoder.decode(token);
            return userService.findByAuth0Id(decodedJwt.getSubject());
        } catch (Exception e) {
            return Optional.empty(); // Zwróć pusty Optional w przypadku błędu
        }
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses(@RequestHeader("Authorization") String authHeader) {
        Optional<User> optionalUser = getUserFromToken(authHeader);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User user = optionalUser.get();

        // Sprawdzamy, czy użytkownik ma rolę PREMIUM
        boolean hasPremiumRole = user.getRoles().stream()
                .anyMatch(role -> role.getName().equals("ROLE_USER_PREMIUM"));

        if (!hasPremiumRole) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        // Zwracamy listę kursów, jeśli użytkownik ma dostęp PREMIUM
        List<Course> courses = courseService.findAll();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        Optional<User> optionalUser = getUserFromToken(authHeader);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User user = optionalUser.get();

        // Sprawdzamy, czy użytkownik ma rolę PREMIUM
        boolean hasPremiumRole = user.getRoles().stream()
                .anyMatch(role -> role.getName().equals("ROLE_USER_PREMIUM"));

        if (!hasPremiumRole) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        // Zwracamy kurs, jeśli użytkownik ma dostęp PREMIUM
        Course course = courseService.findById(id);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }
}
