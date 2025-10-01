package com.example.auth_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.auth_service.entities.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}