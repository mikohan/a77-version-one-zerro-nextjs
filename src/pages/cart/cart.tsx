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
  })
);

export default function Cart() {
  const classes = useStyles();
  const cart: ICart = useSelector((state: IState) => state.cart);

  const breads = [{ name: 'Ангара77', path: '/' }];

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
                        return (
                          <TableRow>
                            <TableCell>
                              <Image
                                src={item.product.images[0].img150 as string}
                                width={150}
                                height={120}
                              />
                            </TableCell>
                            <TableCell>jfdjfj</TableCell>
                            <TableCell>jfdjfj</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid className={classes.gridColumn} item xs={12} md={4}>
                side content
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
