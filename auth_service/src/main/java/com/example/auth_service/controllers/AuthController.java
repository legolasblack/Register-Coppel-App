package com.example.auth_service.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.auth_service.dtos.LoginRequestDto;
import com.example.auth_service.dtos.LoginResponseDto;
import com.example.auth_service.services.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        String token = authService.login(loginRequestDto.getUsername(), loginRequestDto.getPassword());
        return ResponseEntity.ok(new LoginResponseDto(token));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        try {
            String username = authService.getJwtUtil().extractUsername(token);
            return ResponseEntity.ok().body("Token válido para usuario: " + username);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Token inválido");
        }
    }
}