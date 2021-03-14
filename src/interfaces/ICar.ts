export interface ICar {
  id: number;
  year?: number[];
  make: string;
  model: string;
  engine?: string[];
  slug: string;
}

export interface IVehicle extends ICar {}
