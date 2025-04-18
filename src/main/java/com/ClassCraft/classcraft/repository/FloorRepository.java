package com.ClassCraft.classcraft.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ClassCraft.classcraft.model.Floor;

@Repository
public interface FloorRepository extends JpaRepository<Floor, Long> {
}