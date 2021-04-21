import React from 'react';
import { IEngine, IProduct } from '~/interfaces';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import parser from 'html-react-parser';
import { DEFAULT_EXCERPT } from '~/config';
import ProductRating from '~/components/product/productPage/ProductRating';
import PriceBox from '~/components/product/productPage/PriceBox';
import { capitalize } from '~/utils';
import { useSelector } from 'react-redux';
import { ICar } from '~/interfaces';
import { IState } from '~/interfaces/IState';
import {
  Chip,
  Button,
  Typography,
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Hidden,
  Grid,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    descriptionPaper: {
      position: 'relative',
      height: '100%',
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    rightSideGrid: {
      display: 'flex',
    },
    carBage: {
      position: 'absolute',
      top: theme.spacing(-1),
      left: theme.spacing(4),
      paddingLeft: theme.spacing(1),
      color: () =>
        theme.palette.type === 'light'
          ? theme.palette.background.paper
          : theme.palette.text.primary,
      fontWeight: 500,
      fontSize: '0.8rem',
      zIndex: 0,
      '&::before': {
        content: '""',
        display: 'block',
        width: '100%',
        position: 'absolute',
        zIndex: -1,
        left: theme.spacing(0.5),
        right: theme.spacing(0.5),
        top: 0,
        bottom: 0,
        background: theme.palette.primary.main,
        /* background: */
        /*   theme.palette.type === 'light' ? lightGreen[100] : lightGreen[700], */
        borderRadius: '2px',
        transform: `skewX(-20deg)`,
      },
    },
    productHeaderGrid: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
    productHeader: {
      fontSize: '1.8rem',
      fontWeight: 700,
      [theme.breakpoints.down('md')]: {
        order: 1,
      },
    },
    excerptBox: {
      paddingLeft: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        order: 3,
      },
    },
    excerpt: {
      paddingLeft: theme.spacing(2),
    },
    excerptText: {
      lineHeight: '1.5em',
      maxHeight: '10em',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      position: 'relative',
    },
    excerptPaper: {
      border: '1px solid green',
      height: '100%',
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
    dl: {
      display: 'flex',
      position: 'relative',
      /* flexWrap: 'wrap', */
      width: '100%',
      alignItems: 'flex-end',
      fontSize: '0.775rem',

      [theme.breakpoints.up('xl')]: {
        fontSize: '0.875rem',
      },
      color: theme.palette.text.disabled,
      '& > dd': {
        width: '49%',
        wordBreak: 'break-word',
      },
      '& > dt': {
        width: '50%',
        '& span': {
          position: 'relative',
          display: 'inline',
          background: theme.palette.background.paper,
        },
        '&:before': {
          content: '""',
          display: 'block',
          width: '60%',
          borderBottom: '1px',
          borderStyle: 'dotted',
          borderColor: theme.palette.action.selected,
          position: 'absolute',
          bottom: '0.2rem',
          left: 0,
        },
      },
    },
    catNumberBox: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('md')]: {
        order: 2,
      },
    },
  })
);
interface IProps {
  product: IProduct;
}

const ProductPriceSideBlock = ({ product }: IProps) => {
  const classes = useStyles();
  const currentCar = useSelector((state: IState) => state.shop.currentCar);
  const compability =
    currentCar &&
    product.model.some((car: ICar) => car.slug === currentCar.slug)
      ? true
      : false;

  const productrating = product.rating ? product.rating : undefined;
  return (
    <div>
      <Paper className={classes.descriptionPaper}>
        {compability && (
          <div className={classes.carBage}>Подходит на {currentCar?.model}</div>
        )}
        <Grid className={classes.rightSideGrid} container>
          <Grid className={classes.productHeaderGrid} item xs={12}>
            <Typography className={classes.productHeader} variant="h1">
              {`${product.name} ${capitalize(product.model[0].make.name)} ${
                product.model[0].model
              }`}
            </Typography>
            <ProductRating
              rating={productrating}
              productId={product.id}
              ratingCount={product.ratingCount}
            />
          </Grid>
          <Grid className={classes.excerptBox} item xs={12} lg={6}>
            {product.description ? (
              <Grid className={classes.excerpt} item xs={12} lg={12}>
                <Box className={classes.excerptText}>
                  {parser(product.description)}
                </Box>
              </Grid>
            ) : (
              parser(DEFAULT_EXCERPT)
            )}
            {product.attributes && product.attributes.length ? (
              <Box className={classes.excerptPaper}>
                {product.attributes.map((attr: any, i: number) => (
                  <dl key={i} className={classes.dl}>
                    <dt>
                      <span>{attr.name}</span>
                    </dt>
                    <dd>
                      <span>{attr.value}</span>
                    </dd>
                  </dl>
                ))}
              </Box>
            ) : (
              ''
            )}
          </Grid>
          <Grid className={classes.catNumberBox} container item xs={12} lg={6}>
            <Box>
              <PriceBox product={product} />
            </Box>
          </Grid>
        </Grid>
        <Box
          style={{
            border: '1px solid pink',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Tegs are going here
        </Box>
      </Paper>
    </div>
  );
};

export default ProductPriceSideBlock;
