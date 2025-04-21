type ReservationStatus = 'reserved' | 'available';

export interface RoomDetails {
  id: string;
  name: string;
  status: ReservationStatus;
  capacity: number;
  hasProjector: boolean;
  issues: string[];
  position: [number, number, number];
  dimensions: [number, number, number];
}

export interface AmphitheaterDetails extends RoomDetails {
  alt: string;
}

export interface FloorData {
  rooms: RoomDetails[];
  amphitheaters: AmphitheaterDetails[];
  level: number;
}



export type FloorLevel = 'ground' | 'floor1' | 'floor2' | 'floor3';