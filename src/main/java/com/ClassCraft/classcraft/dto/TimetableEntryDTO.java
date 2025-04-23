package com.ClassCraft.classcraft.dto;

import java.time.DayOfWeek;

import com.ClassCraft.classcraft.model.TimeSlot;

public class TimetableEntryDTO {
    private Long id;
    private DayOfWeek dayOfWeek;
    private TimeSlot timeSlot;
    private ClassroomDTO classroom;
    private CourseDTO course;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }
    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
    public TimeSlot getTimeSlot() {
        return timeSlot;
    }
    public void setTimeSlot(TimeSlot timeSlot) {
        this.timeSlot = timeSlot;
    }
    public ClassroomDTO getClassroom() {
        return classroom;
    }
    public void setClassroom(ClassroomDTO classroom) {
        this.classroom = classroom;
    }
    public CourseDTO getCourse() {
        return course;
    }
    public void setCourse(CourseDTO course) {
        this.course = course;
    }
    
    // Constructors, getters, and setters
}
