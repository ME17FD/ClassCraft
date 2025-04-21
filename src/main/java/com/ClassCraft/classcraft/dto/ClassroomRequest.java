package com.ClassCraft.classcraft.dto;

import com.ClassCraft.classcraft.model.ClassroomStatus;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ClassroomRequest {
    
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be at most 100 characters")
    private String name;
    
    @NotNull(message = "Number of chairs is required")
    @Min(value = 1, message = "There must be at least 1 chair")
    private Integer chairs;
    
    
    @NotNull(message = "Projector status is required")
    private Boolean hasProjector;
    
    private ClassroomStatus status;
    
    @NotNull(message = "Floor number is required")
    @Min(value = 0, message = "Floor number cannot be negative")
    private Integer floor;
    
    @NotNull(message = "X coordinate is required")
    private Integer xCoord;
    
    @NotNull(message = "Y coordinate is required")
    private Integer yCoord;
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getChairs() { return chairs; }
    public void setChairs(Integer chairs) { this.chairs = chairs; }
    public Boolean getHasProjector() { return hasProjector; }
    public void setHasProjector(Boolean hasProjector) { this.hasProjector = hasProjector; }
    public ClassroomStatus getStatus() { return status; }
    public void setStatus(ClassroomStatus status) { this.status = status; }
    public Integer getFloor() { return floor; }
    public void setFloor(Integer floor) { this.floor = floor; }
    public Integer getXCoord() { return xCoord; }
    public void setXCoord(Integer xCoord) { this.xCoord = xCoord; }
    public Integer getYCoord() { return yCoord; }
    public void setYCoord(Integer yCoord) { this.yCoord = yCoord; }
}