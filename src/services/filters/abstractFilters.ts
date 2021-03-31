import { IFilter } from '~/interfaces/filters';

export abstract class AbstractFilterBuilder {
  constructor(public slug: string, public name: string) {}

  abstract makeItems(someData: any): void;
  abstract buildFilter(): IFilter;
}
