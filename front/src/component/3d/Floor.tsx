import { useMemo } from "react";
import Room from "./Room";
import Amphitheater from "./Amphitheater";
import { getFloorData } from "../../utils/floorPlans";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import {
  FloorLevel,
  RoomDetails,
  AmphitheaterDetails,
} from "../../types/BuildingTypes";

interface FloorProps {
  floorLevel: FloorLevel;
  onRoomSelect: (room: RoomDetails | AmphitheaterDetails) => void;
}

export default function Floor({ floorLevel, onRoomSelect }: FloorProps) {
  const floorData = useMemo(() => getFloorData(floorLevel), [floorLevel]);
  const yPosition = getFloorYPosition(floorLevel);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const elapsedTime = clock.getElapsedTime();
      if (elapsedTime < 1) {
        // Animation pendant 1 seconde
        groupRef.current.position.y = Math.sin(elapsedTime * Math.PI) * 2;
        groupRef.current.scale.setScalar(Math.min(1, elapsedTime * 1.5));
      }
    }
  });

  return (
    <group position={[0, yPosition, 0]}>
      {/* Rooms */}
      {floorData.rooms.map((room) => (
        <Room key={room.id} {...room} onClick={() => onRoomSelect(room)} />
      ))}

      {/* Amphitheaters */}
      {floorData.amphitheaters.map((amphi) => (
        <Amphitheater
          key={amphi.id}
          {...amphi}
          onClick={() => onRoomSelect(amphi)}
        />
      ))}
    </group>
  );
}

function getFloorYPosition(floorLevel: FloorLevel): number {
  const floorHeights = {
    ground: 0,
    floor1: 0,
    floor2: 0,
    floor3: 0,
  };
  return floorHeights[floorLevel];
}
