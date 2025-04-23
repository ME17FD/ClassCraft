package com.ClassCraft.classcraft.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ClassCraft.classcraft.dto.ClassroomDTO;
import com.ClassCraft.classcraft.dto.CourseDTO;
import com.ClassCraft.classcraft.dto.TimetableDTO;
import com.ClassCraft.classcraft.dto.TimetableEntryDTO;
import com.ClassCraft.classcraft.dto.UserDTO;
import com.ClassCraft.classcraft.model.Classroom;
import com.ClassCraft.classcraft.model.Course;
import com.ClassCraft.classcraft.model.Timetable;
import com.ClassCraft.classcraft.model.TimetableEntry;
import com.ClassCraft.classcraft.model.User;
import com.ClassCraft.classcraft.repository.TimetableRepository;

@Service
public class TimetableService {

    private final TimetableRepository timetableRepository;

    @Autowired
    public TimetableService(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }

    public List<Timetable> getAllTimetables() {
        return timetableRepository.findAll();
    }

    private TimetableDTO convertToDTO(Timetable timetable) {
        TimetableDTO dto = new TimetableDTO();
        dto.setId(timetable.getId());
        dto.setSemester(timetable.getSemester());
        
        if (timetable.getEntries() != null) {
            dto.setEntries(timetable.getEntries().stream()
                    .map(this::convertEntryToDTO)
                    .collect(Collectors.toSet()));
        }
        
        return dto;
    }

    private TimetableEntryDTO convertEntryToDTO(TimetableEntry entry) {
        TimetableEntryDTO dto = new TimetableEntryDTO();
        dto.setId(entry.getId());
        dto.setDayOfWeek(entry.getDayOfWeek());
        dto.setTimeSlot(entry.getTimeSlot());
        dto.setClassroom(convertClassroomToDTO(entry.getClassroom()));
        dto.setCourse(convertCourseToDTO(entry.getCourse()));
        return dto;
    }

    private ClassroomDTO convertClassroomToDTO(Classroom classroom) {
        ClassroomDTO dto = new ClassroomDTO();
        dto.setId(classroom.getId());
        dto.setName(classroom.getName());
        dto.setChairs(classroom.getChairs());
        dto.setHasProjector(classroom.getHasProjector());
        dto.setStatus(classroom.getStatus());
        dto.setFloor(classroom.getFloor());
        return dto;
    }

    private CourseDTO convertCourseToDTO(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setName(course.getName());
        dto.setDescription(course.getDescription());
        dto.setProfessor(convertUserToDTO(course.getProfessor()));
        return dto;
    }

    private UserDTO convertUserToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        // Set other relevant fields
        return dto;
    }
}