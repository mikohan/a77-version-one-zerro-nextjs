import { IMake } from './IMake';

export interface IEngine {
  id: string;
  name: string;
  slug: string;
  image: string;
}

interface IModCats {
  name: string;
  slug: string;
}

export interface ICar {
  id: number;
  year?: number[];
  make: IMake;
  model: string;
  name?: string;
  runsname?: string;
  engine?: IEngine[];
  slug: string;
  count?: string;
  priority: string;
  image: string;
  categories?: IModCats[];
}

export interface IVehicle extends ICar {}
