package com.ClassCraft.classcraft.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ClassCraft.classcraft.model.ERole;
import com.ClassCraft.classcraft.model.User;
import com.ClassCraft.classcraft.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;  // Inject UserRepository

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user
    public User registerUser(String firstName, String lastName, String email, String Hashedpassword, Set<ERole> roles) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
    
        User newUser = new User(firstName, lastName, email, Hashedpassword);
        newUser.setRoles(roles);
        return userRepository.save(newUser);
    }

    // Find a user by email
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Authenticate user (basic login)
    public boolean authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getHashedPassword());
    }

    // Delete user by email
    public boolean deleteUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return true;
        }
        return false;
    }

    // Method to check if an email already exists
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // Method to get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Additional useful methods you might want to consider:

    // Update user information
    public User updateUser(String email, String firstName, String lastName, String phone) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (firstName != null) user.setFirstName(firstName);
            if (lastName != null) user.setLastName(lastName);
            if (phone != null) user.setPhone(phone);
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found with email: " + email);
    }

    // Update user password
    public boolean updatePassword(String email, String oldPassword, String newPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(oldPassword, user.getHashedPassword())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }
}