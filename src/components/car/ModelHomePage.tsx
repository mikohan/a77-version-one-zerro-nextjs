import {
  IFilter,
  IProductElasticHitsFirst,
  IProduct,
  ICategory,
  ICar,
  IPost,
} from '~/interfaces';
import React from 'react';
import { Grid, Box } from '@material-ui/core';
import PageHeader from '~/components/product/PageHeader';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { capitalize } from '~/utils';
import Image from 'next/image';
import ProductSmallGrid from '~/components/car/ProductSmallGrid';
import ProductsGrid from '~/components/blog/ProductGrid';
import BlogGrid from '~/components/car/BlogGrid';
import CategoriesEightBoxes from '~/components/car/CategoriesEightBoxes';
import parse from 'html-react-parser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blockTitle: {
      paddingTop: theme.spacing(2),
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
    popularProducts,
    categories,
    model,
    productsToPost,
    postsByCar,
  } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <React.Fragment>
        <PageHeader header={header} breads={breads} count={count} />
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.blockTitle}>
              Популярные категории запчастей
            </Typography>
            <CategoriesEightBoxes items={categories} parts={true} car={model} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.blockTitle}>
              Популярные товары
            </Typography>
            <ProductSmallGrid products={popularProducts} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.blockTitle}>
              Популярные категории автохимия и инструмент
            </Typography>
            <CategoriesEightBoxes
              items={categories}
              parts={false}
              car={model}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.blockTitle}>
              {`История модели ${capitalize(model.make.name)} ${capitalize(
                model.model
              )}`}
            </Typography>
            <Paper className={classes.paper}>
              <Grid item container xs={12} className={classes.modelHistory}>
                <Grid item xs={12} md={4} className={classes.carImage}>
                  <Image
                    src="/images/local/carsAvatar/generic.png"
                    width={250}
                    height={250}
                  />
                </Grid>
                <Grid item xs={12} md={8} className={classes.textBox}>
                  <Box>
                    {model.history ? parse(model.history as string) : ''}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.blockTitle}>
              Обьемы жидкостей
            </Typography>
            <Paper className={classes.paper}>
              <Box>{model.liquids ? parse(model.liquids as string) : ''}</Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.blockTitle}>
              Карта ТО
            </Typography>
            <Paper className={classes.paper}>
              <Box>{model.liquids ? parse(model.to as string) : ''}</Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.blockTitle}>
              Полезные статьи про{' '}
              {`${capitalize(model.make.name)} ${capitalize(model.model)}`}
            </Typography>
            {postsByCar && <BlogGrid posts={postsByCar} />}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.blockTitle}>
            Вам может понравиться
          </Typography>
          <ProductsGrid products={productsToPost} />
        </Grid>
      </React.Fragment>
    </React.Fragment>
  );
}
