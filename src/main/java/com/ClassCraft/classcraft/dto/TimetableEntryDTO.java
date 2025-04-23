package com.ClassCraft.classcraft.dto;

import com.ClassCraft.classcraft.model.TimetableEntry;

// TimetableEntryDTO.java
public class TimetableEntryDTO {
    private String dayOfWeek;
    private String timeSlot;
    private String courseName;
    private String classroomName;

    public TimetableEntryDTO(String dayOfWeek, String timeSlot, String courseName, String classroomName) {
        this.dayOfWeek = dayOfWeek;
        this.timeSlot = timeSlot;
        this.courseName = courseName;
        this.classroomName = classroomName;
    }

    public static TimetableEntryDTO fromEntity(TimetableEntry entry) {
        return new TimetableEntryDTO(
            entry.getDayOfWeek().toString(),
            entry.getTimeSlot().name(),
            entry.getCourse().getName(),
            entry.getClassroom().getName()
        );
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getClassroomName() {
        return classroomName;
    }

    public void setClassroomName(String classroomName) {
        this.classroomName = classroomName;
    }

    // Getters and setters
}
