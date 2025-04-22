# University Planning Application

A web-based university planning system that allows professors and PhD students to reserve classrooms, view personalized timetables, and export them as PDFs. The application provides an administrative interface for managing users, scheduling, and maintenance reports.

## Features

### User Roles

#### Professors & PhD Students
- Register and await admin approval.
- Log in after approval.
- Reserve available classrooms for specific sessions.
- View personal timetable (auto-generated from reservations).
- Export personal timetable as a **PDF** file.
- Report issues with classrooms (e.g., broken projector, maintenance).

#### Administrator
- Approve or reject new user registrations.
- Manage users (edit, delete, suspend).
- Manage **classrooms** on the floor grid:
  - Number of chairs
  - Space (in m²)
  - Projector (optional)
- Mark classrooms as **Out of Commission** based on user reports.
- Restore classrooms after maintenance.

---

## Scheduling & Timetables

- Users can reserve time slots for specific classrooms.
- Timetables prevent overlapping sessions or reservation conflicts.
- Classrooms marked as Out of Commission cannot be reserved.
- Timetables are user-specific and exportable as **PDFs**.

---

## Classroom & Floor Management

- Each classroom contains:
  - Number of chairs
  - Optional projector
  - Current status: Available / Reserved / Out of Commission

---

## Issue Reporting

- Professors/PhD students can report classroom issues.
- Reports include:
  - Classroom name
  - Description
  - (Optional) image/photo upload
- Admin reviews the report and updates classroom status.

---

## Tech Stack

### Backend
- **Spring Boot**
- **Spring Security** – authentication & authorization
- **Spring Data JPA** – ORM
- **MySQL / PostgreSQL** – database
- **OpenPDF** – generate timetable PDFs
- **Commons FileUpload** – handle image attachments in reports

### Frontend
- **React** – user interface
- Communicates with Spring Boot via REST APIs

---

## Setup Instructions
(coming soon)

