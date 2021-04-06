import { IFilter, IProductElasticHitsFirst } from '~/interfaces';
import React from 'react';
import { Hidden, Grid } from '@material-ui/core';
import PageHeader from '~/components/product/PageHeader';
import LeftSideBar from '~/components/product/LeftSideBar';
import FilterWidget from '~/components/product/FilterWidget';
import ShopGrid from '~/components/product/ShopGrid';

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
  const { header, breads, count } = props;
  return (
    <React.Fragment>
      <PageHeader header={header} breads={breads} count={count} />
      <Hidden smDown>
        <Grid item xs={3}>
          <LeftSideBar>HERE GOES LEFT STUFF</LeftSideBar>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9}>
        <Grid item xs={12}>
          HERE GOES MAIN CONTENT
        </Grid>
      </Grid>
    </React.Fragment>
  );
}