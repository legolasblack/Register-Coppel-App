package com.example.customer_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.customer_service.entities.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}