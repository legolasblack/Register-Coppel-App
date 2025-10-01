package com.example.auth_service.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequestDto {

    @NotBlank(message = "El nombre de usuario es obligatorio")
    private String username;
    @NotBlank(message = "la contraseña es obligatoria")
    private String password;
}