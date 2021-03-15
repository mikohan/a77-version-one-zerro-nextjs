import { IMake } from './IMake';

export interface IEngine {
  id: string;
  name: string;
  slug: string;
}

export interface ICar {
  id: number;
  year?: number[];
  make: IMake;
  model: string;
  runsname?: string;
  engine?: IEngine[];
  slug: string;
}

export interface IVehicle extends ICar {}
