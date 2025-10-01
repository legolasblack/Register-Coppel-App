package com.example.auth_service.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.auth_service.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    
    boolean existsByUsername(String username);
}