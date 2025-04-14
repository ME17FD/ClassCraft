package com.ClassCraft.classcraft.service;

import java.util.List;
import java.util.Set;
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

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Login method to authenticate user
    public User login(LoginRequest request) {
        User user = userService.findUserByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getHashedPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }

    // Register method to register a new user
    public User register(SignupRequest request) {
        if (userService.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        if (userService.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Add roles directly as ERole
        Set<ERole> roles = request.getRoles().stream()
                .collect(Collectors.toSet());

        // If no roles are provided, default to ROLE_STUDENT
        if (roles.isEmpty()) {
            roles.add(ERole.ROLE_STUDENT);  // Default role if none provided
        }

        // Create the new user with the appropriate roles
        User newUser = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                roles
        );

        // Save the user to the database
        return userService.registerUser(
                newUser.getUsername(),
                newUser.getEmail(),
                newUser.getHashedPassword(),
                roles
        );
    }

    // Method to get all users (optional)
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    public void deleteUser(String username) {
        userService.findUserByUsername(username).ifPresent(user -> {
            userService.deleteUserByUsername(username);
        });
    }
}
