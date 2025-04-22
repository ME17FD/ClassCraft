import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import hoveravatar from "../../assets/pics/image.png";
import styles from "../../styles/Sidebar.module.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={toggleSidebar} // Ferme la sidebar si on clique sur l'overlay
        />
      )}
      {/* Bouton de toggle (en haut à gauche) */}
      <button
        className={`${styles.toggleButton} ${isOpen ? styles.hidden : ""}`}
        onClick={toggleSidebar}>
        <img
          src={hoveravatar}
          alt="Toggle menu"
          className={styles.toggleImage}
        />
      </button>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {/* Bouton de fermeture (en haut à droite de la sidebar) */}
        <button className={styles.closeButton} onClick={toggleSidebar}>
          ×
        </button>

        {/* Photo + Nom */}
        <div className={styles.profileSection}>
          <div className={styles.profileCircle}>
            <img
              src={hoveravatar} // Remplacez par votre image
              alt="Profil"
              className={styles.profileImage}
            />
          </div>
          <h3 className={styles.profileName}>John Doe</h3>
        </div>

        {/* Boutons de navigation */}
        <div className={styles.navButtons}>
          <button className={styles.navButton}>Map</button>
          <button className={styles.navButton}>Emplois</button>
          <button className={styles.navButton}>Profile</button>
        </div>

        {/* Bouton de déconnexion (en bas) */}
        <button className={styles.logoutButton}>
          <FiLogOut className={styles.logoutIcon} />
        </button>
      </div>
    </>
  );
}
