package com.ClassCraft.classcraft;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class demoHelloWorldapi {

    @GetMapping("/hello")
    public String sayHello() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return "Hello from Spring Boot! Time now: " + LocalDateTime.now().format(formatter);
    }
}
