package com.ClassCraft.classcraft.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "classrooms")
public class Classroom {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private Integer chairs;
    
    @Column(name = "has_projector")
    private Boolean hasProjector;
    
    @Enumerated(EnumType.STRING)
    private ClassroomStatus status;
    
    private Integer floor;

    
    @ManyToOne
    @JoinColumn(name = "floor_id")
    private Floor floorEntity;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public Floor getFloorEntity() { return floorEntity; }
    public void setFloorEntity(Floor floorEntity) { this.floorEntity = floorEntity; }
}