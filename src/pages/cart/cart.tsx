import React from 'react';
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
} from '@material-ui/core';
import Image from 'next/image';

import ProductPageHeader from '~/components/product/productPage/ProductPageHeader';
import { ICart, ICartItem } from '~/store/cart/cartTypes';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';

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
      border: '1px solid blue',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    cart: {
      fontSize: '1rem',
    },
    orderButton: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: 'center',
    },
  })
);

export default function Cart() {
  const classes = useStyles();
  const cart: ICart = useSelector((state: IState) => state.cart);

  const breads = [
    { name: 'Ангара77', path: '/' },
    { name: 'Корзина', path: '/cart/cart' },
  ];

  return (
    <React.Fragment>
      <AnimationPage>
        <div className={classes.mainContainer}>
          <Grid container>
            <Grid className={classes.headerContainer} item xs={12}>
              <ProductPageHeader breads={breads} />
            </Grid>
            <Grid container item xs={12}>
              <Grid className={classes.gridColumn} item xs={12} md={8}>
                <Paper>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Фото</TableCell>
                          <TableCell>Продукт</TableCell>
                          <TableCell>Цена</TableCell>
                          <TableCell>Количество</TableCell>
                          <TableCell>Итого</TableCell>
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
                            <TableRow>
                              <TableCell>
                                <Image src={img} width={120} height={100} />
                              </TableCell>
                              <TableCell>
                                <Typography
                                  className={classes.cart}
                                  variant="h6"
                                >
                                  {item.product.name}{' '}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  className={classes.cart}
                                  variant="h6"
                                >
                                  &#8381; {item.product.stocks[0].price}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  className={classes.cart}
                                  variant="h6"
                                >
                                  {item.quantity}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  className={classes.cart}
                                  variant="h6"
                                >
                                  &#8381; {item.total}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid className={classes.gridColumn} item xs={12} md={4}>
                <Paper>
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
                            <Typography variant="body1">Доставка</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">Звоните!</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant="body1">К Оплате</Typography>
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
                </Paper>
              </Grid>
            </Grid>
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
