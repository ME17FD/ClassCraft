import { motion, AnimatePresence } from "framer-motion";
import { RoomDetails, AmphitheaterDetails } from "../../types/BuildingTypes";
import styles from "../../styles/InfoSidebar.module.css";

interface InfoSidebarProps {
  room: RoomDetails | AmphitheaterDetails | null;
  onClose: () => void;
}

export default function InfoSidebar({ room, onClose }: InfoSidebarProps) {
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
              <p>
                <strong>Statut : </strong>
                {room.status}
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
              transition={{ delay: 0.8 }}>
              {room.status === "reserved" ? "Annuler réservation" : "Réserver"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
