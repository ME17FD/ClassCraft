package com.ClassCraft.classcraft.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ClassCraft.classcraft.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    

    
    // Custom query to find a user by email
    Optional<User> findByEmail(String email);
    
    // Find all users (in case needed explicitly, JpaRepository already has a `findAll` method)
    List<User> findAll();
    

    
    // Delete user by email
    void deleteByEmail(String email);


}
