import {
  IFilter,
  IProductElasticHitsFirst,
  IProduct,
  ICategory,
  ICar,
  IPost,
} from '~/interfaces';
import React from 'react';
import { Hidden, Grid } from '@material-ui/core';
import PageHeader from '~/components/product/PageHeader';
import LeftSideBar from '~/components/product/LeftSideBar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FilterWidget from '~/components/product/FilterWidget';
import { Box, Paper, Typography } from '@material-ui/core';
import CategoryBlock from '~/components/car/CategoryBlock';
import { capitalize } from '~/utils';
import Image from 'next/image';
import ProductSmallGrid from '~/components/car/ProductSmallGrid';
import ProductsGrid from '~/components/blog/ProductGrid';
import LatestPosts from '~/components/blog/LatestPosts';
import BlogGrid from '~/components/car/BlogGrid';
import CategoriesEightBoxes from '~/components/car/CategoriesEightBoxes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(5),
    },
    itemsGrid: {
      display: 'grid',
      gridTemplateColumns: `repeat(4, minmax(20%, 1fr))`,
      gridGap: theme.spacing(1),

      '&>*': {
        border: '1px solid blue',
      },
    },
    itemPaper: { padding: theme.spacing(1) },
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
  productsToPost: IProduct[];
  categories: ICategory[];
  model: ICar;
  posts: IPost[];
  postsByCar: IPost[];
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
    productsToPost,
    posts,
    postsByCar,
  } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <React.Fragment>
        <PageHeader header={header} breads={breads} count={count} />
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <CategoriesEightBoxes items={categories} car={model} />
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.blockTitle}>
                Популярные товары
              </Typography>
              <Box>
                <ProductSmallGrid products={popularProducts} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.blockTitle}>
                {`История модели ${capitalize(model.make.name)} ${capitalize(
                  model.model
                )}`}
              </Typography>
              <Grid item container xs={12} className={classes.modelHistory}>
                <Grid item xs={12} md={4} className={classes.carImage}>
                  <Image
                    src="/images/local/carsAvatar/generic.png"
                    width={250}
                    height={250}
                  />
                </Grid>
                <Grid item xs={12} md={8} className={classes.textBox}>
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
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
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
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
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
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.blockTitle}>
                Полезные статьи про{' '}
                {`${capitalize(model.make.name)} ${capitalize(model.model)}`}
              </Typography>
              {postsByCar && <BlogGrid posts={postsByCar} />}
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.blockTitle}>
              Вам может понравиться
            </Typography>
            <ProductsGrid products={productsToPost} />
          </Paper>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  );
}
