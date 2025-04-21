import { Box, Text } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
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

  return (
    <group position={position} onClick={onClick} name={name}>
      {/* La boîte */}
      <mesh>
        <Box args={dimensions}>
          <meshStandardMaterial color={color} />
        </Box>
      </mesh>

      {/* Le texte au-dessus de la boîte */}
      <Text
        position={[0, dimensions[1] + 0.2, 0]} // Position Y = demi-hauteur de la boîte + un petit offset
        fontSize={1.2}
        color="black"
        anchorX="center"
        anchorY="middle">
        {name}
      </Text>
    </group>
  );
}
