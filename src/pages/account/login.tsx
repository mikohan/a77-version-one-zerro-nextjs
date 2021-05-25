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
import { GetServerSidePropsContext } from 'next';
import { login } from '~/store/users/userAction';
import { useDispatch, useSelector } from 'react-redux';
import url from '~/services/url';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IState } from '~/interfaces';

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
// This is the recommended way for Next.js 9.3 or newer

/* export const getServerSideProps = async ( */
/*   context: GetServerSidePropsContext */
/* ) => { */
/*   const { token } = context.query; */
/*   return { */
/*     props: { */
/*       token, */
/*     }, */
/*   }; */
/* }; */

interface IProps {
  token: string;
}

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: IState) => state.user.isAuthenticated
  );

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleLogin() {
    dispatch(login(email, password));
    if (isAuthenticated) {
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      router.push(url.account.dashboard());
    }
  }, [isAuthenticated]);
  console.log(email, password);

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
          <Link href={url.account.create()}>
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
    <title key="title">
      Заргестрироваться в интернет магазине АНГАРА запчасти для грузовиков и
      коммерческого транспорта
    </title>
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
