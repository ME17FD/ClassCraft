package com.ClassCraft.classcraft.controller;

import com.ClassCraft.classcraft.dto.FloorDataDTO;
import com.ClassCraft.classcraft.service.FloorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FloorController {

    @Autowired
    private FloorService floorService;

    @GetMapping("/api/floors")
    public List<FloorDataDTO> getAllFloorData() {
        return floorService.getAllFloorData();
    }
}
