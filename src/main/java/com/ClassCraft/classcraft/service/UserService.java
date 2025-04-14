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
    public User registerUser(String username, String email, String password, Set<ERole> roles) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already taken");
        }
    
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
    
        User newUser = new User(username, email, password, roles);
        return userRepository.save(newUser); // This will persist ALL roles
    }

    // Find a user by username
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Find a user by email
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Authenticate user (basic login)
    public boolean authenticateUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return passwordEncoder.matches(password, user.getHashedPassword());
        }

        return false; // User not found
    }

    // Method to check if a username already exists
    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    // Method to check if an email already exists
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // Method to get all users (optional)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    

    public boolean deleteUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return true;
        }
        return false;
    }
    

    public int deleteUsersByUsernames(Set<String> usernames) {
        List<User> usersToDelete = userRepository.findAllByUsernameIn(usernames);
        userRepository.deleteAll(usersToDelete);
        return usersToDelete.size();
    }
}
