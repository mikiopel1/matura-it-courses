package com.example.demo.Dto;

import java.util.List;

public class UserDto {
    private Long id;
    private String auth0Id;
    private String email;
    private String username;
    private List<String> roles;

    public UserDto(Long id, String auth0Id, String email, String username, List<String> roles) {
        this.id = id;
        this.auth0Id = auth0Id;
        this.email = email;
        this.username = username;
        this.roles = roles;
    }

    // Gettery i settery

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuth0Id() {
        return auth0Id;
    }

    public void setAuth0Id(String auth0Id) {
        this.auth0Id = auth0Id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
