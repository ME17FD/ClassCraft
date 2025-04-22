import { Text, RoundedBox } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { RoomDetails } from "../../types/BuildingTypes";

interface RoomProps extends RoomDetails {
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}

export default function Room({
  position,
  dimensions,
  status,
  onClick,
  name,
}: RoomProps) {
  const color = status === "reserved" ? "#ff4444" : "#44ff44";
  const radius = 0.1; // Rayon des coins arrondis

  return (
    <group position={position} onClick={onClick} name={name}>
      {/* Boîte principale avec bords arrondis */}
      <RoundedBox args={dimensions} radius={radius} smoothness={4}>
        <meshStandardMaterial color={color} />
      </RoundedBox>

      {/* Texte au-dessus de la boîte */}
      <Text
        position={[0, dimensions[1] / 2 + 0.5, 0]}
        fontSize={1}
        color="black"
        anchorX="center"
        anchorY="middle">
        {name}
      </Text>
    </group>
  );
}
