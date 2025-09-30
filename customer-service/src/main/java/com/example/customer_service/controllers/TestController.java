package com.example.customer_service.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;




    @RestController
    @RequestMapping("/v1/")
    public class TestController {

        @GetMapping("/hello")
        public String helloWorld() {
            return "hello world";
        }
    }
