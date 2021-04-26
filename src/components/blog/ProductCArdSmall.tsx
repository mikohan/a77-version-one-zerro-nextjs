import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { IProduct } from '~/interfaces/product';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { capitalize } from '~/utils';
import ChipContainer from '../common/ChipBox';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { ICar } from '~/interfaces/ICar';
import Link from 'next/link';
import Image from 'next/image';

interface IProp {
  product: IProduct;
  currentCar?: ICar;
}

export default function ProductCardGrid({ product, currentCar }: IProp) {
  const imgPath: string = product.images.length
    ? (product.images[0].img500 as string)
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
      models: {
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        display: 'flex',
        color: theme.palette.text.disabled,
      },
      model: {
        marginRight: theme.spacing(1),
        fontSize: '.8rem',
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

  const stock = product.stocks.find((item: any) => item.store.id === 3);
  const price = stock?.price;
  const compatable = product.model.some(
    (item: any) => item.slug.toLowerCase() === currentCar?.slug
  );
  let car: string =
    currentCar && currentCar.hasOwnProperty('model') ? currentCar.model : '';

  return (
    <div className={classes.card}>
      {compatable && <ChipContainer car={car} />}
      <Link href={`/product/${product.slug}`}>
        <a className={classes.a}>
          <Image
            layout="intrinsic"
            width={245}
            height={245}
            className={classes.image}
            src={imgPath}
            alt={product.full_name}
          />
        </a>
      </Link>
      <Typography className={classes.price} variant="h6">
        &#8381; {price}
      </Typography>
      <Typography className={classes.name} variant="subtitle1" component="div">
        {product.full_name}
      </Typography>
      <div className={classes.models}>
        {product.model.map((model: any) => (
          <Typography
            key={model.slug}
            className={classes.model}
            variant="body2"
            component="div"
          >
            {model.name.toUpperCase()}
          </Typography>
        ))}
      </div>
      <div className={classes.lastRow}>
        <Typography className={classes.sku} variant="body2" component="div">
          {product.brand.name.toUpperCase()}
        </Typography>
        <ShoppingCartOutlinedIcon className={classes.cartIcon} />
      </div>
    </div>
  );
}
