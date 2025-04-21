import { FloorLevel } from "../../types/BuildingTypes";
import "../styles/FloorSelector.css";

interface FloorSelectorProps {
  currentFloor: FloorLevel;
  onChangeFloor: (floor: FloorLevel) => void;
}

export default function FloorSelector({
  currentFloor,
  onChangeFloor,
}: FloorSelectorProps) {
  const floors: { level: FloorLevel; label: string }[] = [
    { level: "ground", label: "RDC" },
    { level: "floor1", label: "Étage 1" },
    { level: "floor2", label: "Étage 2" },
    { level: "floor3", label: "Étage 3" },
  ];

  return (
    <div className="floor-selector">
      {floors.map((floor) => (
        <button
          key={floor.level}
          className={`floor-button ${
            currentFloor === floor.level ? "active" : ""
          }`}
          onClick={() => onChangeFloor(floor.level)}>
          {floor.label}
        </button>
      ))}
    </div>
  );
}
