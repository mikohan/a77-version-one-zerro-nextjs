import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import {
  Grid,
  Container,
  Button,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { login } from '~/store/users/userAction';
import { useDispatch } from 'react-redux';
import url from '~/services/url';
import Link from 'next/link';
import { getUserCookie } from '~/services/getUserCookie';
import { GetServerSidePropsContext } from 'next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: { paddingBottom: theme.spacing(5), paddingTop: theme.spacing(5) },
    container: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    textFieldGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  })
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const data = await getUserCookie(context);
  let access = '';
  if (data) {
    access = data.access;
  }
  if (access) {
    return {
      redirect: {
        destination: url.account.dashboard(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Register() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <RegisterHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.main} container justify="center">
            <Grid item xs={6}>
              <LoginFormPaper />
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}
const LoginFormPaper = () => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleLogin() {
    dispatch(login(email, password));
  }

  return (
    <Paper>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography variant="h6">Зарегестрированы? Войти.</Typography>
        </Grid>
        <Grid
          className={classes.textFieldGrid}
          item
          xs={12}
          container
          justify="center"
        >
          <TextField
            required
            name="username"
            label="Email"
            type="email"
            helperText="Ваш Емайл"
            variant="outlined"
            fullWidth
            onChange={handleEmail}
          />
        </Grid>
        <Grid
          className={classes.textFieldGrid}
          item
          container
          xs={12}
          justify="center"
        >
          <TextField
            required
            name="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            helperText="Ваш Пароль"
            variant="outlined"
            fullWidth
            onChange={handlePassword}
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          justify="space-between"
          alignItems="center"
        >
          <Link href={url.account.register()}>
            <a>
              <Typography variant="body2" color="primary">
                Нет аккаунта? Создать.
              </Typography>
            </a>
          </Link>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleLogin}
          >
            Войти
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

const RegisterHead = () => (
  <Head>
    <title key="title">Войти в личный кабинет АНГАРА</title>
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
