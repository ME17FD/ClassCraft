package com.ClassCraft.classcraft.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ClassCraft.classcraft.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}