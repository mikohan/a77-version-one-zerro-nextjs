import React, { useEffect } from 'react';
import AnimationPage from '~/components/common/AnimationPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { DEFAULT_EXCERPT, REVALIDATE, imageServerUrl } from '~/config';
import {
  Grid,
  Paper,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from '@material-ui/core';
import Image from 'next/image';

import ProductPageHeader from '~/components/product/productPage/ProductPageHeader';
import { ICart, ICartItem } from '~/store/cart/cartTypes';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useRouter } from 'next/router';
import {
  cartRemoveItemSuccess,
  cartUpdateQuantitiesSuccess,
} from '~/store/cart/cartAction';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),

      justifyContent: 'center',
      [theme.breakpoints.up('lg')]: {
        maxWidth: '85%',
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '75%',
      },
    },
    headerContainer: {
      /* background: 'rgba(0,142,129,0.1)', */
      marginBottom: theme.spacing(2),
    },
    gridColumn: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      minHeight: theme.spacing(45),
    },
    empty: {
      minHeight: theme.spacing(45),
      minWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cart: {
      fontWeight: 500,
    },
    orderButton: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: 'center',
    },
    emptyGoHomeText: {
      marginBottom: theme.spacing(5),
      fontSize: '3rem',
      fontWeight: 500,
      color: theme.palette.text.disabled,
    },
    deleteIcon: {
      color: theme.palette.secondary.main,
      cursor: 'pointer',
    },
  })
);

export default function Cart() {
  const classes = useStyles();
  const cart: ICart = useSelector((state: IState) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();

  const breads = [
    { name: 'Ангара77', path: '/' },
    { name: 'Корзина', path: '/cart/cart' },
  ];

  function handleGoHome() {
    router.push('/');
  }

  function handleQuantity(
    event: React.ChangeEvent<HTMLInputElement>,
    item: ICartItem
  ): void {
    dispatch(
      cartUpdateQuantitiesSuccess([
        { itemId: item.id, value: +event.target.value },
      ])
    );
  }

  function handleRemoveItem(itemId: number): void {
    dispatch(cartRemoveItemSuccess(itemId));
  }

  function BigPaper() {
    return (
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Фото</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">Продукт</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">Цена</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">Количество</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">Итого</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1"></Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.items.map((item: ICartItem) => {
                const img =
                  item.product.images && item.product.images.length
                    ? `${imageServerUrl}${
                        item.product.images[0].img150 as string
                      }`
                    : '/images/local/defaultParts245.jpg';
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image src={img} width={120} height={100} />
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.cart} variant="body1">
                        {item.product.name}{' '}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.cart} variant="body1">
                        &#8381; {item.product.stocks[0].price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        defaultValue={item.quantity}
                        variant="filled"
                        type="number"
                        size="small"
                        InputProps={{
                          inputProps: { min: 1, max: 20 },
                        }}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleQuantity(event, item)}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.cart} variant="body1">
                        &#8381; {item.total}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <DeleteForeverIcon
                        className={classes.deleteIcon}
                        onClick={() => handleRemoveItem(item.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  function SmallPaper() {
    return (
      <Paper>
        <React.Fragment>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Сумма Корзины</Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.cart} variant="body1">
                      Доставка
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">Звоните!</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.cart} variant="body1">
                      К Оплате
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      &#8381; {cart.total}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={classes.orderButton}>
            <Button variant="contained" color="primary">
              Оформить заказ
            </Button>
          </Box>
        </React.Fragment>
      </Paper>
    );
  }

  return (
    <React.Fragment>
      <AnimationPage>
        <div className={classes.mainContainer}>
          <Grid container>
            <Grid className={classes.headerContainer} item xs={12}>
              <ProductPageHeader breads={breads} />
            </Grid>
            {cart.items.length ? (
              <Grid container item xs={12}>
                <Grid className={classes.gridColumn} item xs={12} md={8}>
                  {/* <BigPaper /> */}
                </Grid>
                <Grid className={classes.gridColumn} item xs={12} md={4}>
                  {/* <SmallPaper /> */}
                </Grid>
              </Grid>
            ) : (
              <Grid container item className={classes.empty}>
                <Typography className={classes.emptyGoHomeText} variant="h2">
                  Корзина Пуста
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleGoHome}
                >
                  Вернуться на Главную
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    revalidate: REVALIDATE,
    props: {},
  };
};
