package com.ClassCraft.classcraft.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ClassCraft.classcraft.dto.ClassroomRequest;
import com.ClassCraft.classcraft.model.Classroom;
import com.ClassCraft.classcraft.repository.ClassroomRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {
    
    @Autowired
    private ClassroomRepository classroomRepository;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESSOR') or hasRole('STUDENT')")
    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createClassroom(@Valid @RequestBody ClassroomRequest classroomRequest) {
        Classroom classroom = new Classroom();
        classroom.setName(classroomRequest.getName());
        classroom.setChairs(classroomRequest.getChairs());
        classroom.setArea(classroomRequest.getArea());
        classroom.setHasProjector(classroomRequest.getHasProjector());
        classroom.setStatus(classroomRequest.getStatus());
        classroom.setFloor(classroomRequest.getFloor());
        classroom.setXCoord(classroomRequest.getXCoord());
        classroom.setYCoord(classroomRequest.getYCoord());
        
        classroomRepository.save(classroom);
        
        return ResponseEntity.ok("Classroom created successfully!");
    }
    
    // Additional endpoints for update, delete, etc.
}