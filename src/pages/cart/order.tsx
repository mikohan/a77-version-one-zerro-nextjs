import React, { useState } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import {
  footerData,
  SITE_DOMAIN_FULL,
  imageServerUrl,
  COMPANY_INFORMATION,
} from '~/config';
import {
  Box,
  Grid,
  Container,
  Paper,
  Button,
  Snackbar,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { GetServerSidePropsContext } from 'next';
import { IAddress, IUser, IOrder } from '~/interfaces';
import { getUserCookie } from '~/services/getUserCookie';
import Moment from 'moment';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '~/interfaces';
import NoSsr from '@material-ui/core/NoSsr';
import OrderTabs from '~/components/account/OrderTabs';
import OrderTable from '~/components/account/OrderTable';
import { ICartItem } from '~/store/cart/cartTypes';
import { emailIsValid } from '~/utils';
import { sendOrder } from '~/endpoints/orderEndpoints';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { clearCart } from '~/store/cart/cartAction';
import Link from 'next/link';
import url from '~/services/url';

// This is the recommended way for Next.js 9.3 or newer
interface IProps {
  user: IUser;
  access: string;
  order: IOrder;
}
export default function Order({ access, user }: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const router = useRouter();
  const cart = useSelector((state: IState) => state.cart);
  const autouser = useSelector((state: IState) => state.shopNew.userId);

  Moment.locale('ru');
  const today = Moment();
  const orderNumber = `A-${today.format('HHmm')}`;

  const [phone, setPhone] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  function handlePhone(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.value && event.target.value.length > 8) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
    setPhone(event.target.value);
  }
  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>): void {
    if (
      event.target.value &&
      event.target.value.length > 5 &&
      emailIsValid(event.target.value)
    ) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    setValueEmail(event.target.value);
  }
  function handleCity(event: React.ChangeEvent<HTMLInputElement>): void {
    setCity(event.target.value);
  }
  function handleAddress(event: React.ChangeEvent<HTMLInputElement>): void {
    setAddress(event.target.value);
  }

  const [showPayment, setShowPayment] = React.useState(true);
  const [showOnlinePayment, setShowOnlinePayment] = React.useState(false);
  const [valuePayment, setValuePayment] = React.useState('onGet');
  const [loadOrder, setLoadOrder] = React.useState(false);

  const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValuePayment(value);
    if (value === 'onLine') {
      setShowOnlinePayment(true);
      setShowSendOrder(false);
    } else {
      setShowOnlinePayment(false);
      setShowSendOrder(true);
    }
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
  // Addresse choiser
  const addresses = user.address_user || [];

  let defaultAddress = addresses.find(
    (address: IAddress) => address.default === true
  );
  if (!defaultAddress) {
    defaultAddress = addresses[0];
  }

  const [valueAddress, setValueAddress] = React.useState(defaultAddress?.id);
  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAddress(parseInt(event.target.value));
  };
  // Collecting data to send to server here tomorow needs to  add cart and products

  const order_products = cart.items.map((item: ICartItem) => {
    const regex = /(http|https)/;
    let image = 'slslsll';
    if (item.product.images && item.product.images.length) {
      const img = item.product.images[0].img150;
      if (regex.test(img as string)) {
        image = img as string;
      } else {
        image = `${imageServerUrl}${item.product.images[0].img150}`;
      }
    }
    return {
      product_name: item.product.name,

      product_price: item.product.stocks[0].price,
      product_id: item.product.id,
      product_car: item.product.model[0].model,
      product_brand: item.product.brand.name,
      product_image: item.product.images.length ? image : null,
      product_slug: item.product.slug,
      product_one_c_id: item.product.one_c_id,
      product_cat_number: item.product.cat_number,

      qty: item.quantity,
    };
  });

  let toSend: IOrder = {
    phone,
    email: valueEmail,
    city,
    address,
    delivery: valueDelivery,
    payment: valuePayment,
    autouser: autouser,
    user: user.id || null,
    number: orderNumber,
    status: 'ORD',
    total_front: cart.total,
    order_products: order_products,
  };

  if (access && Object.keys(user).length) {
    const userToSend = {
      phone: user.phone || phone,
      email: user.email || valueEmail,
      city: city
        ? city
        : user.address_user.find(
            (address: IAddress) => address.id === valueAddress
          )?.city,
      address: address
        ? address
        : user.address_user.find(
            (address: IAddress) => address.id === valueAddress
          )?.address || address,
    };
    toSend = { ...toSend, ...userToSend };
  }
  /* console.log(toSend); */

  const [sendActive, setSendActive] = React.useState(true);
  const [phoneError, setPhoneError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  React.useEffect(() => {
    if (!phoneError && !emailError && toSend.email && toSend.phone) {
      setSendActive(false);
    } else {
      setSendActive(true);
    }
  }, [phoneError, emailError, toSend.email, toSend.phone]);

  const [message, setMessage] = React.useState(
    'Я есть сообщение, об успехе или ошибке!'
  );
  type Snack = 'success' | 'error';
  const [snackType, setSnackType] = React.useState<Snack>('success');

  async function handleSendOrder(paymentUrl?: string) {
    setLoadOrder(true);
    const response = await sendOrder(toSend);
    const pushUrl = paymentUrl ? paymentUrl : url.account.orderSuccess();
    /* if (response.status === 201) { */
    /*   setMessage('Заказ успешно отправлен!'); */
    /*   setOpenSnak(true); */
    /*   setSnackType('success'); */
    /*   setLoadOrder(false); */
    /*   setTimeout(() => { */
    /*     router.push(pushUrl); */
    /*   }, 500); */
    /* } else { */
    /*   setMessage('Не удалось отправить заказ. Позвоните пожалуйста менеджеру'); */
    /*   setSnackType('error'); */
    /*   setOpenSnak(true); */
    /* } */
    /* setSendActive(false); */
    if (toSend.email && toSend.phone && emailIsValid(toSend.email)) {
      /* console.log(JSON.stringify(toSend)); */
      try {
        const response = await sendOrder(toSend);
        if (response.status === 201) {
          setMessage('Заказ успешно отправлен!');
          setOpenSnak(true);
          setSnackType('success');
          setLoadOrder(false);
          setTimeout(() => {
            router.push(pushUrl);
          }, 500);
        } else {
          setMessage(
            'Не удалось отправить заказ. Позвоните пожалуйста менеджеру'
          );
          setSnackType('error');
          setOpenSnak(true);
        }
        setSendActive(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      setSendActive(true);
    }
  }
  const [showSendOrder, setShowSendOrder] = React.useState(true);

  const [openSnack, setOpenSnak] = React.useState(false);

  const handleCloseSnack = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnak(false);
  };

  if (cart && cart.items.length) {
    return (
      <React.Fragment>
        <NoSsr>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openSnack}
            autoHideDuration={5000}
            onClose={handleCloseSnack}
            message={message}
            action={
              <React.Fragment>
                <Button
                  color="secondary"
                  size="small"
                  onClick={handleCloseSnack}
                >
                  UNDO
                </Button>
              </React.Fragment>
            }
          >
            <Alert severity={snackType}>
              {message}
              <IconButton
                className={classes.snackBarCloseIcon}
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnack}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Alert>
          </Snackbar>
          <DashboardHead />
          <AnimationPage>
            <Container maxWidth="lg">
              <Grid className={classes.container} container>
                <Grid className={classes.left} item container xs={12} sm={7}>
                  <Grid container>
                    <Grid item xs={12}>
                      <AnimationPage id="order-paper-left">
                        <NoSsr>
                          <OrderTable cart={cart} orderNumber={orderNumber} />
                        </NoSsr>
                      </AnimationPage>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.right} item container xs={12} sm={5}>
                  <Grid container>
                    <Grid className={classes.ordersGrid} item xs={12}>
                      <Paper className={classes.paper}>
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
                          showOnlinePayment={showOnlinePayment}
                          handleChangeAddress={handleChangeAddress}
                          valueAddress={valueAddress}
                          handleChangeEmail={handleChangeEmail}
                          emailError={emailError}
                          phoneError={phoneError}
                          orderNumber={orderNumber}
                          cart={cart}
                          disabled={sendActive}
                          handleSendOrder={handleSendOrder}
                          loadOrder={loadOrder}
                        />
                        {showSendOrder && (
                          <React.Fragment>
                            <Box
                              className={classes.sendButtonBox}
                              onClick={() => handleSendOrder()}
                            >
                              {loadOrder ? (
                                <Box>
                                  <CircularProgress />
                                </Box>
                              ) : (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  disabled={sendActive}
                                >
                                  отправить заказ
                                </Button>
                              )}
                            </Box>
                            <Box className={classes.policy}>
                              <Link href={url.policy()}>
                                <a>
                                  <Typography
                                    variant="subtitle2"
                                    color="primary"
                                  >
                                    Отправляя свои данные, я соглашаюсь с
                                    политикой конфиденциальности
                                  </Typography>
                                </a>
                              </Link>
                            </Box>
                          </React.Fragment>
                        )}
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </AnimationPage>
        </NoSsr>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <NoSsr>
          <AnimationPage>
            <Grid className={classes.container} container>
              <Grid
                className={classes.noItems}
                item
                container
                xs={12}
                justify="center"
                alignItems="center"
              >
                <Typography variant="h3">В корзине ничего нет!</Typography>
              </Grid>
            </Grid>
          </AnimationPage>
        </NoSsr>
      </React.Fragment>
    );
  }
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
    sendButtonBox: {
      paddingRight: theme.spacing(2),
      display: 'flex',
      justifyContent: 'flex-end',
    },
    snackBarCloseIcon: {
      marginLeft: theme.spacing(2),
    },
    policy: {
      marginTop: theme.spacing(2),
    },
    noItems: {
      minHeight: '35vh',
    },
  })
);

const DashboardHead = () => (
  <Head>
    <title key="title">Заказ {COMPANY_INFORMATION.COMPANY_NAME}</title>
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

