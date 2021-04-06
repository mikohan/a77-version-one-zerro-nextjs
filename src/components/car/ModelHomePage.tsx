import { IFilter, IProductElasticHitsFirst } from '~/interfaces';
import React from 'react';
import { Hidden, Grid } from '@material-ui/core';
import PageHeader from '~/components/product/PageHeader';
import LeftSideBar from '~/components/product/LeftSideBar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FilterWidget from '~/components/product/FilterWidget';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      display: 'grid',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: `repeat(auto-fill, minmax(100%, 1fr))`,
        gridGap: theme.spacing(1),
      },

      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: `repeat(auto-fill, minmax(40%, 1fr))`,
        gridGap: theme.spacing(1),
      },
      '&> div': {
        border: '1px solid blue',
        padding: theme.spacing(1),
        background: theme.palette.background.paper,
      },
    },
  })
);

interface IProps {
  products: IProductElasticHitsFirst;
  header: any;
  breads: any;
  count: number;
  sortedFilters?: IFilter[];
  handleFilterChange?(
    e: React.ChangeEvent<HTMLElement>,
    filterName: string,
    itemName: string
  ): void;
  handleDeleteFilter?(filter: string, value: string): void;
  handleDeleteFilters?(): void;
  totalPages?: number;
}
export default function ModelShopList(props: IProps) {
  const { header, breads, count, sortedFilters } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <PageHeader header={header} breads={breads} count={count} />
      <Hidden smDown>
        <Grid item xs={3}>
          <LeftSideBar>
            <FilterWidget filters={sortedFilters} />
          </LeftSideBar>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9}>
        <Grid item xs={12}>
          <div className={classes.contentContainer}>
            <div>Inside stuff</div>
            <div>Inside stuff</div>
            <div>Inside stuff</div>
            <div>Inside stuff</div>
            <div>Inside stuff</div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
