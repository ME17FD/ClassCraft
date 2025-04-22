package com.ClassCraft.classcraft.dto;

import java.util.List;

public class FloorDataDTO {
    private Long level;
    private List<ClassroomDTO> classrooms;

    // Getters and Setters
    public Long getLevel() {
        return level;
    }

    public void setLevel(Long level) {
        this.level = level;
    }

    public List<ClassroomDTO> getClassrooms() {
        return classrooms;
    }

    public void setClassrooms(List<ClassroomDTO> classrooms) {
        this.classrooms = classrooms;
    }
}
