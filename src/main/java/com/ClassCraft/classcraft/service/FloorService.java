package com.ClassCraft.classcraft.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ClassCraft.classcraft.dto.ClassroomDTO;
import com.ClassCraft.classcraft.dto.FloorDataDTO;
import com.ClassCraft.classcraft.model.Floor;
import com.ClassCraft.classcraft.repository.FloorRepository;

@Service
public class FloorService {

    @Autowired
    private FloorRepository floorRepository;

    public List<FloorDataDTO> getAllFloorData() {
        List<Floor> floors = floorRepository.findAll();

        return floors.stream().map(floor -> {
            List<ClassroomDTO> classrooms = floor.getClassrooms().stream().map(classroom -> {
                ClassroomDTO dto = new ClassroomDTO();
                dto.setId(classroom.getName());
                dto.setName(classroom.getName());
                dto.setStatus(classroom.getStatus().toString());
                dto.setCapacity(classroom.getChairs());
                dto.setHasProjector(classroom.getHasProjector());
                dto.setPosition("[" + (classroom.getFloor() * 10) + ", 0, 10]"); // Example of a static position
                dto.setDimensions("[4, 3, 6]"); // Example of static dimensions
                return dto;
            }).collect(Collectors.toList());

            FloorDataDTO floorDataDTO = new FloorDataDTO();
            floorDataDTO.setLevel(floor.getId());
            floorDataDTO.setClassrooms(classrooms);

            return floorDataDTO;
        }).collect(Collectors.toList());
    }
}
