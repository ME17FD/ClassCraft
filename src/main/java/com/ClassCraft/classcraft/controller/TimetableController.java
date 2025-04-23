package com.ClassCraft.classcraft.controller;

import  java.util.List;

import  org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ClassCraft.classcraft.model.Timetable;
import com.ClassCraft.classcraft.service.TimetableService;

@RestController
@RequestMapping("/api/timetables")
public class TimetableController {

    private final TimetableService timetableService;

    @Autowired
    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @GetMapping
    public List<Timetable> getAllTimetables() {
        return timetableService.getAllTimetables();
    }
}