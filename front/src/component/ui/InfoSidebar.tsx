import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { RoomDetails, AmphitheaterDetails } from "../../types/BuildingTypes";
import styles from "../../styles/InfoSidebar.module.css";

interface InfoSidebarProps {
  room: RoomDetails | AmphitheaterDetails | null;
  onClose: () => void;
}

export default function InfoSidebar({ room, onClose }: InfoSidebarProps) {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [moduleName, setModuleName] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleReservationClick = () => {
    if (room?.status === "available") {
      setShowReservationModal(true);
    } else {
      // Logique pour annuler la réservation
      onClose();
    }
  };

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour enregistrer la réservation
    console.log("Réservation créée:", { startTime, endTime, moduleName });
    setShowReservationModal(false);
    onClose();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowReservationModal(false);
    }
  };

  useEffect(() => {
    if (showReservationModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showReservationModal]);

  return (
    <>
      <AnimatePresence>
        {room && (
          <motion.div
            className={styles.sidebar}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              {room.name}
            </motion.h2>

            <motion.div
              className={`${styles.statusBadge} ${room.status}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}>
              {room.status === "reserved" ? "Réservé" : "Disponible"}
            </motion.div>

            <motion.div
              className={styles.detailsSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}>
              <p>
                <strong>Capacité:</strong> {room.capacity} personnes
              </p>
              <p>
                <strong>Projecteur:</strong> {room.hasProjector ? "Oui" : "Non"}
              </p>
            </motion.div>

            {room.issues.length > 0 && (
              <motion.div
                className={styles.issuesSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}>
                <h3>Problèmes signalés:</h3>
                <ul>
                  {room.issues.map((issue, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}>
                      {issue}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            <motion.button
              className={styles.reservationButton}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleReservationClick}>
              {room.status === "reserved" ? "Annuler réservation" : "Réserver"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de réservation */}
      <AnimatePresence>
        {showReservationModal && (
          <div className={styles.modalOverlay}>
            <motion.div
              className={styles.reservationModal}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              ref={modalRef}>
              <h2>Réserver {room?.name}</h2>
              <form onSubmit={handleSubmitReservation}>
                <div className={styles.formGroup}>
                  <label>Module/Cours:</label>
                  <input
                    type="text"
                    value={moduleName}
                    onChange={(e) => setModuleName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Heure de début:</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Heure de fin:</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.modalButtons}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => setShowReservationModal(false)}>
                    Annuler
                  </button>
                  <button type="submit" className={styles.confirmButton}>
                    Confirmer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
