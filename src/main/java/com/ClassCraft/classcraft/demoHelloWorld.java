package com.ClassCraft.classcraft;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class demoHelloWorld {

    @GetMapping(value = "/hello", produces = "text/html")
    public String helloWorld() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
    String currentTime = LocalDateTime.now().format(formatter);
    return "<html><head><meta http-equiv='refresh' content='1'></head><body>" +
           "<h1>Hello World!</h1>" +
           "<p>Current server time is: <strong>" + currentTime + "</strong></p>" +
           "</body></html>";
    }

}
