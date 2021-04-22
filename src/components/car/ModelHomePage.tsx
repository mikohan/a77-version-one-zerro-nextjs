import {
  IFilter,
  IProductElasticHitsFirst,
  IProduct,
  ICategory,
} from '~/interfaces';
import React from 'react';
import { Hidden, Grid } from '@material-ui/core';
import PageHeader from '~/components/product/PageHeader';
import LeftSideBar from '~/components/product/LeftSideBar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FilterWidget from '~/components/product/FilterWidget';
import { Box, Paper, Typography } from '@material-ui/core';
import LeftSidePopularWidget from '~/components/product/LeftSidePopularWidet';
import CategoryBlock from '~/components/car/CategoryBlock';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      display: 'grid',
      [theme.breakpoints.down('xxl')]: {
        gridTemplateColumns: `repeat(auto-fill, minmax(90%, 1fr))`,
      },

      /* [theme.breakpoints.up('lg')]: { */
      /*   gridTemplateColumns: `repeat(auto-fill, minmax(40%, 1fr))`, */
      /*   gridGap: theme.spacing(3), */
      /* }, */
      '&> div': {
        minHeight: '20rem',
        padding: theme.spacing(3),
        background: theme.palette.background.paper,
        marginBottom: theme.spacing(3),
      },
    },
    blockTitle: {
      marginBottom: '2rem',
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
  popularProducts: IProduct[];
  categories: ICategory[];
}
export default function ModelShopList(props: IProps) {
  const {
    header,
    breads,
    count,
    sortedFilters,
    popularProducts,
    categories,
  } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <PageHeader header={header} breads={breads} count={count} />
      <Hidden smDown>
        <Grid item xs={3}>
          <LeftSideBar>
            <FilterWidget filters={sortedFilters} />
            <LeftSidePopularWidget popularProducts={popularProducts} />
          </LeftSideBar>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9}>
        <Grid item xs={12}>
          <div className={classes.contentContainer}>
            <div>
              <Typography variant="h6" className={classes.blockTitle}>
                Some stuff
              </Typography>
              <CategoryBlock categories={categories} />
            </div>
            <div>
              <Typography variant="h6" className={classes.blockTitle}>
                Categories
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                non odio reprehenderit illo facilis doloremque odit esse est
                nemo alias assumenda eaque deserunt inventore quas hic sunt quae
                nam, mollitia, dolorum, quia maiores eveniet? Unde enim laborum
                veritatis possimus, odit vel maxime commodi, architecto
                recusandae inventore ipsam, saepe sit provident reiciendis
                accusamus rerum molestias voluptatem at dolor atque iure.
                Voluptas?
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.blockTitle}>
                Популярные товары
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                non odio reprehenderit illo facilis doloremque odit esse est
                nemo alias assumenda eaque deserunt inventore quas hic sunt quae
                nam, mollitia, dolorum, quia maiores eveniet? Unde enim laborum
                veritatis possimus, odit vel maxime commodi, architecto
                recusandae inventore ipsam, saepe sit provident reiciendis
                accusamus rerum molestias voluptatem at dolor atque iure.
                Voluptas?
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.blockTitle}>
                Блог
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                non odio reprehenderit illo facilis doloremque odit esse est
                nemo alias assumenda eaque deserunt inventore quas hic sunt quae
                nam, mollitia, dolorum, quia maiores eveniet? Unde enim laborum
                veritatis possimus, odit vel maxime commodi, architecto
                recusandae inventore ipsam, saepe sit provident reiciendis
                accusamus rerum molestias voluptatem at dolor atque iure.
                Voluptas?
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.blockTitle}>
                Videos
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                non odio reprehenderit illo facilis doloremque odit esse est
                nemo alias assumenda eaque deserunt inventore quas hic sunt quae
                nam, mollitia, dolorum, quia maiores eveniet? Unde enim laborum
                veritatis possimus, odit vel maxime commodi, architecto
                recusandae inventore ipsam, saepe sit provident reiciendis
                accusamus rerum molestias voluptatem at dolor atque iure.
                Voluptas?
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
