package edu.unk.findmybook.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.unk.findmybook.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
}