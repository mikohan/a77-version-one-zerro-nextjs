import { ICar } from '~/interfaces/ICar';
import { IMake } from '~/interfaces/IState';

export interface IState {
  cars: {
    cars: ICar[];
    currentCar: ICar;
    makes: IMake[];
  };
  currentCar: ICar;
}
