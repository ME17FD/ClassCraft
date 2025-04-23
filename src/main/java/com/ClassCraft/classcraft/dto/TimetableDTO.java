package com.ClassCraft.classcraft.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ClassCraft.classcraft.model.Timetable;

// TimetableDTO.java
public class TimetableDTO {
    private Long id;
    private String semester;
    private List<TimetableEntryDTO> entries;

    public TimetableDTO(Long id, String semester, List<TimetableEntryDTO> entries) {
        this.id = id;
        this.semester = semester;
        this.entries = entries;
    }

    public static TimetableDTO fromEntity(Timetable timetable) {
        List<TimetableEntryDTO> entryDTOs = timetable.getEntries().stream()
    .map(TimetableEntryDTO::fromEntity)
    .collect(Collectors.toList());

        return new TimetableDTO(timetable.getId(), timetable.getSemester(), entryDTOs);
    }
    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public List<TimetableEntryDTO> getEntries() {
        return entries;
    }

    public void setEntries(List<TimetableEntryDTO> entries) {
        this.entries = entries;
    }

}
