import { Box, Text, Line } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { RoomDetails } from "../../types/BuildingTypes";

interface RoomProps extends RoomDetails {
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}

export default function Amphitheater({
  position,
  dimensions,
  status,
  onClick,
  name,
}: RoomProps) {
  const color = status === "reserved" ? "#ff4444" : "#44ff44";
  const borderColor = "#000000";
  const borderWidth = 0.02;

  // Calcul des positions des arêtes
  const edges = useMemo(() => {
    const [w, h, d] = dimensions.map((v) => v / 2); // Demi-dimensions
    return [
      // Arêtes verticales
      { start: [w, h, d], end: [w, -h, d] },
      { start: [-w, h, d], end: [-w, -h, d] },
      { start: [w, h, -d], end: [w, -h, -d] },
      { start: [-w, h, -d], end: [-w, -h, -d] },

      // Arêtes horizontales (haut)
      { start: [w, h, d], end: [-w, h, d] },
      { start: [w, h, -d], end: [-w, h, -d] },
      { start: [w, h, d], end: [w, h, -d] },
      { start: [-w, h, d], end: [-w, h, -d] },

      // Arêtes horizontales (bas)
      { start: [w, -h, d], end: [-w, -h, d] },
      { start: [w, -h, -d], end: [-w, -h, -d] },
      { start: [w, -h, d], end: [w, -h, -d] },
      { start: [-w, -h, d], end: [-w, -h, -d] },
    ];
  }, [dimensions]);

  return (
    <group position={position} onClick={onClick} name={name}>
      {/* Boîte principale */}
      <mesh>
        <Box args={dimensions}>
          <meshStandardMaterial color={color} />
        </Box>
      </mesh>

      {/* Bordures sur les arêtes seulement */}
      <group>
        {edges.map((edge, index) => (
          <Line
            key={index}
            points={[edge.start, edge.end]}
            color={borderColor}
            lineWidth={borderWidth * 100} // Conversion pour Line
          />
        ))}
      </group>

      {/* Texte au-dessus de la boîte */}
      <Text
        position={[0, dimensions[1] + 0.2, 0]}
        fontSize={1}
        color="black"
        anchorX="center"
        anchorY="middle">
        {name}
      </Text>
    </group>
  );
}
