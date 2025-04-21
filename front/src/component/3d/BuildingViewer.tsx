import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Floor from "./Floor";
import {
  FloorLevel,
  RoomDetails,
  AmphitheaterDetails,
} from "../../types/BuildingTypes";
import "../../styles/BuildingViewer.css";

interface BuildingViewerProps {
  floorLevel: FloorLevel;
  onRoomSelect: (room: RoomDetails | AmphitheaterDetails) => void;
}

export default function BuildingViewer({
  floorLevel,
  onRoomSelect,
}: BuildingViewerProps) {
  return (
    <Canvas camera={{ position: [0, 15, 35], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Suspense fallback={null}>
        <Floor floorLevel={floorLevel} onRoomSelect={onRoomSelect} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={false}
        minDistance={5}
        maxDistance={50}
      />
    </Canvas>
  );
}
