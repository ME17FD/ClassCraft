package com.ClassCraft.classcraft.dto;

public class CourseDTO {
    private Long id;
    private String name;
    private String description;
    private UserDTO professor;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public UserDTO getProfessor() {
        return professor;
    }
    public void setProfessor(UserDTO professor) {
        this.professor = professor;
    }
    
    // Constructors, getters, and setters
}