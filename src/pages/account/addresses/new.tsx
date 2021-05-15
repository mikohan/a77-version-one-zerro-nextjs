import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  Box,
  Checkbox,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { getSession } from 'next-auth/client';
import { GetServerSidePropsContext } from 'next';
import DashboardLeftMenu from '~/components/account/DashboardLeftMenu';
import url from '~/services/url';
import { useRouter } from 'next/router';
import axios from 'axios';
import { IAddress } from '~/interfaces';
import { userAddressesListUrl } from '~/config';
import { Session } from 'next-auth';

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
    formBox: {
      padding: theme.spacing(5),
      width: '100%',
    },
    title: {
      paddingBottom: theme.spacing(3),
    },
    fieldsBox: {
      maxWidth: '70%',
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    helper: {
      paddingBottom: theme.spacing(0.5),
    },
    textField: {
      background: theme.palette.action.hover,
    },
    checkboxBox: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);
// This is the recommended way for Next.js 9.3 or newer
interface IProps {
  session: Session | any;
}
export default function Dashboard({ session }: IProps) {
  const classes = useStyles();
  const [address, setAddress] = useState<IAddress>({
    city: '',
    address: '',
    zip_code: '',
    default: false,
  } as IAddress);
  const router = useRouter();

  function handleCity(event: React.ChangeEvent<HTMLInputElement>) {
    const newState = { ...address, city: event.target.value };
    setAddress(newState);
  }
  function handleAddress(event: React.ChangeEvent<HTMLInputElement>) {
    const newState = { ...address, address: event.target.value };
    setAddress(newState);
  }
  function handleZipCode(event: React.ChangeEvent<HTMLInputElement>) {
    const newState = { ...address, zip_code: event.target.value };
    setAddress(newState);
  }
  function handleDefalut(event: React.ChangeEvent<HTMLInputElement>) {
    const newState = { ...address, default: event.target.checked };
    setAddress(newState);
  }
  function handleSubmit() {
    async function sendToServer() {
      const url = `${userAddressesListUrl}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${session?.user?.token}`,
        },
      };

      const newState = { ...address, user: session?.user?.id };
      setAddress(newState);

      try {
        console.log(address);
        console.log(config.headers.Authorization);
        const promise = await axios.post(url, address, config);
        if (promise) {
          setAddress(promise.data);
        }
      } catch (e) {
        console.log('Cannot create address', e);
      }
    }
    sendToServer();
  }

  if (session) {
    return (
      <React.Fragment>
        <AddressesdHead />
        <AnimationPage>
          <Container maxWidth="lg">
            <Grid className={classes.container} container>
              <Grid className={classes.left} item container xs={12} sm={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <DashboardLeftMenu />
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={classes.right} item container xs={12} sm={9}>
                <Grid container>
                  <Grid item container xs={12}>
                    <Paper className={classes.formBox}>
                      <Typography className={classes.title} variant="h6">
                        Добавить Адрес
                      </Typography>
                      <Box className={classes.fieldsBox}>
                        <Box>
                          <Typography
                            className={classes.helper}
                            variant="body2"
                          >
                            Город
                          </Typography>
                          <TextField
                            required
                            label="Город"
                            id="city"
                            placeholder="Город"
                            size="small"
                            variant="outlined"
                            fullWidth
                            onChange={handleCity}
                          />
                        </Box>
                        <Box>
                          <Typography
                            className={classes.helper}
                            variant="body2"
                          >
                            Адрес
                          </Typography>
                          <TextField
                            required
                            label="Адрес"
                            id="address"
                            placeholder="Адрес"
                            size="small"
                            variant="outlined"
                            fullWidth
                            onChange={handleAddress}
                          />
                        </Box>
                        <Box>
                          <Typography
                            className={classes.helper}
                            variant="body2"
                          >
                            Индекс
                          </Typography>
                          <TextField
                            className={classes.textField}
                            label="Индекс"
                            id="zipcode"
                            placeholder="Индекс"
                            size="small"
                            variant="outlined"
                            fullWidth
                            onChange={handleZipCode}
                          />
                        </Box>
                      </Box>
                      <Box className={classes.checkboxBox}>
                        <Checkbox
                          onChange={handleDefalut}
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        <Typography variant="body2">
                          Сделать основным адресом
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                      >
                        Сохранить
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </AnimationPage>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>login first</div>
      </React.Fragment>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);
  return {
    props: { session },
  };
}

const AddressesdHead = () => (
  <Head>
    <title key="title">Добавить Адреса</title>
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
