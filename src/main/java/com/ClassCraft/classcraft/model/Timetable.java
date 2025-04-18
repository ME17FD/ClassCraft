package com.ClassCraft.classcraft.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "timetables")
public class Timetable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String semester;
    
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @OneToMany(mappedBy = "timetable", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TimetableEntry> entries;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Set<TimetableEntry> getEntries() { return entries; }
    public void setEntries(Set<TimetableEntry> entries) { this.entries = entries; }
}