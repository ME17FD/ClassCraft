package com.ClassCraft.classcraft.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ClassCraft.classcraft.model.Classroom;
import com.ClassCraft.classcraft.model.ClassroomStatus;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    List<Classroom> findByStatus(ClassroomStatus status);
    List<Classroom> findByHasProjectorAndStatus(Boolean hasProjector, ClassroomStatus status);
}