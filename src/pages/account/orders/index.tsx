import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import {
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  Box,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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
import { IUser } from '~/interfaces';
import AddressesPaper from '~/components/account/AddressesPaper';
import { getUserCookie } from '~/services/getUserCookie';
import NoLoggedIn from '~/components/account/NotLoggedIn';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setAvatar } from '~/store/users/userAction';

// This is the recommended way for Next.js 9.3 or newer
interface IProps {
  user: IUser;
  access: string;
}
export default function Dashboard({ user, access }: IProps) {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  function goProfile() {
    router.push(url.account.profile());
  }
  const addresses = user.address_user;
  React.useEffect(() => {
    dispatch(setAvatar(user.image));
  }, []);

  if (access) {
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
                  <Grid className={classes.ordersGrid} item xs={12}>
                    <Paper className={classes.paper}>
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
        <NoLoggedIn />
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

  return {
    props: {
      user,
      access,
    },
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
    },
    ordersGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    orderTitle: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
  })
);

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
