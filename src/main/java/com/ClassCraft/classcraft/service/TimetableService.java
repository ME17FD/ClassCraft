package com.ClassCraft.classcraft.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ClassCraft.classcraft.dto.*;
import com.ClassCraft.classcraft.model.*;
import com.ClassCraft.classcraft.repository.TimetableRepository;

@Service
public class TimetableService {

    private final TimetableRepository timetableRepository;

    @Autowired
    public TimetableService(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }

    public List<TimetableDTO> getAllTimetables() {
        return timetableRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TimetableDTO convertToDTO(Timetable timetable) {
        List<TimetableEntryDTO> entryDTOs = timetable.getEntries().stream()
                .map(this::convertEntryToDTO)
                .collect(Collectors.toList());

        return new TimetableDTO(
                timetable.getId(),
                timetable.getSemester(),
                entryDTOs
        );
    }

    private TimetableEntryDTO convertEntryToDTO(TimetableEntry entry) {
        return new TimetableEntryDTO(
            convertClassroomToDTO(entry.getClassroom()),

            convertCourseToDTO(entry.getCourse()),

                entry.getDayOfWeek().toString(),
                entry.getTimeSlot().name()
        );
    }

    private CourseDTO convertCourseToDTO(Course course) {
    // Make sure you convert the professor's data as well
    UserDTO professorDTO = new UserDTO(course.getProfessor().getId(), course.getProfessor().getFirstName(), course.getProfessor().getLastName(),course.getProfessor().getEmail());
    return new CourseDTO(
            course.getId(),
            course.getName(),
            course.getDescription(),
            professorDTO
    );
}

private ClassroomDTO convertClassroomToDTO(Classroom classroom) {
    return new ClassroomDTO(
            classroom.getId(),
            classroom.getName(),
            classroom.getChairs(),
            classroom.getHasProjector(),
            classroom.getStatus(),
            classroom.getFloor()
    );
}

}
