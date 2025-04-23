package com.ClassCraft.classcraft.model;

import java.time.LocalTime;

public enum TimeSlot {
    SLOT_1(LocalTime.of(8, 0), LocalTime.of(10, 0)),
    SLOT_2(LocalTime.of(10, 15), LocalTime.of(12, 15)),
    SLOT_3(LocalTime.of(13, 0), LocalTime.of(15, 0)),
    SLOT_4(LocalTime.of(15, 15), LocalTime.of(17, 15));

    private final LocalTime startTime;
    private final LocalTime endTime;

    TimeSlot(LocalTime startTime, LocalTime endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }
}
