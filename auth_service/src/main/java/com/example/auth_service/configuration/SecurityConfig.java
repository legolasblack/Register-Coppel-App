package com.example.auth_service.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Solo para pruebas, no en producción
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/helloauth").permitAll() // Permitir sin autenticación
                                .anyRequest().authenticated()          // Otros sí requieren autenticación
                );
        return http.build();
    }
}
