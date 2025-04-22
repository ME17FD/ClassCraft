import { useMemo, useRef } from "react";
import Room from "./Room";
import Amphitheater from "./Amphitheater";
import { getFloorData } from "../../utils/floorPlans";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import {
  FloorLevel,
  RoomDetails,
  AmphitheaterDetails,
} from "../../types/BuildingTypes";

interface FloorProps {
  floorLevel: FloorLevel;
  onRoomSelect: (room: RoomDetails | AmphitheaterDetails) => void;
}

const FLOOR_HEIGHT = 0.2;
const WALL_THICKNESS = 0.2;
const MARGIN = 2;
const RADIUS = 0.1; // Rayon des coins arrondis

export default function Floor({ floorLevel, onRoomSelect }: FloorProps) {
  const floorData = useMemo(() => getFloorData(floorLevel), [floorLevel]);
  const yPosition = getFloorYPosition(floorLevel);
  const groupRef = useRef<THREE.Group>(null);

  const { buildingWidth, buildingDepth, minX, minZ } = useMemo(() => {
    let minX = Infinity,
      maxX = -Infinity;
    let minZ = Infinity,
      maxZ = -Infinity;

    [...floorData.rooms, ...floorData.amphitheaters].forEach((room) => {
      const halfWidth = room.dimensions[0] / 2;
      const halfDepth = room.dimensions[2] / 2;

      minX = Math.min(minX, room.position[0] - halfWidth);
      maxX = Math.max(maxX, room.position[0] + halfWidth);
      minZ = Math.min(minZ, room.position[2] - halfDepth);
      maxZ = Math.max(maxZ, room.position[2] + halfDepth);
    });

    return {
      buildingWidth: maxX - minX + MARGIN * 2,
      buildingDepth: maxZ - minZ + MARGIN * 2,
      minX,
      minZ,
    };
  }, [floorData]);

  const centerX = minX + buildingWidth / 2 - MARGIN;
  const centerZ = minZ + buildingDepth / 2 - MARGIN;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const elapsedTime = clock.getElapsedTime();
      if (elapsedTime < 1) {
        groupRef.current.position.y = Math.sin(elapsedTime * Math.PI) * 2;
        groupRef.current.scale.setScalar(Math.min(1, elapsedTime * 1.5));
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, yPosition, 0]}>
      {/* Sol avec bords arrondis */}
      <RoundedBox
        position={[centerX, -FLOOR_HEIGHT - 1.4, centerZ]}
        args={[buildingWidth - MARGIN, FLOOR_HEIGHT, buildingDepth - MARGIN]}
        radius={RADIUS}
        receiveShadow>
        <meshStandardMaterial color="#555555" side={THREE.DoubleSide} />
      </RoundedBox>

      {/* Murs avec bords arrondis */}
      <RoundedWall
        position={[centerX, 1.4, minZ]}
        dimensions={[buildingWidth - 2 * MARGIN, 6, WALL_THICKNESS]}
      />
      <RoundedWall
        position={[minX, 1.4, centerZ]}
        dimensions={[buildingDepth - 2 * MARGIN, 6, WALL_THICKNESS]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <RoundedWall
        position={[minX + buildingWidth - 2 * MARGIN, 1.4, centerZ]}
        dimensions={[buildingDepth - 2 * MARGIN, 6, WALL_THICKNESS]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {floorData.rooms.map((room) => (
        <Room key={room.id} {...room} onClick={() => onRoomSelect(room)} />
      ))}

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

// Composant Wall avec bords arrondis
function RoundedWall({
  position,
  dimensions,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  dimensions: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <RoundedBox
      position={position}
      args={dimensions}
      radius={0.1}
      rotation={rotation}
      castShadow
      receiveShadow>
      <meshStandardMaterial color="#aaaaaa" side={THREE.DoubleSide} />
    </RoundedBox>
  );
}

function getFloorYPosition(floorLevel: FloorLevel): number {
  const floorHeights = {
    ground: 0,
    floor1: 4,
    floor2: 8,
    floor3: 12,
  };
  return floorHeights[floorLevel];
}
