import React, { useEffect, useState } from "react";
import { fetchTimetables } from "../services/api";
import {
  Timetable,
  DayOfWeek,
  TimeSlot,
  TimetableEntry,
  timeSlotRanges,
} from "../types/timetable";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// Initialize all time slots
const allTimeSlots = Object.values(TimeSlot);

const TimetableViewer: React.FC = () => {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTimetables = async () => {
      try {
        const data = await fetchTimetables();
        console.log("📦 Raw Timetables JSON from API:", JSON.stringify(data, null, 2));

        setTimetables(data);
        if (data.length > 0) {
          setSelectedSemester(data[0].semester);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load timetables"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTimetables();
  }, []);

  // Initialize grouped entries with all days and time slots
  const initializeGroupedEntries = () => {
    const entries: Record<DayOfWeek, Record<TimeSlot, TimetableEntry[]>> = {} as Record<
      DayOfWeek,
      Record<TimeSlot, TimetableEntry[]>
    >;

    // Initialize all days and time slots
    Object.values(DayOfWeek).forEach((day) => {
      entries[day] = {} as Record<TimeSlot, TimetableEntry[]>;
      allTimeSlots.forEach((slot) => {
        entries[day][slot] = [];
      });
    });

    return entries;
  };

  const getGroupedEntries = () => {
    const groupedEntries = initializeGroupedEntries();
    const currentTimetable = timetables.find(
      (t) => t.semester === selectedSemester
    );

    if (currentTimetable) {
      currentTimetable.entries.forEach((entry) => {
        const { dayOfWeek, timeSlot } = entry;
        if (groupedEntries[dayOfWeek] && groupedEntries[dayOfWeek][timeSlot]) {
          groupedEntries[dayOfWeek][timeSlot].push(entry);
        }
      });
    }

    return groupedEntries;
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (timetables.length === 0) return <Typography>No timetables available</Typography>;

  const semesters = Array.from(new Set(timetables.map((t) => t.semester)));
  const groupedEntries = getGroupedEntries();

  // Helper function for rendering course information
  const renderCourseInfo = (course: any) => (
    <>
      <Typography variant="subtitle2">{course.name || "Course Name Not Available"}</Typography>
      <Typography variant="body2">
        Prof: {course.professor ? `${course.professor.firstName} ${course.professor.lastName}` : "Professor Info Not Available"}
      </Typography>
    </>
  );

  // Helper function for rendering classroom information
  const renderClassroomInfo = (classroom: any) => (
    <Typography variant="body2">
      Room: {classroom.name || "Room Not Available"}
    </Typography>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Timetable Viewer
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Semester</InputLabel>
        <Select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value as string)}
          label="Semester"
        >
          {semesters.map((semester) => (
            <MenuItem key={semester} value={semester}>
              {semester}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="timetable">
          <TableHead>
            <TableRow>
              <TableCell>Time Slot</TableCell>
              {Object.values(DayOfWeek).map((day) => (
                <TableCell key={day}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allTimeSlots.map((slot) => (
              <TableRow key={slot}>
                <TableCell>
                  {`${timeSlotRanges[slot].start} - ${timeSlotRanges[slot].end}`}
                </TableCell>
                {Object.values(DayOfWeek).map((day) => (
                  <TableCell key={`${day}-${slot}`}>
                    {groupedEntries[day][slot].length === 0 ? (
                      <Typography variant="body2" color="textSecondary">
                        {/* No entry in the timeslot */}
                      </Typography>
                    ) : (
                      groupedEntries[day][slot].map((entry, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            mb: idx > 0 ? 2 : 0,
                            p: 1,
                            border: "1px solid #eee",
                            borderRadius: 1,
                          }}
                        >
                          {entry.course && renderCourseInfo(entry.course)}
                          {entry.classroom && renderClassroomInfo(entry.classroom)}
                        </Box>
                      ))
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimetableViewer;
