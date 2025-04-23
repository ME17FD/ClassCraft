package com.ClassCraft.classcraft.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ClassCraft.classcraft.dto.TimetableDTO;
import com.ClassCraft.classcraft.dto.TimetableEntryDTO;
import com.ClassCraft.classcraft.model.Timetable;
import com.ClassCraft.classcraft.model.TimetableEntry;
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
                entry.getDayOfWeek().toString(),
                entry.getTimeSlot().name(),
                entry.getClassroom().getName(),
                entry.getCourse().getName()
        );
    }
}
