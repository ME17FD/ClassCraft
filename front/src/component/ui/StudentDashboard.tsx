// StudentDashboard.tsx
import { useState } from "react";
import styles from "../../styles/StudentDashboard.module.css";
import Sidebar from "./Sidebar";

type Tab = "schedule" | "exams" | "groups";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");

  // Données mockées
  const courses = [
    {
      day: "Lundi",
      time: "08:30 - 10:00",
      subject: "Algorithmique",
      type: "CM",
      room: "Amphi A",
    },
    {
      day: "Mardi",
      time: "14:00 - 17:00",
      subject: "TP Programmation",
      type: "TP",
      room: "Labo Info 3",
    },
    // ... autres cours
  ];

  const exams = [
    {
      id: 1,
      subject: "Base de données",
      date: "2024-06-15",
      time: "09:00 - 12:00",
      room: "Salle B204",
    },
    // ... autres examens
  ];

  const studentGroup = {
    name: "Groupe A",
    section: "Informatique - Développement Web",
    classmates: ["Alice Durand", "Pierre Dupont", "Sophie Martin"], // Top 3 camarades
  };

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <nav className={styles.navTabs}>
          {(["schedule", "exams", "groups"] as Tab[]).map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${
                activeTab === tab ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        <div className={styles.tabContent}>
          {activeTab === "schedule" && (
            <div className={styles.fadeIn}>
              <h2>Mon Emploi du Temps</h2>
              <div className={styles.scheduleGrid}>
                {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].map(
                  (day) => (
                    <div key={day} className={styles.dayColumn}>
                      <h3>{day}</h3>
                      {courses
                        .filter((course) => course.day === day)
                        .map((course, index) => (
                          <div key={index} className={styles.courseCard}>
                            <div className={styles.courseTime}>
                              {course.time}
                            </div>
                            <div className={styles.courseSubject}>
                              {course.subject}
                              <span className={styles.courseType}>
                                {course.type}
                              </span>
                            </div>
                            <div className={styles.courseRoom}>
                              {course.room}
                            </div>
                          </div>
                        ))}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {activeTab === "exams" && (
            <div className={styles.fadeIn}>
              <h2>Mes Examens</h2>
              <div className={styles.examsList}>
                {exams.map((exam) => (
                  <div key={exam.id} className={styles.examCard}>
                    <div className={styles.examHeader}>
                      <h3>{exam.subject}</h3>
                      <span className={styles.examDate}>
                        {new Date(exam.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <div className={styles.examDetails}>
                      <span>⏰ {exam.time}</span>
                      <span>📍 {exam.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "groups" && (
            <div className={styles.fadeIn}>
              <h2>Mon Groupe</h2>
              <div className={styles.groupInfo}>
                <div className={styles.groupCard}>
                  <h3>{studentGroup.name}</h3>
                  <p className={styles.groupSection}>{studentGroup.section}</p>
                  <div className={styles.classmates}>
                    <h4>Camarades de classe :</h4>
                    <ul>
                      {studentGroup.classmates.map((classmate, index) => (
                        <li key={index} className={styles.classmateItem}>
                          👤 {classmate}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
