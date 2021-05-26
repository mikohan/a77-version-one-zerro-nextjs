import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { GetServerSidePropsContext } from 'next';
import CreateForm from '~/components/account/CreateForm';
import url from '~/services/url';
import { IUser } from '~/interfaces';
import { getUserCookie } from '~/services/getUserCookie';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: { paddingBottom: theme.spacing(5), paddingTop: theme.spacing(5) },
    sideGrid: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    paper: {
      minHeight: '50vh',
      minWidth: '100%',
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
    box: {
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);
// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await getUserCookie(context);
  let access = '';
  if (data) {
    access = data.access;
  }
  // Uncomment later

  if (access) {
    //Redirect uncomment later
    return {
      redirect: {
        permanent: false,
        destination: url.account.dashboard(),
      },
    };
  }

  return {
    props: {},
  };
}

export default function Register() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <RegisterHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.main} container justify="center">
            <Grid className={classes.sideGrid} item container xs={8}>
              <Paper className={classes.paper}>
                <Box className={classes.box}>
                  <Typography variant="h4" color="secondary" align="center">
                    Аккаунт не активирован!
                  </Typography>
                  <Typography variant="body1" color="inherit">
                    Проверьте почту, и перейдите по ссылке для активации
                    аккаунта.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6">Что можно сделать:</Typography>
                <Box className={classes.buttonBox}>
                  <Button variant="contained" color="primary">
                    Перейти на главную
                  </Button>
                  <Button variant="contained" color="primary">
                    Войти в Аккаунт
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

const RegisterHead = () => (
  <Head>
    <title key="title">Активировать Аккаунт АНГАРА</title>
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
