package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    public User save(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already in use");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        User savedUser = userRepository.save(user);

        // Wyślij e-mail z tokenem potwierdzającym
        sendConfirmationEmail(savedUser);

        return savedUser;
    }

    private void sendConfirmationEmail(User user) {
        String to = user.getEmail();
        String subject = "Please confirm your email address";
        String confirmationUrl = "http://localhost:8080/api/users/confirm?token=" + user.getConfirmationToken();
        String message = "To confirm your email address, please click the following link: " + confirmationUrl;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(to);
        email.setFrom("liguelegends1@gmail.com");
        email.setSubject(subject);
        email.setText(message);

        mailSender.send(email);

    }
    public boolean confirmEmail(String token) {
        User user = userRepository.findByConfirmationToken(token);
        if (user != null && !user.isEmailConfirmed()) {
            user.setEmailConfirmed(true);
            user.setConfirmationToken(null); // Usunięcie tokenu po potwierdzeniu
            userRepository.save(user);
            return true;
        }
        return false;
    }

}
