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
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
  useSession,
} from 'next-auth/client';
import Avatar from '@material-ui/core/Avatar';
import { imageServerUrl } from '~/config';
import { GetServerSidePropsContext } from 'next';
import CreateForm from '~/components/account/CreateForm';
import { useRouter } from 'next/router';

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
    buttonContainer: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    providersGrid: {
      marginTop: theme.spacing(5),
    },
    buttonGrid: {
      '&>*': {
        marginBottom: theme.spacing(2),
      },
    },
    providerButton: {
      width: '100%',
    },
  })
);
// This is the recommended way for Next.js 9.3 or newer
export default function Register() {
  const classes = useStyles();
  const [session, loading] = useSession();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  let img = ``;
  if (session?.user?.image) {
    const test = /^http.+/.test(session?.user?.image as string);
    img = test
      ? (session?.user?.image as string)
      : `${imageServerUrl}${session?.user?.image}`;
  }
  return (
    <React.Fragment>
      <DashboardHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.main} container>
            <Grid className={classes.headerGrid} item xs={12}>
              {session ? (
                <Grid container>
                  <Grid item xs={4}>
                    <Avatar src={img}>
                      {session.user?.email?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6">
                      Добро пожаловать {session.user?.email}!
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <div>
                  {errorMessage && (
                    <Typography variant="h6" color="secondary">
                      {errorMessage}
                    </Typography>
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

const DashboardHead = () => (
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
