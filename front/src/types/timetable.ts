// types/timetable.ts
export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export enum TimeSlot {
    SLOT_1 = "SLOT_1",
    SLOT_2 = "SLOT_2",
    SLOT_3 = "SLOT_3",
    SLOT_4 = "SLOT_4",
  }
  
  export const timeSlotRanges: Record<TimeSlot, { start: string, end: string }> = {
    SLOT_1: { start: "08:00", end: "10:00" },
    SLOT_2: { start: "10:15", end: "12:15" },
    SLOT_3: { start: "13:00", end: "15:00" },
    SLOT_4: { start: "15:15", end: "17:15" },
  };
export enum ClassroomStatus {
  AVAILABLE = "AVAILABLE",
  UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
  OCCUPIED = "OCCUPIED",
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Classroom {
  id: number;
  name: string;
  chairs: number | null;
  hasProjector: boolean | null;
  status: ClassroomStatus | null;
  floor: number | null;
}

export interface Course {
  id: number;
  name: string;
  description: string | null;
  professor: User;
}

export interface TimetableEntry {
  id: number;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
  classroom: Classroom;
  course: Course;
}

export interface Timetable {
  id: number;
  semester: string;
  entries: TimetableEntry[];
}
