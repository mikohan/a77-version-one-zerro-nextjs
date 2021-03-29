import { IActiveFilter } from '~/interfaces/filters';
import { IFilterValues } from '~/interfaces/list';

export const SHOP_NAMESPACE = 'shop';

export interface IShopState {
  init: boolean;
  filters: IFilterValues;

  /**
   * All active filters.
   */
  activeFilters: IActiveFilter[];
  /**
   * Removed active filters.
   */
  removedFilters: IActiveFilter[];
  /**
   * Active filters except removed ones.
   */

  currentFilters: IActiveFilter[];
}
