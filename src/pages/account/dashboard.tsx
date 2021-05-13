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
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  getProviders,
  signIn,
  signOut,
  getSession,
  getCsrfToken,
  useSession,
} from 'next-auth/client';
import Avatar from '@material-ui/core/Avatar';
import { imageServerUrl } from '~/config';
import { GetServerSidePropsContext } from 'next';
import DashboardLeftMenu from '~/components/account/DashboardLeftMenu';
import url from '~/services/url';
import { useRouter } from 'next/router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

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
    avatarGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    addressGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(2),
      },
    },
    paper: {
      height: '100%',
    },
    userPaper: {
      minHeight: theme.spacing(30),
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '& > *': {
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
      },
    },
    avatar: {
      width: 100,
      height: 100,
    },
    address: {
      height: '100%',
      minHeight: theme.spacing(30),
      padding: theme.spacing(2),
    },
    profileButton: {
      marginTop: theme.spacing(2),
    },
    ordersGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(3),
    },
    orderTitle: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
    main: { paddingBottom: theme.spacing(5) },
  })
);
// This is the recommended way for Next.js 9.3 or newer
interface IProps {
  session: any;
}
export default function Dashboard({ session }: IProps) {
  const classes = useStyles();
  const router = useRouter();
  /* const [session, loading] = useSession(); */
  const [errorMessage, setErrorMessage] = useState('');
  //const router = useRouter();

  let img = ``;
  if (session?.user?.image) {
    const test = /^http.+/.test(session?.user?.image as string);
    img = test
      ? (session?.user?.image as string)
      : `${imageServerUrl}${session?.user?.image}`;
  }

  // go Profile
  function goProfile() {
    router.push(url.account.profile());
  }

  useEffect(() => {
    async function getUser() {
      const endUrl = 'http://0.0.0.0:8000/api/user/authenticate/';
      const promise = await axios.post(endUrl, {
        username: 'angara99@gmail.com',
        password: 'manhee33338',
      });
      console.log(promise.data);
    }
    getUser();
  }, []);
  if (session) {
    return (
      <React.Fragment>
        <DashboardHead />
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
                    <Grid className={classes.avatarGrid} item xs={12} md={6}>
                      <Paper className={classes.paper}>
                        <Box className={classes.userPaper}>
                          <Avatar className={classes.avatar} src={img}>
                            {session.user?.email?.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="h6">
                            Добро пожаловать!
                          </Typography>
                          <Typography variant="body1">
                            {session.user?.email}!
                          </Typography>
                          {session.user?.username && (
                            <Typography variant="body1">
                              {session.user?.username}!
                            </Typography>
                          )}
                          <Button
                            className={classes.profileButton}
                            onClick={goProfile}
                            variant="contained"
                          >
                            Изменить профиль
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid className={classes.addressGrid} item xs={12} md={6}>
                      <Paper className={classes.address}></Paper>
                    </Grid>
                  </Grid>
                  <Grid className={classes.ordersGrid} item xs={12}>
                    <Paper>
                      <Typography className={classes.orderTitle} variant="h6">
                        Последние заказы
                      </Typography>
                      <TableContainer>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Dessert (100g serving)</TableCell>
                              <TableCell align="left">Номер</TableCell>
                              <TableCell align="left">Дата</TableCell>
                              <TableCell align="left">Статус</TableCell>
                              <TableCell align="left">Сумма</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell component="th" scope="row">
                                #123
                              </TableCell>
                              <TableCell align="left">lorem</TableCell>
                              <TableCell align="left">ipsum</TableCell>
                              <TableCell align="left">dolor</TableCell>
                              <TableCell align="left">sit</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
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
  const session = await getSession(context);
  /* if (session && session.user?.email) { */
  /*   //Redirect uncomment later */
  /*   return { */
  /*     redirect: { */
  /*       permanent: false, */
  /*       destination: url.account.create(), */
  /*     }, */
  /*   }; */
  /* } */
  return {
    props: { session },
  };
}

const DashboardHead = () => (
  <Head>
    <title key="title">Панель управления пользователя ANGARA77</title>
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