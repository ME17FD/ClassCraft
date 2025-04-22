import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import styles from "../../styles/Sidebar.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={toggleSidebar}
        />
      )}
      <button
        className={`${styles.toggleButton} ${isOpen ? styles.hidden : ""}`}
        onClick={toggleSidebar}>
        <img src="" alt="Toggle menu" className={styles.toggleImage} />
      </button>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button className={styles.closeButton} onClick={toggleSidebar}>
          ×
        </button>

        <div className={styles.profileSection}>
          <div className={styles.profileCircle}>
            <img src="" alt="Profil" className={styles.profileImage} />
          </div>
          <h3 className={styles.profileName}>
            {user?.firstName ?? 'Utilisateur'} {user?.lastName ?? ''}
          </h3>
        </div>

        <div className={styles.navButtons}>
          <button className={styles.navButton}>Map</button>
          <button className={styles.navButton}>Emplois</button>
          <button className={styles.navButton}>Profile</button>
        </div>

        <button className={styles.logoutButton} onClick={handleLogout}>
          <FiLogOut className={styles.logoutIcon} />
        </button>
      </div>
    </>
  );
}
