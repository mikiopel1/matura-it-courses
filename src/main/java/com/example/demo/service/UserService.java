package com.example.demo.service;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.hibernate.NonUniqueResultException; // Ensure this import is here
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;

    @Autowired
    public UserService(UserRepository userRepository, RoleService roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    // Metoda znajdowania użytkownika na podstawie auth0Id
    public Optional<User> findByAuth0Id(String auth0Id) {
        return userRepository.findByAuth0Id(auth0Id);
    }

    // Metoda znajdowania lub tworzenia użytkownika na podstawie JWT
    public User findOrCreateUser(Jwt jwt) {
        String auth0Id = jwt.getSubject();
        String email = jwt.getClaim("email");
        String username = jwt.getClaim("nickname");

        System.out.println("Decoded JWT Claims: " + jwt.getClaims());
        System.out.println("Auth0 ID: " + auth0Id);
        System.out.println("Email: " + email);
        System.out.println("Username: " + username);

        // Szukanie użytkownika na podstawie Auth0 ID
        Optional<User> existingUser = userRepository.findByAuth0Id(auth0Id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            System.out.println("User already exists: " + user);

            // Debugowanie ról użytkownika po załadowaniu z bazy danych
            user.getRoles().forEach(role -> System.out.println("Role loaded from DB: " + role.getName()));

            return user;
        } else {
            System.out.println("User does not exist, creating new user.");
            User newUser = new User();
            newUser.setAuth0Id(auth0Id);
            newUser.setEmail(email);
            newUser.setUsername(username);

            // Przypisanie podstawowej roli
            Role userRole = roleService.findByName("ROLE_USER");

            // Dodanie roli do nowo utworzonego użytkownika
            newUser.getRoles().add(userRole);

            // Debugowanie ról przed zapisaniem użytkownika
            newUser.getRoles().forEach(role -> System.out.println("Role before saving: " + role.getName()));

            // Zapisz użytkownika w bazie danych
            User savedUser = userRepository.save(newUser);

            // Debugowanie ról po zapisaniu użytkownika
            savedUser.getRoles().forEach(role -> System.out.println("Role after saving: " + role.getName()));

            return savedUser;
        }
    }

    // Metoda wyszukiwania użytkownika na podstawie emaila
    public List<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Metoda do wyszukiwania unikalnego użytkownika na podstawie emaila
    public Optional<User> findUniqueByEmail(String email) {
        List<User> users = userRepository.findByEmail(email);
        if (users.isEmpty()) {
            return Optional.empty(); // Zwróć pusty Optional, jeśli nie znaleziono użytkownika
        }
        if (users.size() > 1) {
            throw new NonUniqueResultException(1);
        }
        return Optional.of(users.get(0)); // Zwróć jedynego użytkownika jako Optional
    }

    // Metoda do aktualizacji roli użytkownika na ROLE_USER_PREMIUM
    public void updateUserRoleToPremium(User user) {
        // Znajdź rolę PREMIUM
        Role premiumRole = roleService.findByName("ROLE_USER_PREMIUM");

        // Usuń poprzednie role i przypisz nową
        user.getRoles().clear();
        user.getRoles().add(premiumRole);

        // Zapisz zmiany w bazie danych
        userRepository.save(user);

        System.out.println("Rola użytkownika została zaktualizowana na ROLE_USER_PREMIUM");
    }
}
