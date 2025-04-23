package com.ClassCraft.classcraft.dto;

import java.util.Set;

public class TimetableDTO {
    private Long id;
    private String semester;
    private Set<TimetableEntryDTO> entries;
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
    public Set<TimetableEntryDTO> getEntries() {
        return entries;
    }
    public void setEntries(Set<TimetableEntryDTO> entries) {
        this.entries = entries;
    }
    
    // Constructors, getters, and setters
}