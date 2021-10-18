import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Typography from '@material-ui/core/Typography';
import { IProduct } from '~/interfaces/product';
import { ICar } from '~/interfaces/ICar';
import Snackbar from '~/components/common/AddedToCartSnackBar';
import { cartAddItem } from '~/store/cart/cartAction';
import { part64 } from '~/services/base64';

interface IProp {
  product: IProduct;
  currentCar?: ICar;
}

export default function ProductCardGrid({ product }: IProp) {
  const imgPath: string =
    product.images && product.images.length
      ? (product.images[0].img245 as string)
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
      image: {
        objectFit: 'cover', // contain maki it small, cover make it big
      },
      price: {
        padding: theme.spacing(1),
        fontWeight: 600,
        fontSize: '1rem',
      },
      name: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        flex: '1 0 auto',
        fontWeight: 600,
        transition: '0.5s',
      },
      sku: {
        paddingLeft: theme.spacing(1),
      },
      models: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(0.5),
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
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(0.5),

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

  const price =
    product.stocks && product.stocks.length
      ? product.stocks[0].price
      : 'Звоните!';

  const shortName = product.name.split(' ').slice(0, 3).join(' ');

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const dispatch = useDispatch();

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
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            layout="responsive"
            width={180}
            height={150}
            className={classes.image}
            src={imgPath}
            alt={product.full_name}
            blurDataURL={part64}
            placeholder="blur"
          />
        </a>
      </Link>
      <Typography className={classes.price} variant="h6">
        &#8381; {price}
      </Typography>
      <Typography className={classes.name} variant="body2" component="div">
        {shortName}
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
        <ShoppingCartOutlinedIcon
          onClick={handleAddToCart}
          className={classes.cartIcon}
        />
      </div>
    </div>
  );
}
