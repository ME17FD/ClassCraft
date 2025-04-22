package com.ClassCraft.classcraft.dto;

import com.ClassCraft.classcraft.model.ERole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignupRequest {


    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
    @Size(min = 6, max = 40)
    private String firstName;

    @Size(min = 6, max = 40)
    private String lastName;

    
    @Size(min = 0, max = 20)
    private String phone;

    // Accept role as a string to be converted into ERole in service
    private ERole role;
    // Getters and setters



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    

    public ERole getRole() {
        return role;
    }
    public void setRole(ERole role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}