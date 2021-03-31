import { AbstractFilterBuilder } from '~/services/filters/abstractFilters'
import { IBaseFilterItem, ICheckFilter } from '~/interfaces/filters';

import {IProductElasticHitsSecond} from '~/interfaces/product'



exprot class CheckFilterBulder extends AbstractFilterBuilder {
  private items: IBaseFilterItem[] = [];
  private value: string[] = []

  makeItems()
}

