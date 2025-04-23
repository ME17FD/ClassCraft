// components/TimetableViewer.tsx
import React, { useEffect, useState } from "react";
import { fetchTimetables } from "../services/api";
import {
  Timetable,
  DayOfWeek,
  TimeSlot,
  TimetableEntry,
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

    // Initialize all days
    Object.values(DayOfWeek).forEach((day) => {
      entries[day] = {} as Record<TimeSlot, TimetableEntry[]>;

      // Initialize all time slots for each day
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
        // Ensure the dayOfWeek and timeSlot are valid and properly populated
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
  if (timetables.length === 0)
    return <Typography>No timetables available</Typography>;

  const semesters = Array.from(new Set(timetables.map((t) => t.semester)));
  const groupedEntries = getGroupedEntries();

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
                <TableCell>{slot.replace("_", " ")}</TableCell>
                {Object.values(DayOfWeek).map((day) => (
                  <TableCell key={`${day}-${slot}`}>
                    {groupedEntries[day][slot].length === 0 ? (
                      <Typography variant="body2" color="textSecondary">
                        No classes
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
                          {/* Course information */}
                          {entry.course ? (
                            <>
                              <Typography variant="subtitle2">
                                {entry.course.name || "Course Name Not Available"}
                              </Typography>
                              <Typography variant="body2">
                                Prof:{" "}
                                {entry.course.professor
                                  ? `${entry.course.professor.firstName} ${entry.course.professor.lastName}`
                                  : "Professor Info Not Available"}
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              Course Info Not Available
                            </Typography>
                          )}

                          {/* Classroom information */}
                          {entry.classroom ? (
                            <Typography variant="body2">
                              Room: {entry.classroom.name || "Room Not Available"}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              Classroom Info Not Available
                            </Typography>
                          )}
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
