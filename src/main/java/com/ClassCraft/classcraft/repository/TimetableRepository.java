package com.ClassCraft.classcraft.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ClassCraft.classcraft.model.Timetable;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {
    Timetable findByUserIdAndSemester(Long userId, String semester);
}