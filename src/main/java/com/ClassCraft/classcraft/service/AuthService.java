package com.ClassCraft.classcraft.service;

import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ClassCraft.classcraft.dto.LoginRequest;
import com.ClassCraft.classcraft.dto.SignupRequest;
import com.ClassCraft.classcraft.model.ERole;
import com.ClassCraft.classcraft.model.User;

@Service
public class AuthService {

    private final ConcurrentHashMap<String, User> users = new ConcurrentHashMap<>();

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User login(LoginRequest request) {
        User user = users.get(request.getUsername());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getHashedPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }

    public User register(SignupRequest request) {
        if (users.containsKey(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        boolean emailExists = users.values().stream()
                .anyMatch(u -> u.getEmail().equalsIgnoreCase(request.getEmail()));
        if (emailExists) {
            throw new RuntimeException("Email already registered");
        }

        // Validate and extract roles from the request
        Set<ERole> roles = request.getRoles().stream()
                .map(role -> {
                    try {
                        return ERole.valueOf(role.name());  // Convert each role string to an enum
                    } catch (IllegalArgumentException e) {
                        throw new RuntimeException("Invalid role: " + role.name());
                    }
                })
                .collect(Collectors.toSet());

        // If no roles are specified, default to ROLE_STUDENT
        if (roles.isEmpty()) {
            roles.add(ERole.ROLE_STUDENT);
        }

        User newUser = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                roles 
        );

        users.put(newUser.getUsername(), newUser);
        return newUser;
    }

    public List<User> getAllUsers() {
        return List.copyOf(users.values());
    }
}
