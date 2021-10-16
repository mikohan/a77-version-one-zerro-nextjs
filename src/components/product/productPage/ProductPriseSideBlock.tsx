import React from 'react';
import { useSelector } from 'react-redux';
import parser from 'html-react-parser';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { DEFAULT_EXCERPT } from '~/config';
import ProductRating from '~/components/product/productPage/ProductRating';
import PriceBox from '~/components/product/productPage/PriceBox';
import { capitalize } from '~/utils';
import { ICar } from '~/interfaces';
import { IState } from '~/interfaces/IState';
import { IProduct } from '~/interfaces';
import {
  FiPaymentSecurity48Svg,
  FiFreeDelivery48Svg,
  Fi24Hours48Svg,
} from '~/svg';
import { COMPANY_INFORMATION } from '~/config';

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
      paddingTop: theme.spacing(3),
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

    bottomIcons: {
      padding: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    iconItem: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: theme.spacing(4),
      height: theme.spacing(4),
      fill:
        theme.palette.type === 'light' ? theme.palette.secondary.light : '#fff',
    },
    iconBox: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    carModelBox: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      paddingLeft: theme.spacing(2),
    },
    carModel: {
      height: theme.spacing(2.5),
      paddingTop: theme.spacing(0.1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginRight: theme.spacing(0.5),
      borderRadius: '0.8rem',
      fontSize: '0.75rem',
      fontWeight: 600,
      border:
        theme.palette.type === 'light' ? '1px solid #1976d2' : '1px solid #fff',

      background:
        theme.palette.type === 'light'
          ? '#fff'
          : theme.palette.background.paper,
      color:
        theme.palette.type === 'light' ? theme.palette.primary.main : '#fff',
    },
  })
);

interface IProps {
  product: IProduct;
}

const ProductPriceSideBlock = ({ product }: IProps) => {
  const classes = useStyles();
  const currentCar = useSelector((state: IState) => state.shop.currentCar);
  let compability = null;
  if (currentCar) {
    compability =
      currentCar &&
      product.model.some((car: ICar) => car.slug === currentCar.slug)
        ? true
        : false;
  }

  const productrating = product.rating ? product.rating : null;

  const carModels: string[] =
    product.model && product.model.length
      ? product.model.map((car: ICar) => car.model)
      : [];
  return (
    <Paper className={classes.descriptionPaper}>
      {compability && (
        <div className={classes.carBage}>Подходит на {currentCar?.model}</div>
      )}
      <Grid className={classes.rightSideGrid} container>
        <Grid className={classes.productHeaderGrid} item xs={12}>
          <Typography className={classes.productHeader} variant="h1">
            {product.model.length
              ? `${product.name} ${capitalize(product.model[0].make.name)} ${
                  product.model[0].model
                }`
              : `${product.name}`}
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
      {carModels.length ? (
        <Grid className={classes.carModelBox} item xs={12}>
          {carModels.map((car: string) => (
            <Box className={classes.carModel} key={car}>
              {car}
            </Box>
          ))}
        </Grid>
      ) : (
        ''
      )}
      <Box className={classes.bottomIcons}>
        <Box className={classes.iconBox}>
          <FiFreeDelivery48Svg className={classes.iconItem} />
          <Typography variant="subtitle1">Бесплатная доставка</Typography>
          <Typography variant="body2">
            При заказе от &#8381; {COMPANY_INFORMATION.FREE_SHIPPING_FROM}
          </Typography>
        </Box>
        <Box className={classes.iconBox}>
          <FiPaymentSecurity48Svg className={classes.iconItem} />
          <Typography variant="subtitle1">Безопасная оплата</Typography>
          <Typography variant="body2">Яндекс и СберБанк</Typography>
        </Box>
        <Box className={classes.iconBox}>
          <Fi24Hours48Svg className={classes.iconItem} />
          <Typography variant="subtitle1">
            Работаем {COMPANY_INFORMATION.SHOP_WORKING_HOURS_FROM}-
            {COMPANY_INFORMATION.SHOP_WORKING_HOURS_TO}
          </Typography>
          <Typography variant="body2">Ежедневно</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductPriceSideBlock;
