package com.ClassCraft.classcraft;  // Adjust the package name to your project structure

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/public/**", "/hello", "/about").permitAll()  // Allow these pages without authentication
                    .requestMatchers("/api/public/**").permitAll()  // Allow public API access
                    .anyRequest().authenticated()  // Require authentication for all other pages
            )
            .formLogin(formLogin ->
                formLogin
                    .loginPage("/login")  // Custom login page
                    .permitAll()  // Allow anyone to access the login page
            )
            .logout(logout ->
                logout
                    .permitAll()  // Allow anyone to log out
            );

        return http.build();
    }
}
