package edu.unk.findmybook.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import edu.unk.findmybook.model.Admin;
import edu.unk.findmybook.model.Role;
import edu.unk.findmybook.repository.AdminRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // CHECK IF DEFAULT ADMIN EXISTS, IF NOT CREATE ONE
        if (adminRepository.findByUsername("12345678@nebraska.edu").isEmpty()) {
            Admin admin = new Admin();
            admin.setUsername("12345678@nebraska.edu"); 
            admin.setPassword(passwordEncoder.encode("LopersUNK"));
            admin.setRole(Role.ADMIN);

            adminRepository.save(admin); //SAVE 

            System.out.println("Default admin created: 12345678@nebraska.edu / LopersUNK");
        }
    }
}