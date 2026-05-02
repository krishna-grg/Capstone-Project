package edu.unk.findmybook.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import edu.unk.findmybook.config.JwtService;
import edu.unk.findmybook.dto.LoginRequest;
import edu.unk.findmybook.dto.LoginResponse;
import edu.unk.findmybook.model.Admin;
import edu.unk.findmybook.repository.AdminRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // @PostMapping("/create-admin")
    //     public String createAdmin() {

    //         Admin admin = new Admin();
    //         admin.setUsername("sahil");
    //         admin.setPassword(passwordEncoder.encode("123456"));
    //         admin.setRole(Role.ADMIN);

    //         adminRepository.save(admin);

    //         return "Admin created";
    //     }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (admin == null) {
            return ResponseEntity.status(401).body("Invalid admin username or password");
        }

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
        );

        if (!passwordMatches) {
            return ResponseEntity.status(401).body("Invalid admin username or password");
        }

        String token = jwtService.generateToken(admin);

        return ResponseEntity.ok(
                new LoginResponse(token, admin.getRole().name())
        );
    }
}