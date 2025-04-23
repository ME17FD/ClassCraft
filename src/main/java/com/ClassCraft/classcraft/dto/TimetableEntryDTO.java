package com.ClassCraft.classcraft.dto;

import com.ClassCraft.classcraft.model.TimetableEntry;

public class TimetableEntryDTO {

    private String dayOfWeek;
    private String timeSlot;
    private CourseDTO course;
    private ClassroomDTO classroom;

    public TimetableEntryDTO(ClassroomDTO classroom, CourseDTO course, String dayOfWeek, String timeSlot) {
        this.classroom = classroom;
        this.course = course;
        this.dayOfWeek = dayOfWeek;
        this.timeSlot = timeSlot;
    }

    // Static method to convert TimetableEntry to TimetableEntryDTO
    public static TimetableEntryDTO fromEntity(TimetableEntry entry) {
        // Convert the Classroom and Course entities to their respective DTOs
        ClassroomDTO classroomDTO = new ClassroomDTO(
                entry.getClassroom().getId(),
                entry.getClassroom().getName(),
                entry.getClassroom().getChairs(),
                entry.getClassroom().getHasProjector(),
                entry.getClassroom().getStatus(),
                entry.getClassroom().getFloor()
        );

        CourseDTO courseDTO = new CourseDTO(
                entry.getCourse().getId(),
                entry.getCourse().getName(),
                entry.getCourse().getDescription(),
                new UserDTO(entry.getCourse().getProfessor().getId(), entry.getCourse().getProfessor().getFirstName(), entry.getCourse().getProfessor().getLastName(),entry.getCourse().getProfessor().getEmail())
        );

        // Return the TimetableEntryDTO using the converted DTOs
        return new TimetableEntryDTO(
                classroomDTO,
                courseDTO,
                entry.getDayOfWeek().toString(),  // Day of the week as string
                entry.getTimeSlot().name()        // Time slot as string
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
    public CourseDTO getCourse() {
        return course;
    }
    public void setCourse(CourseDTO course) {
        this.course = course;
    }
    public ClassroomDTO getClassroom() {
        return classroom;
    }
    public void setClassroom(ClassroomDTO classroom) {
        this.classroom = classroom;
    }

    // Constructor, getters, and setters
}

