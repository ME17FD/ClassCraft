import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import BuildingViewer from "../3d/BuildingViewer";
import InfoSidebar from "./InfoSidebar";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/SchemaViewer.module.css";
import {
  RoomDetails,
  AmphitheaterDetails,
  FloorLevel,
} from "../../types/BuildingTypes";

const floorLevels: FloorLevel[] = ["ground", "floor1", "floor2", "floor3"];
const floorLabels = {
  ground: "RDC",
  floor1: "Étage 1",
  floor2: "Étage 2",
  floor3: "Étage 3",
};

export default function SchemaViewer() {
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<
    RoomDetails | AmphitheaterDetails | null
  >(null);

  const currentFloor = floorLevels[currentFloorIndex];
  const currentFloorLabel = floorLabels[currentFloor];

  const nextFloor = () => {
    setCurrentFloorIndex((prev) => (prev + 1) % floorLevels.length);
  };

  const prevFloor = () => {
    setCurrentFloorIndex(
      (prev) => (prev - 1 + floorLevels.length) % floorLevels.length
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.schemaHeader}>
        <motion.h2
          className={styles.schemaTitle}
          key={`title-${currentFloor}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          Visualisation du Bâtiment
        </motion.h2>
        <motion.div
          className={styles.floorIndicator}
          key={`floor-${currentFloor}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}>
          {currentFloorLabel}
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFloor}
          className={styles.schemaContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}>
          <BuildingViewer
            floorLevel={currentFloor}
            onRoomSelect={setSelectedRoom}
          />
          {selectedRoom && (
            <InfoSidebar
              room={selectedRoom}
              onClose={() => setSelectedRoom(null)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className={styles.verticalNav}>
        <button className={styles.navButton} onClick={nextFloor}>
          <FiChevronUp size={24} />
        </button>
        <button className={styles.navButton} onClick={prevFloor}>
          <FiChevronDown size={24} />
        </button>
      </div>
    </div>
  );
}
