import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { IProductElasticHitsSecond } from '~/interfaces/product';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { capitalize } from '~/utils';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ChipContainer from '../common/ChipBox';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import Skeleton from '@material-ui/lab/Skeleton';
import { ICar } from '~/interfaces';

interface IProp {
  product: IProductElasticHitsSecond;
}

export default function ProductCardGrid({ product }: IProp) {
  const imgPath: string = product._source.images.length
    ? (product._source.images[0].img500 as string)
    : '/images/local/defaultParts500.jpg';
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      card: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.paper,
        boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
        borderRadius: '2px',
        '&:hover $cartIcon': {
          transform: `scale(1.2)`,
          color: theme.palette.text.primary,
          cursor: 'pointer',
        },
        '&:hover $name': {
          color: theme.palette.text.primary,
          fontWeight: 700,
        },
      },
      a: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
      },
      image: {
        flexShrink: 0,
        width: '100%',
        height: '245px',
        objectFit: 'cover', // contain maki it small, cover make it big
      },
      price: {
        padding: theme.spacing(1),
        fontWeight: 600,
      },
      name: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        flex: '1 0 auto',
        fontWeight: 600,
        color: theme.palette.text.secondary,
        transition: '0.5s',
      },
      sku: {
        paddingLeft: theme.spacing(1),
      },
      model: {
        color: 'red',
      },
      lastRow: {
        borderTop: '1px solid',
        borderColor: theme.palette.divider,
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(2),

        display: 'flex',
        justifyContent: 'space-between',
      },
      cartIcon: {
        fontSize: '1.5rem',
        color: theme.palette.text.disabled,
        transition: '0.5s',
      },
    })
  );
  const classes = useStyles();

  const currentCar = useSelector((state: IState) => state.shop.currentCar);
  let car: string =
    currentCar && currentCar.hasOwnProperty('model') ? currentCar.model : '';
  const compatable = product._source.model.some(
    (item: any) => item.slug.toLowerCase() === currentCar?.slug
  );
  const stock = product._source.stocks.find((item: any) => item.store.id === 3);
  const price = stock?.price;
  console.log(product._source.model);

  return (
    <div className={classes.card}>
      {compatable && <ChipContainer car={car} />}
      <a className={classes.a}>
        <img
          className={classes.image}
          src={imgPath}
          alt={product._source.full_name}
        />
      </a>
      <Typography className={classes.price} variant="h6">
        &#8381; {product._source.stocks[0].price}
      </Typography>
      <Typography className={classes.name} variant="subtitle1" component="div">
        {product._source.full_name}
      </Typography>
      <div className={classes.lastRow}>
        <Typography className={classes.sku} variant="body2" component="div">
          {product._source.brand.name.toUpperCase()}
        </Typography>
        <ShoppingCartOutlinedIcon className={classes.cartIcon} />
      </div>
    </div>
  );
}
