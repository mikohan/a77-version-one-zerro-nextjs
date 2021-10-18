import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { IProductElasticHitsSecond } from '~/interfaces/product';
import ChipContainer from '../common/ChipBox';
import { ICar } from '~/interfaces/ICar';
import { cartAddItemSuccess } from '~/store/cart/cartAction';
import Snackbar from '~/components/common/AddedToCartSnackBar';
import { IState } from '~/interfaces';
import { ICartItem } from '~/store/cart/cartTypes';
import { part64 } from '~/services/base64';

interface IProp {
  product: IProductElasticHitsSecond;
  currentCar?: ICar;
}

export default function ProductCardGrid({ product, currentCar }: IProp) {
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
        fontSize: '1.2rem',
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
      inCart: {
        maxWidth: theme.spacing(12),
        maxHeight: theme.spacing(3),
        fontSize: '0.7rem',
        background: theme.palette.success.main,
        color:
          theme.palette.type === 'light'
            ? theme.palette.background.paper
            : 'inherit',
      },
      toCart: {
        width: theme.spacing(13),
        maxHeight: theme.spacing(3),
        fontSize: '0.7rem',
      },
    })
  );
  const classes = useStyles();

  const price =
    product._source.stocks &&
    product._source.stocks.length &&
    product._source.stocks[0].price !== 0
      ? product._source.stocks[0].price
      : false;
  const compatable = product._source.model.some(
    (item: any) => item.slug.toLowerCase() === currentCar?.slug
  );
  let car: string =
    currentCar && currentCar.hasOwnProperty('model') ? currentCar.model : '';

  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [inCart, setInCart] = React.useState<boolean>(false);
  const cart = useSelector((state: IState) => state.cart);
  const slugsInCart: string[] = [];
  if (cart && cart.items) {
    cart.items.forEach((item: ICartItem) => {
      slugsInCart.push(item.product.slug);
    });
  }

  // setInCart(slugsInCart);
  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  function handleAddToCart() {
    dispatch(cartAddItemSuccess(product._source, [], 1));

    setOpenSnackbar(true);
  }

  React.useEffect(() => {
    if (
      cart &&
      cart.items &&
      cart.items.find(
        (item: ICartItem) => item.product.id === product._source.id
      )
    ) {
      setInCart(true);
    }
  }, [cart]);

  return (
    <div className={classes.card}>
      <Snackbar open={openSnackbar} handleClose={handleClose} />
      {compatable && <ChipContainer car={car} />}
      <Link href={`/product/${product._source.slug}`}>
        <a className={classes.a}>
          <Image
            layout="intrinsic"
            width={245}
            height={245}
            className={classes.image}
            src={imgPath}
            alt={product._source.full_name}
            blurDataURL={part64}
            placeholder="blur"
          />
        </a>
      </Link>
      <Typography className={classes.price} variant="h2">
        {price ? <span>&#8381; {price}</span> : 'Звоните!'}
      </Typography>
      <Typography className={classes.name} variant="subtitle1" component="div">
        {product._source.full_name}
      </Typography>
      <div className={classes.models}>
        {product._source.model.map((model: any) => (
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
          {product._source.brand.name.toUpperCase()}
        </Typography>
        {inCart ? (
          <Button
            variant="contained"
            className={classes.inCart}
            aria-label="В Корзине"
          >
            В Корзине
          </Button>
        ) : (
          <Button
            variant="contained"
            className={classes.toCart}
            onClick={handleAddToCart}
            color="primary"
            aria-label="В Корзину"
          >
            В Корзину
          </Button>
        )}
      </div>
    </div>
  );
}
