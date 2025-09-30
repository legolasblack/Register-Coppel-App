package com.example.auth_service.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/v1/")
public class TestController {

    @GetMapping("/helloauth")
    public String helloWord() {
        return "hello word desde la autentificacion";
    }
}