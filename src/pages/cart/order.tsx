import React, { useState } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, imageServerUrl, SITE_DOMAIN_FULL } from '~/config';
import {
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { GetServerSidePropsContext } from 'next';
import url from '~/services/url';
import { Button, Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IUser, IOrder, IOrderProducts } from '~/interfaces';
import { getUserCookie } from '~/services/getUserCookie';
import { backServerUrlRest } from '~/config';
import axios from 'axios';
import Moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces';
import { ICart, ICartItem } from '~/store/cart/cartTypes';
import NoSsr from '@material-ui/core/NoSsr';
import OrderTabs from '~/components/account/OrderTabs';

// This is the recommended way for Next.js 9.3 or newer
interface IProps {
  user: IUser;
  access: string;
  order: IOrder;
}
export default function Order({ access, user }: IProps) {
  const classes = useStyles();

  const router = useRouter();
  const cart = useSelector((state: IState) => state.cart);

  Moment.locale('ru');
  const today = Moment();
  function goBack() {
    router.back();
  }
  const orderNumber = `A-${today.format('HHmm')}`;

  const [valueTab, setValueTab] = React.useState(2);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValueTab(newValue);
  };

  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  function handlePhone(event: React.ChangeEvent<HTMLInputElement>): void {
    setPhone(event.target.value);
  }
  function handleCity(event: React.ChangeEvent<HTMLInputElement>): void {
    setCity(event.target.value);
  }
  function handleAddress(event: React.ChangeEvent<HTMLInputElement>): void {
    setAddress(event.target.value);
  }

  const [showPayment, setShowPayment] = React.useState(true);
  const [valuePayment, setValuePayment] = React.useState('onGet');

  const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValuePayment(value);
  };
  const [showFields, setShowFields] = React.useState(false);
  const [valueDelivery, setValueDelivery] = React.useState('self');
  const handleChangeDelivery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setValueDelivery(value);
    if (value === 'kur') {
      setShowFields(true);
    } else {
      setShowFields(false);
    }

    if (value === 'post') {
      setShowPayment(false);
    } else {
      setShowPayment(true);
    }
  };

  return (
    <React.Fragment>
      <DashboardHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.container} container>
            <Grid className={classes.left} item container xs={12} sm={7}>
              <Grid container>
                <Grid item xs={12}>
                  <AnimationPage id="order-paper-left">
                    <Paper className={classes.paper}>
                      <NoSsr>
                        <Box className={classes.orderBox}>
                          <Typography variant="h6" color="primary">
                            Заказ {orderNumber}
                          </Typography>
                          <Typography variant="body2">
                            <span className={classes.dateSpan}>
                              Создан {Moment(today).format('d MMM YYYY')}
                            </span>
                            <span className={classes.sumSpan}>
                              Сумма заказа
                            </span>
                            <span className={classes.span}>
                              &#8381; {cart.total}
                            </span>
                          </Typography>
                        </Box>
                        <TableContainer>
                          <Table aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell align="left">Фото</TableCell>
                                <TableCell align="left">Бренд</TableCell>
                                <TableCell align="left">Машина</TableCell>
                                <TableCell align="left">Кол-во</TableCell>
                                <TableCell align="left">Цена</TableCell>
                                <TableCell align="left">Сумма</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {cart.items.length &&
                                cart.items.map((item: ICartItem) => {
                                  return (
                                    <TableRow key={item.id}>
                                      <TableCell component="th" scope="row">
                                        <Link
                                          href={url.product(item.product.slug)}
                                        >
                                          <a>
                                            <Typography
                                              className={classes.orderDate}
                                              color="primary"
                                              variant="body2"
                                            >
                                              {item.product.name}
                                            </Typography>
                                          </a>
                                        </Link>
                                      </TableCell>
                                      <TableCell>
                                        <Image
                                          src={
                                            item.product.images.length
                                              ? `${imageServerUrl}${item.product.images[0].img150}`
                                              : '/images/local/defaultParts245.jpg'
                                          }
                                          width={40}
                                          height={40}
                                        />
                                      </TableCell>
                                      <TableCell align="left">
                                        <Typography
                                          className={classes.orderRow}
                                          variant="body2"
                                        >
                                          {item.product.brand.name}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="left">
                                        {item.product.model[0].model}
                                      </TableCell>
                                      <TableCell align="left">
                                        {item.quantity}
                                      </TableCell>
                                      <TableCell align="left">
                                        <Typography variant="body2">
                                          &#8381; {item.price}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="left">
                                        <Typography
                                          className={classes.orderSum}
                                          variant="body2"
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
                        <Box className={classes.tableTotal}>
                          <Typography variant="h6">Сумма заказа</Typography>
                          <Typography className={classes.totalSum} variant="h6">
                            &#8381; {cart.total}
                          </Typography>
                        </Box>
                      </NoSsr>
                    </Paper>
                  </AnimationPage>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.right} item container xs={12} sm={5}>
              <Grid container>
                <Grid className={classes.ordersGrid} item xs={12}>
                  <Paper className={classes.paper}>
                    <NoSsr>
                      <OrderTabs
                        access={access}
                        user={user}
                        handlePhone={handlePhone}
                        handleCity={handleCity}
                        handleAddress={handleAddress}
                        handleChangePayment={handleChangePayment}
                        valuePayment={valuePayment}
                        valueDelivery={valueDelivery}
                        handleChangeDelivery={handleChangeDelivery}
                        showFields={showFields}
                        showPayment={showPayment}
                      />
                    </NoSsr>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await getUserCookie(context);
  let user = {} as IUser;
  let access = '';
  if (data) {
    user = data.user;
    access = data.access;
  }
  /* if (!access) { */
  /*   return { */
  /*     redirect: { */
  /*       destination: url.account.login(), */
  /*       permanent: false, */
  /*     }, */
  /*   }; */
  /* } */

  return {
    props: { access, user },
  };
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    left: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    right: {
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(2),
      },
    },
    paper: {
      height: '100%',
      padding: theme.spacing(2),
    },
    ordersGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    orderRow: {
      textDecoration: 'underline',
    },
    orderSum: {
      fontWeight: 700,
    },
    orderDate: {
      fontWeight: 700,
      textDecoration: 'underline',
    },
    span: {
      fontWeight: 700,
    },
    dateSpan: {
      marginRight: theme.spacing(2),
    },
    sumSpan: {
      marginRight: theme.spacing(2),
    },
    tableTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(3),
      paddingLeft: '50%',
    },
    totalSum: {
      fontWeight: 700,
    },
    orderBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.action.selected,
    },
  })
);

const DashboardHead = () => (
  <Head>
    <title key="title">Заказ ANGARA77</title>
    <meta
      key="description"
      name="description"
      content={`Angara 77 | ${footerData.SHOP_PHONE} Information about our
          company and history of establishment. We are open our dors in 2001 first time`}
    />
    <meta
      key="og:title"
      property="og:title"
      content="Get your car in perfect health | Angara Parts | About Us"
    />
    <meta
      key="og:url"
      property="og:url"
      content={`${SITE_DOMAIN_FULL}/about`}
    />
    <meta key="og:image" property="og:image" content="/favicon.png" />
    <meta key="og:image:type" property="og:image:type" content="image/png" />
    <meta key="og:image:width" property="og:image:width" content="1200" />
    <meta key="og:image:hight" property="og:image:hight" content="630" />

    <meta key="og:image:alt" property="og:image:alt" content="Angara 77 logo" />
    <link rel="canonical" key="canonical" href={`${SITE_DOMAIN_FULL}/about`} />
  </Head>
);
