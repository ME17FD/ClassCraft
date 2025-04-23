// ProfessorDashboard.tsx
import { useState } from "react";
import styles from "../../styles/ProfessorDashboard.module.css";
import Sidebar from "./Sidebar";

// Définition des types TypeScript
type Tab = "schedule" | "groups" | "reservation" | "requests" | "profile";

interface ReservationRequest {
  id: number;
  date: string;
  time: string;
  duration: string;
  status: "pending" | "approved" | "rejected";
}

const ProfessorDashboard = () => {
  // États du composant
  const [activeTab, setActiveTab] = useState<Tab>("schedule");
  const [reservationForm, setReservationForm] = useState({
    date: "",
    time: "",
    duration: "1",
  });

  // État du profil
  const [profileData, setProfileData] = useState({
    name: "Dr. Dupont",
    email: "dupont@univ.fr",
    specialty: "Informatique",
    office: "Bâtiment A, Bureau 302",
  });

  // État des demandes de réservation
  const [requests, setRequests] = useState<ReservationRequest[]>([
    {
      id: 1,
      date: "2024-03-20",
      time: "14:00",
      duration: "2",
      status: "pending",
    },
  ]);

  // Soumission du formulaire de réservation
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: ReservationRequest = {
      id: Date.now(),
      ...reservationForm,
      status: "pending",
    };
    setRequests([...requests, newRequest]);
    setReservationForm({ date: "", time: "", duration: "1" });
  };

  // Mise à jour du profil
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profil mis à jour:", profileData);
    // Ajouter logique API ici
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className={styles.container}>
        {/* Navigation par onglets */}
        <nav className={styles.navTabs}>
          {(
            [
              "schedule",
              "groups",
              "reservation",
              "requests",
              "profile",
            ] as Tab[]
          ).map((tab) => (
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

        {/* Contenu dynamique des onglets */}
        <div className={styles.tabContent}>
          {/* Onglet Emploi du temps */}
          {activeTab === "schedule" && (
            <div className={styles.fadeIn}>
              <h2>Mon Emploi du Temps - Semaine 12</h2>
              <div className={styles.calendar}>
                {/* Lundi */}
                <div className={styles.dayColumn}>
                  <div className={styles.dayHeader}>Lundi</div>
                  <div className={styles.courseItem}>
                    <div className={styles.courseTime}>08:30 - 10:00</div>
                    <div className={styles.courseTitle}>
                      Algorithmique avancée
                    </div>
                    <div className={styles.courseLocation}>Salle A204</div>
                  </div>
                  <div className={styles.courseItem}>
                    <div className={styles.courseTime}>14:00 - 17:00</div>
                    <div className={styles.courseTitle}>TP Programmation</div>
                    <div className={styles.courseLocation}>
                      Labo Informatique 3
                    </div>
                  </div>
                </div>

                {/* Mardi */}
                <div className={styles.dayColumn}>
                  <div className={styles.dayHeader}>Mardi</div>
                  <div className={styles.courseItem}>
                    <div className={styles.courseTime}>10:30 - 12:30</div>
                    <div className={styles.courseTitle}>
                      Réunion département
                    </div>
                    <div className={styles.courseLocation}>
                      Salle des professeurs
                    </div>
                  </div>
                </div>

                {/* Mercredi */}
                <div className={styles.dayColumn}>
                  <div className={styles.dayHeader}>Mercredi</div>
                  <div className={styles.courseItem}>
                    <div className={styles.courseTime}>09:00 - 12:00</div>
                    <div className={styles.courseTitle}>
                      CM Bases de données
                    </div>
                    <div className={styles.courseLocation}>Amphi B</div>
                  </div>
                </div>

                {/* Jeudi */}
                <div className={styles.dayColumn}>
                  <div className={styles.dayHeader}>Jeudi</div>
                  <div className={styles.courseItem}>
                    <div className={styles.courseTime}>Toute la journée</div>
                    <div className={styles.courseTitle}>Congé pédagogique</div>
                  </div>
                </div>

                {/* Vendredi */}
                <div className={styles.dayColumn}>
                  <div className={styles.dayHeader}>Vendredi</div>
                  <div className={styles.courseItem}>
                    <div className={styles.courseTime}>08:00 - 10:00</div>
                    <div className={styles.courseTitle}>
                      TD Systèmes d'exploitation
                    </div>
                    <div className={styles.courseLocation}>Salle C103</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Groupes Assignés */}
          {activeTab === "groups" && (
            <div className={styles.fadeIn}>
              <h2>Mes Groupes d'Enseignement</h2>
              <div className={styles.groupsContainer}>
                {[
                  "Groupe A - TD",
                  "Groupe B - TP",
                  "Groupe C - Cours Magistral",
                ].map((group, index) => (
                  <div key={index} className={styles.groupCard}>
                    <h3>{group}</h3>
                    <div className={styles.groupMeta}>
                      <span>📚 Filière: Informatique</span>
                      <span>👥 25 étudiants</span>
                      <span>🏫 Salle: {index === 0 ? "B203" : "Labo 4"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Onglet Réservation de Salle */}
          {activeTab === "reservation" && (
            <div className={styles.fadeIn}>
              <h2>Formulaire de Réservation</h2>
              <form
                onSubmit={handleReservationSubmit}
                className={styles.reservationForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Date de réservation :</label>
                    <input
                      type="date"
                      value={reservationForm.date}
                      onChange={(e) =>
                        setReservationForm({
                          ...reservationForm,
                          date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Heure de début :</label>
                    <input
                      type="time"
                      value={reservationForm.time}
                      onChange={(e) =>
                        setReservationForm({
                          ...reservationForm,
                          time: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Durée de la séance :</label>
                    <select
                      value={reservationForm.duration}
                      onChange={(e) =>
                        setReservationForm({
                          ...reservationForm,
                          duration: e.target.value,
                        })
                      }>
                      {[1, 2, 3, 4].map((h) => (
                        <option key={h} value={h}>
                          {h} heure{h > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Type d'activité :</label>
                    <select>
                      <option>Cours Magistral</option>
                      <option>Travaux Dirigés</option>
                      <option>Travaux Pratiques</option>
                      <option>Réunion</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Soumettre la demande
                </button>
              </form>
            </div>
          )}

          {/* Onglet Demandes en Cours */}
          {activeTab === "requests" && (
            <div className={styles.fadeIn}>
              <h2>Mes Demandes de Réservation</h2>
              <div className={styles.requestsGrid}>
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className={`${styles.requestCard} ${
                      styles[request.status]
                    }`}>
                    <div className={styles.requestHeader}>
                      <span className={styles.requestDate}>
                        {new Date(request.date).toLocaleDateString("fr-FR")}
                      </span>
                      <span className={styles.requestTime}>
                        {request.time} - {request.duration}h
                      </span>
                    </div>
                    <div className={styles.requestStatus}>
                      Statut :{" "}
                      <span className={styles.statusBadge}>
                        {request.status}
                      </span>
                    </div>
                    {request.status === "pending" && (
                      <button
                        className={styles.cancelButton}
                        onClick={() =>
                          setRequests(
                            requests.filter((r) => r.id !== request.id)
                          )
                        }>
                        Annuler
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Onglet Profil */}
          {activeTab === "profile" && (
            <div className={styles.fadeIn}>
              <h2>Gestion du Profil</h2>
              <form
                onSubmit={handleProfileUpdate}
                className={styles.profileForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Nom complet :</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Adresse email :</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Spécialité :</label>
                    <input
                      type="text"
                      value={profileData.specialty}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          specialty: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Localisation du bureau :</label>
                    <input
                      type="text"
                      value={profileData.office}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          office: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.submitButton}>
                    Mettre à jour
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfessorDashboard;
