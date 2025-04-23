package com.ClassCraft.classcraft.dto;

import com.ClassCraft.classcraft.model.ClassroomStatus;

public class ClassroomDTO {
    private Long id;
    private String name;
    private Integer chairs;
    private Boolean hasProjector;
    private ClassroomStatus status;
    private Integer floor;

    // Constructor
    public ClassroomDTO(Long id, String name, Integer chairs, Boolean hasProjector, ClassroomStatus status, Integer floor) {
        this.id = id;
        this.name = name;
        this.chairs = chairs;
        this.hasProjector = hasProjector;
        this.status = status;
        this.floor = floor;
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

    public Integer getChairs() {
        return chairs;
    }

    public void setChairs(Integer chairs) {
        this.chairs = chairs;
    }

    public Boolean getHasProjector() {
        return hasProjector;
    }

    public void setHasProjector(Boolean hasProjector) {
        this.hasProjector = hasProjector;
    }

    public ClassroomStatus getStatus() {
        return status;
    }

    public void setStatus(ClassroomStatus status) {
        this.status = status;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }
}
