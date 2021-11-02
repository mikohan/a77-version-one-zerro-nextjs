import React, { useState } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL, COMPANY_INFORMATION } from '~/config';
import {
  Grid,
  Container,
  Button,
  Typography,
  Paper,
  TextField,
  Box,
} from '@material-ui/core';
import NoSsr from '@material-ui/core/NoSsr';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { login } from '~/store/users/userAction';
import { useDispatch } from 'react-redux';
import url from '~/services/url';
import Link from 'next/link';
import { getUserCookie } from '~/services/getUserCookie';
import { GetServerSidePropsContext } from 'next';
import GoogleLogin from 'react-google-login';
import { googleLogin } from '~/store/users/userAction';
import BreadCrumbs from '~/components/common/BreadCrumbs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: { paddingBottom: theme.spacing(5), paddingTop: theme.spacing(5) },
    sideGrid: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    container: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      position: 'relative',
    },
    breads: {
      paddingBottom: theme.spacing(2),
    },
    textFieldGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    form: {
      width: '100%',
      height: '100%',
    },
    paper: {
      height: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    buttonBox: {
      paddingTop: theme.spacing(3),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      '&>*': {
        marginBottom: theme.spacing(2),
      },
    },
    helpers: {
      display: 'flex',
      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    policy: {
      position: 'absolute',
      bottom: theme.spacing(2),
      left: theme.spacing(2),
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
  const dispatch = useDispatch();

  const breadCrumbs = [
    { name: `${COMPANY_INFORMATION.COMPANY_NAME_ENG}`, path: '/' },
    { name: 'Логин', path: url.account.login() },
  ];

  const responseGoogle = (response: any) => {
    if (response) {
      dispatch(googleLogin(response.tokenId));
    }
  };

  return (
    <React.Fragment>
      <RegisterHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.main} container justify="center">
            <Grid className={classes.breads} item xs={12}>
              <BreadCrumbs breadCrumbs={breadCrumbs} />
            </Grid>
            <Grid className={classes.sideGrid} item xs={8}>
              <NoSsr>
                <LoginFormPaper />
              </NoSsr>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6">Войти через:</Typography>
                <Box className={classes.buttonBox}>
                  <GoogleLogin
                    clientId="226244999524-h2prj07pns8q7n6hf4qe9ssc5qub3lcl.apps.googleusercontent.com"
                    buttonText="Login"
                    cookiePolicy={'single_host_origin'}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    render={(renderProps: any) => (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={renderProps.onClick}
                      >
                        Войти через Google
                      </Button>
                    )}
                  />
                </Box>
              </Paper>
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

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  const handleLogin = () => {
    dispatch(login(email, password));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Paper>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography variant="h6">Зарегестрированы? Войти.</Typography>
        </Grid>
        <form className={classes.form} onSubmit={handleLogin}>
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
            <Box className={classes.helpers}>
              <Link href={url.account.register()}>
                <a>
                  <Typography variant="body2" color="primary">
                    Нет аккаунта? Создать.
                  </Typography>
                </a>
              </Link>
              <Link href={url.account.resetPassword()}>
                <a>
                  <Typography variant="body2" color="secondary">
                    Забыли пароль?
                  </Typography>
                </a>
              </Link>
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Войти
            </Button>
            <Box className={classes.policy}>
              <Link href={url.policy()}>
                <a>
                  <Typography variant="subtitle2" color="primary">
                    Отправляя свои данные, я соглашаюсь с политикой
                    конфиденциальности
                  </Typography>
                </a>
              </Link>
            </Box>
          </Grid>
        </form>
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

