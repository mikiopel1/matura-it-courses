package com.example.demo.controller;

import com.example.demo.model.Course;
import com.example.demo.model.User;
import com.example.demo.service.CourseService;
import com.example.demo.service.PurchaseService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final PurchaseService purchaseService;
    private final UserService userService;
    private final JwtDecoder jwtDecoder;

    @Autowired
    public CourseController(CourseService courseService, PurchaseService purchaseService, UserService userService, JwtDecoder jwtDecoder) {
        this.courseService = courseService;
        this.purchaseService = purchaseService;
        this.userService = userService;
        this.jwtDecoder = jwtDecoder;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        // Usuwanie prefixu "Bearer " z nagłówka
        String idToken = authHeader.replace("Bearer ", "");
        System.out.println("Otrzymano żądanie GET dla kursu o ID: " + id);

        try {
            Jwt decodedJwt = jwtDecoder.decode(idToken);
            User user = userService.findOrCreateUser(decodedJwt);

            boolean hasPurchased = purchaseService.hasUserPurchasedCourse(user.getId(), id);

            if (!hasPurchased) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            Course course = courseService.findById(id);
            return new ResponseEntity<>(course, HttpStatus.OK);
        } catch (JwtException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        }
    }
}
