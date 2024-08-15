package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findOrCreateUser(Jwt jwt) {
        String auth0Id = jwt.getSubject();
        String email = jwt.getClaim("email");
        String username = jwt.getClaim("nickname");
        //List<String> roles = jwt.getClaimAsStringList("roles");

        System.out.println("Decoded JWT Claims: " + jwt.getClaims()); // Logowanie całego JWT
        System.out.println("Auth0 ID: " + auth0Id);
        System.out.println("Email: " + email);
        System.out.println("Username: " + username);
        //System.out.println("Roles: " + roles);

        // Logowanie, czy użytkownik istnieje
        Optional<User> existingUser = userRepository.findByAuth0Id(auth0Id);
        if (existingUser.isPresent()) {
            System.out.println("User already exists: " + existingUser.get());
        } else {
            System.out.println("User does not exist, creating new user.");
        }

        return existingUser.orElseGet(() -> {
            User newUser = new User();
            newUser.setAuth0Id(auth0Id);
            newUser.setEmail(email);
            newUser.setUsername(username);
            //newUser.setRoles(new HashSet<>(roles));

            System.out.println("Saving new user: " + newUser);
            return userRepository.save(newUser);
        });
    }
}
