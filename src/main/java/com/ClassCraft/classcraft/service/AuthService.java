package com.ClassCraft.classcraft.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ClassCraft.classcraft.dto.LoginRequest;
import com.ClassCraft.classcraft.dto.SignupRequest;
import com.ClassCraft.classcraft.model.User;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Login method to authenticate user
    public User login(LoginRequest request) {
        User user = userService.findUserByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email"));
                
        if (!passwordEncoder.matches(request.getPassword(), user.getHashedPassword())) {
            System.out.println(passwordEncoder.encode(request.getPassword()) );
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }

    // Register method to register a new user
    public User register(SignupRequest request) {
        if (userService.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already taken");
        }


        

        // Create the new user with the appropriate roles
        User newUser = new User(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getPhone(),
                request.getRole()
        );

        // Save the user to the database
        return userService.registerUser(
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getEmail(),
                newUser.getHashedPassword(),
                request.getPhone(),
                request.getRole()

        );
    }

    // Method to get all users (optional)
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    public void deleteUser(String email) {
        userService.findUserByEmail(email).ifPresent(user -> {
            userService.deleteUserByEmail(email);
        });
    }
}
