import React from 'react';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

import PageHeader from '~/components/product/PageHeader';
import LeftSideBar from '~/components/product/LeftSideBar';
import FilterWidget from '~/components/product/FilterWidget';
import ShopGrid from '~/components/product/ShopGrid';
import { IFilter, IProductElasticHitsFirst } from '~/interfaces';

interface IProps {
  products: IProductElasticHitsFirst;
  header: any;
  breads: any;
  count: number;
  sortedFilters?: IFilter[];
  handleFilterChange(
    e: React.ChangeEvent<HTMLElement>,
    filterName: string,
    itemName: string
  ): void;
  handleDeleteFilter?(filter: string, value: string): void;
  handleDeleteFilters?(): void;
  totalPages?: number;
}
export default function ModelShopList(props: IProps) {
  const {
    header,
    breads,
    count,
    totalPages,
    sortedFilters,
    products,
    handleFilterChange,
  } = props;
  const handleDeleteFilter = props.handleDeleteFilter!;
  const handleDeleteFilters = props.handleDeleteFilters!;
  return (
    <React.Fragment>
      <PageHeader header={header} breads={breads} count={count} />
      <Hidden smDown>
        <Grid item xs={3}>
          <LeftSideBar>
            <FilterWidget
              filters={sortedFilters}
              handleChange={handleFilterChange}
            />
          </LeftSideBar>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9}>
        <Grid item xs={12}>
          <ShopGrid
            products={products.hits}
            totalPages={totalPages}
            filtersResetHandlers={{
              handleDeleteFilter,
              handleDeleteFilters,
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
