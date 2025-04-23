package com.ClassCraft.classcraft.dto;

public class CourseDTO {
    private Long id;
    private String name;
    private String description;
    private UserDTO professor;

    // Constructor
    public CourseDTO(Long id, String name, String description, UserDTO professor) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.professor = professor;
    }

    // Getters and setters
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
}
