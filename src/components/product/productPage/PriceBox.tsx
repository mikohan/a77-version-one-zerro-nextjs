import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Hidden from '@material-ui/core/Hidden';
import lightGreen from '@material-ui/core/colors/lightGreen';

import { cartAddItemSuccess } from '~/store/cart/cartAction';
import { IState } from '~/interfaces/IState';
import Snackbar from '~/components/common/AddedToCartSnackBar';
import { ICartItem } from '~/store/cart/cartTypes';
import { IEngine, IProduct } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      /* border: '1px solid', */
      /* borderColor: theme.palette.action.disabledBackground, */
      /* borderRadius: 3, */
    },
    paperOne: {
      height: theme.spacing(20),
    },
    firstRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    priceBox: {
      padding: theme.spacing(2),
    },
    price: {
      color:
        theme.palette.type === 'light' ? theme.palette.primary.main : '#fff',
      fontWeight: 700,
      fontSize: '1.4rem',
      [theme.breakpoints.up('xl')]: {
        fontSize: '1.7rem',
      },
    },
    priceSide: {
      padding: theme.spacing(2),
    },
    middle: {
      paddingBottom: theme.spacing(2),
      flexGrow: 1,
    },
    secondRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '100%',
      [theme.breakpoints.between('sm', 'md')]: {
        width: '50%',
      },
    },
    buttonInCart: {
      width: '100%',
      [theme.breakpoints.between('sm', 'md')]: {
        width: '50%',
      },
      background: theme.palette.success.main,
      '&:hover': {
        background: theme.palette.success.dark,
      },
    },
    chip: {
      background: () =>
        theme.palette.type === 'light' ? lightGreen[100] : lightGreen[700],
      borderColor: () =>
        theme.palette.type === 'light' ? lightGreen[100] : lightGreen[700],
    },
    inStock: {
      color: () =>
        theme.palette.type === 'light' ? lightGreen[700] : lightGreen[100],
    },
    enginesCell: {
      display: 'flext',
      flexWrap: 'wrap',
    },
    engine: {
      marginRight: theme.spacing(1),
    },
    table: {
      '& td': {
        fontSize: '.875rem',
        [theme.breakpoints.up('xl')]: {
          fontSize: '1rem',
        },
        color: theme.palette.text.secondary,
      },
      '& th': {
        fontSize: '.875rem',
        [theme.breakpoints.up('xl')]: {
          fontSize: '1rem',
        },
      },
    },
  })
);
interface IProps {
  product: IProduct;
}

const PriceBox = ({ product }: IProps) => {
  const classes = useStyles();
  // Cart stuff starts here
  // Fake price made here

  const dispatch = useDispatch();
  function handleAddToCart(product: IProduct) {
    dispatch(cartAddItemSuccess(product, [], 1));
    setInCart(true);
    setOpenSnackbar(true);
  }

  const cart = useSelector((state: IState) => state.cart);
  const [inCart, setInCart] = useState(false);
  const price =
    product.stocks && product.stocks.length && product.stocks[0].price !== 0
      ? product.stocks[0].price
      : false;

  // Set in cart if slug === slug products in cart
  const router = useRouter();
  useEffect(() => {
    if (cart.items.length) {
      const find = cart.items.find(
        (item: ICartItem) => item.product.slug === router.query.slug
      );
      if (find) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
  }, [router.query.slug]);

  // Snackbar stuff
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

  return (
    <div className={classes.container}>
      <Snackbar open={openSnackbar} handleClose={handleClose} />
      <Box className={classes.firstRow}>
        <Box className={classes.priceBox}>
          {price ? (
            <Typography className={classes.price} variant="h2">
              <span>&#8381;</span> {price}
            </Typography>
          ) : (
            <Typography className={classes.price} variant="h2">
              <span>Звоните!</span>
            </Typography>
          )}
        </Box>
        <Box className={classes.priceSide}>
          <Chip
            className={classes.chip}
            label={
              <Typography className={classes.inStock} variant="body2">
                В наличии
              </Typography>
            }
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>
      <Hidden smDown>
        <Box className={classes.middle}>
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell component="th">SKU</TableCell>
                <TableCell>{product.sku}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">Бренд</TableCell>
                <TableCell>{product.brand.name.toUpperCase()}</TableCell>
              </TableRow>
              {product.brand.country && (
                <TableRow>
                  <TableCell component="th">Страна</TableCell>
                  <TableCell>{product.brand.country}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell component="th">Номер</TableCell>
                <TableCell>{product.catNumber}</TableCell>
              </TableRow>
              {product.oemNumber && (
                <TableRow>
                  <TableCell component="th">OEM #</TableCell>
                  <TableCell>{product.oemNumber}</TableCell>
                </TableRow>
              )}
              {product.engine && product.engine?.length > 0 && (
                <TableRow>
                  <TableCell component="th">Двигатель</TableCell>
                  <TableCell className={classes.enginesCell}>
                    {product.engine.map((engine: IEngine) => (
                      <div className={classes.engine} key={engine.id}>
                        {engine.name}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell component="th">Состояние</TableCell>
                <TableCell>{product.condition?.toUpperCase()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Hidden>
      <Box className={classes.secondRow}>
        <Button
          className={inCart ? classes.buttonInCart : classes.button}
          variant="contained"
          color="primary"
          onClick={() => handleAddToCart(product)}
          aria-label={inCart ? 'В Корзине' : 'В корзину'}
        >
          {inCart ? 'В Корзине' : 'В корзину'}
        </Button>
      </Box>
    </div>
  );
};

export default PriceBox;
