import { Box } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { AmphitheaterDetails } from "../../types/BuildingTypes";

interface AmphitheaterProps extends AmphitheaterDetails {
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}

export default function Amphitheater({
  position,
  dimensions,
  status,
  onClick,
  name,
}: AmphitheaterProps) {
  const color = status === "reserved" ? "#ff4444" : "#44ff44";

  return (
    <mesh position={position} onClick={onClick} name={name}>
      <Box args={dimensions}>
        <meshStandardMaterial color={color} />
      </Box>
    </mesh>
  );
}
