package com.example.demo.config;

import com.example.demo.model.Role;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Autowired
    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findByName("ROLE_USER").isEmpty()) {
            Role roleUser = new Role();
            roleUser.setName("ROLE_USER");
            roleRepository.save(roleUser);
        }

        if (roleRepository.findByName("ROLE_USER_PREMIUM").isEmpty()) {
            Role roleUserPremium = new Role();
            roleUserPremium.setName("ROLE_USER_PREMIUM");
            roleRepository.save(roleUserPremium);
        }

        // Możesz dodać inne role w podobny sposób
    }
}
