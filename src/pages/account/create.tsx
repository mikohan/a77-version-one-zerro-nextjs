import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { getPage } from '~/endpoints/blogEndpoint';
import { IPage } from '~/interfaces';
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
  useSession,
} from 'next-auth/client';
import Avatar from '@material-ui/core/Avatar';
import Image from 'next/image';
import { imageServerUrl } from '~/config';
import { GetServerSidePropsContext } from 'next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: { paddingBottom: theme.spacing(5) },
    headerGrid: {
      padding: theme.spacing(5),
    },
    sideGrid: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    left: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    right: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    paper: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    textFieldGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    buttonGrid: {},
    buttonContainer: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    providersGrid: {
      marginTop: theme.spacing(5),
    },
    providerButton: {
      width: '100%',
    },
  })
);
// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  const session = await getSession(context);
  if (session && session.user?.email) {
    console.log(session);

    //Redirect uncomment later
    /* return { */
    /*   redirect: { */
    /*     permanent: false, */
    /*     destination: '/about', */
    /*   }, */
    /* }; */
  }

  return {
    props: { providers, csrfToken },
  };
}

interface IProps {
  providers: any;
  csrfToken: any;
}

export default function Register({ providers, csrfToken }: IProps) {
  const classes = useStyles();
  const [session, loading] = useSession();
  let img = ``;
  if (session?.user?.image) {
    const test = /^http.+/.test(session?.user?.image as string);
    img = test
      ? (session?.user?.image as string)
      : `${imageServerUrl}${session?.user?.image}`;
  }
  return (
    <React.Fragment>
      <RegisterHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.main} container>
            <Grid className={classes.headerGrid} item xs={12}>
              {session ? (
                <div>
                  <Avatar src={img}>
                    {session.user?.email?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h6">
                    Session exists signed as {session.user?.email}
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography variant="h6">There is no session</Typography>
                </div>
              )}
            </Grid>
            <Grid className={classes.sideGrid} item md={6}>
              <Paper className={classes.left}>
                <form method="post" action="/api/auth/callback/credentials">
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="h6">
                        Зарегестрированы? Войти.
                      </Typography>
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
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      className={classes.buttonGrid}
                      justify="flex-end"
                    >
                      <Button variant="contained" color="primary" type="submit">
                        Войти
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid className={classes.sideGrid} item md={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h6">Создать Аккаунт</Typography>
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
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        xs={12}
                        className={classes.buttonGrid}
                        justify="flex-end"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Создать Аккаунт
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid className={classes.providersGrid} item xs={12}>
                  <Paper className={classes.paper}>
                    {Object.values(providers).map((provider: any) => {
                      if (provider.name === 'Custom provider') {
                        return false;
                      }
                      return (
                        <div
                          className={classes.buttonContainer}
                          key={provider.name}
                        >
                          <Button
                            className={classes.providerButton}
                            variant="contained"
                            color="primary"
                            onClick={() => signIn(provider.id)}
                          >
                            Войти через {provider.name}
                          </Button>
                        </div>
                      );
                    })}
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
