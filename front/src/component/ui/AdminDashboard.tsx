// AdminDashboard.tsx
import { useState, useEffect } from "react";
import styles from "../../styles/AdminDashboard.module.css";
import Sidebar from "./Sidebar";

type Tab = "dashboard" | "users" | "planning" | "settings";

type NotificationType = {
  id: number;
  message: string;
  type: "success" | "error";
};

const Notification = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className={styles.notificationClose}>
        ×
      </button>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [showPlanningModal, setShowPlanningModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [simulateSuccess, setSimulateSuccess] = useState(true);

  const [newPlanning, setNewPlanning] = useState({
    name: "",
    startDate: "",
    endDate: "",
    department: "",
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Étudiant",
    password: "",
  });

  const users = [
    { id: 1, name: "Dr. Dupont", role: "Professeur", email: "dupont@univ.fr" },
    {
      id: 2,
      name: "M. Martin",
      role: "Administrateur",
      email: "martin@univ.fr",
    },
    { id: 3, name: "Alice Durand", role: "Étudiant", email: "durand@univ.fr" },
  ];

  const plannings = [
    { id: 1, name: "Informatique S1", status: "Publié", date: "2024-03-01" },
    {
      id: 2,
      name: "Mathématiques S1",
      status: "En attente",
      date: "2024-03-05",
    },
  ];

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  };

  const handleCreatePlanning = () => {
    try {
      if (simulateSuccess) {
        addNotification("Planning créé avec succès !", "success");
      } else {
        throw new Error("Erreur lors de la création du planning");
      }
    } catch (error) {
      addNotification(error.message, "error");
    }
    setShowPlanningModal(false);
    setNewPlanning({ name: "", startDate: "", endDate: "", department: "" });
  };

  const handleCreateUser = () => {
    try {
      if (simulateSuccess) {
        addNotification("Utilisateur créé avec succès !", "success");
      } else {
        throw new Error("Erreur lors de la création de l'utilisateur");
      }
    } catch (error) {
      addNotification(error.message, "error");
    }
    setShowUserModal(false);
    setNewUser({ name: "", email: "", role: "Étudiant", password: "" });
  };

  const addNotification = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <>
      <Sidebar />

      <div className={styles.notificationsContainer}>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      <div className={styles.container}>
        <Modal
          isOpen={showPlanningModal}
          onClose={() => setShowPlanningModal(false)}>
          <h2>Créer un nouveau planning</h2>
          <div className={styles.modalForm}>
            <div className={styles.formGroup}>
              <label>Nom du planning</label>
              <input
                type="text"
                value={newPlanning.name}
                onChange={(e) =>
                  setNewPlanning({ ...newPlanning, name: e.target.value })
                }
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Date de début</label>
                <input
                  type="date"
                  value={newPlanning.startDate}
                  onChange={(e) =>
                    setNewPlanning({
                      ...newPlanning,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date de fin</label>
                <input
                  type="date"
                  value={newPlanning.endDate}
                  onChange={(e) =>
                    setNewPlanning({ ...newPlanning, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Filière concernée</label>
              <select
                value={newPlanning.department}
                onChange={(e) =>
                  setNewPlanning({ ...newPlanning, department: e.target.value })
                }>
                <option value="">Sélectionner une filière</option>
                <option>Informatique</option>
                <option>Mathématiques</option>
                <option>Physique</option>
              </select>
            </div>
            <div className={styles.simulationToggle}>
              <label>
                <input
                  type="checkbox"
                  checked={simulateSuccess}
                  onChange={(e) => setSimulateSuccess(e.target.checked)}
                />
                Simulation réussie
              </label>
            </div>
            <button
              onClick={handleCreatePlanning}
              className={styles.submitButton}>
              Créer le planning
            </button>
          </div>
        </Modal>

        <Modal isOpen={showUserModal} onClose={() => setShowUserModal(false)}>
          <h2>Ajouter un nouvel utilisateur</h2>
          <div className={styles.modalForm}>
            <div className={styles.formGroup}>
              <label>Nom complet</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Adresse email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Rôle</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }>
                  <option>Étudiant</option>
                  <option>Professeur</option>
                  <option>Administrateur</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Mot de passe</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={styles.simulationToggle}>
              <label>
                <input
                  type="checkbox"
                  checked={simulateSuccess}
                  onChange={(e) => setSimulateSuccess(e.target.checked)}
                />
                Simulation réussie
              </label>
            </div>
            <button onClick={handleCreateUser} className={styles.submitButton}>
              Créer l'utilisateur
            </button>
          </div>
        </Modal>

        <nav className={styles.navTabs}>
          {(["dashboard", "users", "planning", "settings"] as Tab[]).map(
            (tab) => (
              <button
                key={tab}
                className={`${styles.tabButton} ${
                  activeTab === tab ? styles.active : ""
                }`}
                onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </nav>

        <div className={styles.tabContent}>
          {activeTab === "dashboard" && (
            <div className={styles.fadeIn}>
              <h2>Vue d'ensemble du système</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <h3>Utilisateurs</h3>
                  <div className={styles.statValue}>1,234</div>
                  <div className={styles.statTrend}>↑ 12% ce mois</div>
                </div>
                <div className={styles.statCard}>
                  <h3>Plannings actifs</h3>
                  <div className={styles.statValue}>45</div>
                  <div className={styles.statTrend}>→ Stable</div>
                </div>
                <div className={styles.statCard}>
                  <h3>Réservations</h3>
                  <div className={styles.statValue}>289</div>
                  <div className={styles.statTrend}>↓ 5% cette semaine</div>
                </div>
              </div>
              <div className={styles.activitySection}>
                <h3>Activité récente</h3>
                <div className={styles.activityList}>
                  <div className={styles.activityItem}>
                    <div className={styles.activityTime}>10:30</div>
                    <div className={styles.activityText}>
                      Nouveau planning généré pour "Informatique S2"
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityTime}>09:15</div>
                    <div className={styles.activityText}>
                      M. Martin a modifié les droits d'accès
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className={styles.fadeIn}>
              <h2>Gestion des utilisateurs</h2>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className={styles.newUserButton}
                  onClick={() => setShowUserModal(true)}>
                  + Nouvel utilisateur
                </button>
              </div>
              <table className={styles.usersTable}>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Rôle</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>
                        <span className={styles.roleBadge}>{user.role}</span>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <button className={styles.tableButton}>Éditer</button>
                        <button className={styles.tableButtonDanger}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "planning" && (
            <div className={styles.fadeIn}>
              <h2>Gestion des plannings</h2>
              <div className={styles.planningActions}>
                <button
                  className={styles.generateButton}
                  onClick={() => setShowPlanningModal(true)}>
                  Générer nouveau planning
                </button>
                <select className={styles.filterSelect}>
                  <option>Tous les plannings</option>
                  <option>Validés</option>
                  <option>En attente</option>
                </select>
              </div>
              <div className={styles.planningsGrid}>
                {plannings.map((plan) => (
                  <div key={plan.id} className={styles.planningCard}>
                    <h3>{plan.name}</h3>
                    <div className={styles.planMeta}>
                      <span>Statut : {plan.status}</span>
                      <span>Date : {plan.date}</span>
                    </div>
                    <div className={styles.planActions}>
                      <button className={styles.actionButton}>Publier</button>
                      <button className={styles.actionButton}>Modifier</button>
                      <button className={styles.actionButtonDanger}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className={styles.fadeIn}>
              <h2>Paramètres du système</h2>
              <div className={styles.settingsForm}>
                <div className={styles.formGroup}>
                  <label>Périodes académiques</label>
                  <input type="text" placeholder="Ex: Semestre 1 - 2024/2025" />
                </div>
                <div className={styles.formGroup}>
                  <label>API Intégrations</label>
                  <select>
                    <option>Désactivé</option>
                    <option>Moodle</option>
                    <option>Microsoft 365</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Notifications automatiques</label>
                  <div className={styles.switchContainer}>
                    <label className={styles.switch}>
                      <input type="checkbox" />
                      <span className={styles.slider}></span>
                    </label>
                    <span>Activé</span>
                  </div>
                </div>
                <button className={styles.saveButton}>
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
