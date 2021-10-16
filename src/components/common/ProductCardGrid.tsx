import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import { IProduct } from '~/interfaces/product';
import ChipContainer from '../common/ChipBox';
import { ICar } from '~/interfaces/ICar';
import { imageServerUrl } from '~/config';
import { cartAddItem } from '~/store/cart/cartAction';
import Snackbar from '~/components/common/AddedToCartSnackBar';
import { part64 } from '~/services/base64';

interface IProp {
  product: IProduct;
  currentCar?: ICar;
}

export default function ProductCardGrid({ product, currentCar }: IProp) {
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

  let imgUrl = '';
  if (product.images && product.images.length) {
    const regex = new RegExp('http*');
    const chk = product.images[0].img245
      ? regex.test(product.images[0].img245)
      : false;
    if (chk) {
      imgUrl = `${product.images[0].img245}`;
    } else {
      imgUrl = `${imageServerUrl}${product.images[0].img245 as string}`;
    }
  }
  const imgPath: string = product.images.length
    ? imgUrl
    : '/images/local/defaultParts500.jpg';

  let stock = null;
  if (product.stocks && product.stocks.length) {
    try {
      stock = product.stocks.find((item: any) => {
        if (item.hasOwnProperty('store')) {
          return item.store.id === 3;
        } else {
          return true;
        }
      });
    } catch (e) {
      console.error('Error in ProductCard for similar products', e);
    }
  }

  const price = stock ? stock?.price : null;
  const compatable = product.model
    ? product.model.some(
        (item: any) => item.slug.toLowerCase() === currentCar?.slug
      )
    : null;
  let car: string =
    currentCar && currentCar.hasOwnProperty('model') ? currentCar.model : '';
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
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
    dispatch(cartAddItem(product, [], 1));
    setOpenSnackbar(true);
  }

  return (
    <div className={classes.card}>
      <Snackbar open={openSnackbar} handleClose={handleClose} />
      {compatable && <ChipContainer car={car} />}
      <Link href={`/product/${product.slug}`}>
        <a className={classes.a}>
          <Image
            layout="intrinsic"
            width={200}
            height={200}
            className={classes.image}
            src={imgPath}
            alt={product.full_name}
            blurDataURL={part64}
            placeholder="blur"
          />
        </a>
      </Link>
      <Typography className={classes.price} variant="h6">
        &#8381; {price ? price : 'Звоните'}
      </Typography>
      <Typography className={classes.name} variant="subtitle1" component="div">
        {product.name}
      </Typography>
      <div className={classes.models}>
        {product.model.map((model: any) => (
          <Typography
            key={model.slug}
            className={classes.model}
            variant="body2"
            component="div"
          >
            {model.hasOwnProperty('model')
              ? model.model.toUpperCase()
              : model.name.toUpperCase()}
          </Typography>
        ))}
      </div>
      <div className={classes.lastRow}>
        <Typography className={classes.sku} variant="body2" component="div">
          {product.brand ? product.brand.name.toUpperCase() : 'ORIGINAL'}
        </Typography>
        <ShoppingCartOutlinedIcon
          onClick={handleAddToCart}
          className={classes.cartIcon}
        />
      </div>
    </div>
  );
}
