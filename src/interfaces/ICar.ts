import { IMake } from './IMake';
export interface ICar {
  id: number;
  year?: number[];
  make: IMake;
  model: string;
  engine?: string[];
  slug: string;
}

export interface IVehicle extends ICar {}
