import { FloorLevel, FloorData } from '../types/BuildingTypes';

export function getFloorData(floorLevel: FloorLevel): FloorData {
  // This would contain the precise positioning data from the plans
  switch (floorLevel) {
    case 'ground':
      return {
        level: 0,
        rooms: [
          // Ground floor rooms with precise positions
          {
            id: 'room-g-1',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-7, 0, 12],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-2',
            name: 'G-102',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-7, 0, 6],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-3',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [9, 0, 12],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-4',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [9, 0, 6],
            dimensions: [4, 3, 6]
          },
          // ... 3 more rooms
        ],
        amphitheaters: [
          {
            id: 'amphi-g-1',
            name: 'Amphi A',
            status: 'reserved',
            capacity: 120,
            hasProjector: true,
            issues: [],
            position: [-2, 0.5, 0],
            dimensions: [6, 4, 6], // height only
          },
          {
            id: 'amphi-g-1',
            name: 'Amphi A',
            status: 'reserved',
            capacity: 120,
            hasProjector: true,
            issues: [],
            position: [4, 0.5, 0],
            dimensions: [6, 4, 6], // height only
          },
          // ... 1 more amphitheater
        ]
      };
    case 'floor1':
      return {
        level: 1,
        rooms: [
          // Ground floor rooms with precise positions
          {
            id: 'room-g-1',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-13, 0, 11],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-2',
            name: 'G-102',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-13, 0, 5],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-3',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [15, 0, 11],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-4',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [15, 0, 5],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-4',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [4, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-5',
            name: 'G-102',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-2, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-6',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-8, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-7',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [10, 0, 0],
            dimensions: [6, 3, 4]
          },
          // ... 3 more rooms
        ],
        amphitheaters: []
      };

      case 'floor2':
      return {
        level: 3,
        rooms: [
          // Ground floor rooms with precise positions
          {
            id: 'room-g-1',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-13, 0, 11],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-2',
            name: 'G-102',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-13, 0, 5],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-3',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [15, 0, 11],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-4',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [15, 0, 5],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-4',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [4, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-5',
            name: 'G-102',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-2, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-6',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-8, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-7',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [10, 0, 0],
            dimensions: [6, 3, 4]
          },
          // ... 3 more rooms
        ],
        amphitheaters: []
      };
      case 'floor3':
      return {
        level: 4,
        rooms: [
          // Ground floor rooms with precise positions
          {
            id: 'room-g-1',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-13, 0, 11],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-2',
            name: 'G-102',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-13, 0, 5],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-3',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [15, 0, 11],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-4',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [15, 0, 5],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-4',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [4, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-5',
            name: 'G-102',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-2, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-6',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-8, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-7',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [10, 0, 0],
            dimensions: [6, 3, 4]
          },
          // ... 3 more rooms
        ],
        amphitheaters: []
      };
      
      return {
        level: 4,
        rooms: [
          // Ground floor rooms with precise positions
          {
            id: 'room-g-1',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-18, 0, 15],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-2',
            name: 'G-102',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-18, 0, 6],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-3',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [18, 0, 15],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-4',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [18, 0, 6],
            dimensions: [4, 3, 6]
          },
          {
            id: 'room-g-4',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [4, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-5',
            name: 'G-102',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-4, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-6',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [-12, 0, 0],
            dimensions: [6, 3, 4]
          },
          {
            id: 'room-g-7',
            name: 'G-101',
            status: 'available',
            capacity: 30,
            hasProjector: true,
            issues: [],
            position: [12, 0, 0],
            dimensions: [6, 3, 4]
          },
          // ... 3 more rooms
        ],
        amphitheaters: []
      };
    // ... other floors
    default:
      return { level: 0, rooms: [], amphitheaters: [] };
  }
}