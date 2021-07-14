import { IMake } from './IMake';

export interface IEngine {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IModCats {
  name: string;
  slug: string;
  count: number;
}

export interface ICar {
  id: number;
  year?: number[];
  make: IMake;
  model: string;
  weight: number;
  name?: string;
  runsname?: string;
  engine?: IEngine[];
  slug: string;
  count?: string;
  priority: string;
  image: string;
  categories?: IModCats[];
  history: String | null;
  liquids: String | null;
  to: String | null;
}

export interface IVehicle extends ICar {}
