import {
  IFilter,
  IProductElasticHitsFirst,
  IProduct,
  ICategory,
  ICar,
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
import { capitalize } from '~/utils';
import Image from 'next/image';
import ProductSmallGrid from '~/components/car/ProductSmallGrid';

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
        minHeight: '10rem',
        padding: theme.spacing(3),
        background: theme.palette.background.paper,
        marginBottom: theme.spacing(3),
      },
    },
    blockTitle: {
      paddingBottom: theme.spacing(1),
    },
    modelHistory: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    carImage: {
      minWidth: 250,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    textBox: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
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
  model: ICar;
}
export default function ModelShopList(props: IProps) {
  const {
    header,
    breads,
    count,
    sortedFilters,
    popularProducts,
    categories,
    model,
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
                {`Категории запчастей`}
              </Typography>
              <CategoryBlock categories={categories} model={model} />
            </div>
            <div>
              <Typography variant="h6" className={classes.blockTitle}>
                Популярные товары
              </Typography>
              <Box>
                <ProductSmallGrid products={popularProducts} />
              </Box>
            </div>
            <div>
              <Typography variant="h6" className={classes.blockTitle}>
                {`История модели ${capitalize(model.make.name)} ${capitalize(
                  model.model
                )}`}
              </Typography>
              <div className={classes.modelHistory}>
                <Box className={classes.carImage}>
                  <Image
                    src="/images/local/carsAvatar/generic.png"
                    width={250}
                    height={250}
                  />
                </Box>
                <Box className={classes.textBox}>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat non odio reprehenderit illo facilis doloremque odit
                    esse est nemo alias assumenda eaque deserunt inventore quas
                    hic sunt quae nam, mollitia, dolorum, quia maiores eveniet?
                    Unde enim laborum veritatis possimus, odit vel maxime
                    commodi, architecto recusandae inventore ipsam, saepe sit
                    provident reiciendis accusamus rerum molestias voluptatem at
                    dolor atque iure. Voluptas? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quaerat non odio reprehenderit
                    illo facilis doloremque odit esse est nemo alias assumenda
                    eaque deserunt inventore quas hic sunt quae nam, mollitia,
                    dolorum, quia maiores eveniet? Unde enim laborum veritatis
                    possimus, odit vel maxime commodi, architecto recusandae
                    inventore ipsam, saepe sit provident reiciendis accusamus
                    rerum molestias voluptatem at dolor atque iure. Voluptas?
                  </Typography>
                </Box>
              </div>
            </div>
            <div>
              <Typography variant="h6" className={classes.blockTitle}>
                Обьемы жидкостей
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
                Карта ТО
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
