import type { Vehicle } from "@/types";

const demoVehicle: Omit<Vehicle, "plate"> = {
  make: "SEAT",
  model: "León",
  engine: "1.5 TSI 130cv",
  year: 2019,
};

export function identifyVehicle(plate: string): Vehicle {
  return { plate, ...demoVehicle };
}

export function vehicleLabel(vehicle: Vehicle): string {
  return `${vehicle.make} ${vehicle.model} ${vehicle.engine} ${vehicle.year}`;
}
