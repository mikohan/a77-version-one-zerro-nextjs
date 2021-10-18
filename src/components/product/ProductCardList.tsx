import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { IProductElasticHitsSecond } from '~/interfaces/product';
import ChipBox from '~/components/common/ChipBox';
import Button from '@material-ui/core/Button';

import { ICar } from '~/interfaces';
import { cartAddItem } from '~/store/cart/cartAction';
import { IState } from '~/interfaces';
import { ICartItem } from '~/store/cart/cartTypes';
import Snackbar from '~/components/common/AddedToCartSnackBar';
import { part64 } from '~/services/base64';

interface IProp {
  product: IProductElasticHitsSecond;
  currentCar?: ICar;
}

export default function ComplexGrid({ product, currentCar }: IProp) {
  const imgPath: string = product._source.images.length
    ? (product._source.images[0].img500 as string)
    : '/images/local/defaultParts500.jpg';
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      card: {
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(1),
        },
        padding: theme.spacing(3),
        position: 'relative',
        display: 'grid',

        [theme.breakpoints.down('sm')]: {
          gridTemplateColumns: `repeat(auto-fill, minmax(215px, 1fr))`,
          justifyContent: 'center',
        },
        [theme.breakpoints.up('sm')]: {
          gridTemplateColumns: `1fr 2fr 1fr`,
        },
        boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
        borderRadius: '2px',
        background: theme.palette.background.paper,
        transition: '0.5s',
        '&:hover $shoppingCartIcon': {
          transform: `scale(1.1)`,
          color: theme.palette.primary.dark,
          cursor: 'pointer',
        },
      },
      cardImageLink: {
        position: 'relative',
        maxHeight: '100%',
        display: 'flex',
        alignItems: 'center',
      },
      productName: {
        [theme.breakpoints.down('sm')]: {
          fontSize: '1rem',
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.1rem',
        },
        color: theme.palette.text.secondary,
      },
      cardImage: {
        maxWidth: '100%',
        height: 'auto',
        [theme.breakpoints.up('sm')]: {
          maxHeight: '200px',
        },
        [theme.breakpoints.down('sm')]: {
          maxWidth: '100%',
          height: 'auto',
        },
        objectFit: 'contain',
      },
      cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: theme.spacing(3),
      },
      cardInfo: {
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        [theme.breakpoints.up('sm')]: {
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        },
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        display: 'flex',
      },
      shoppingCartIcon: {
        [theme.breakpoints.down('sm')]: {
          fontSize: '2rem',
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '2.5rem',
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: '3rem',
        },

        color: theme.palette.primary.main,
        transition: '0.2s',
      },
      productSku: {
        color: theme.palette.text.disabled,
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
  const compatable = product._source.model.some(
    (item: any) => item.slug.toLowerCase() === currentCar?.slug
  );
  const stock = product._source.stocks.find((item: any) => item.store.id === 3);
  const price = stock?.price;

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
    dispatch(cartAddItem(product._source, [], 1));

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
    <React.Fragment>
      <Snackbar open={openSnackbar} handleClose={handleClose} />
      <div key={product._id} className={classes.card}>
        <a className={classes.cardImageLink}>
          {compatable && <ChipBox car={currentCar?.model} />}
          <Image
            layout="intrinsic"
            width={350}
            height={245}
            src={imgPath}
            alt={product._source.full_name}
            blurDataURL={part64}
            placeholder="blur"
          />
        </a>
        <div className={classes.cardContent}>
          <Typography className={classes.productName} variant="h6">
            {product._source.name}
          </Typography>
          <Typography className={classes.productSku} variant="body2">
            SKU: {product._source.cat_number}
          </Typography>
        </div>
        <div className={classes.cardInfo}>
          <Typography variant="h6">&#8381; {price}</Typography>
          <div>
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
      </div>
    </React.Fragment>
  );
}
