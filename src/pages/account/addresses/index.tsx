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
  Chip,
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
import { IUser, IAddress } from '~/interfaces';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ConfirmDelete from '~/components/account/ConfirmDelete';

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
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
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
    addressBox: {
      '&>*': {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
      },
    },
    chipBox: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    addressTitle: {
      paddingBottom: theme.spacing(2),
    },
    editAddressButtonBox: {
      display: 'flex',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      textAlign: 'center',
      '& > *': {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
      },
    },
    addAddress: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },

    addIcon: {
      fontSize: '5rem',
      color: theme.palette.action.selected,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    addButton: {
      position: 'absolute',
      bottom: theme.spacing(3),
    },
  })
);
// This is the recommended way for Next.js 9.3 or newer
interface IProps {
  session: any;
  addresses: IAddress[];
}
export default function Dashboard({ session, addresses }: IProps) {
  const classes = useStyles();
  const router = useRouter();

  function addAddress() {
    router.push(url.account.addAddress());
  }

  const [openDelete, setOpenDelete] = useState(false);

  function confirmDelete() {
    setOpenDelete(true);
  }
  function handleConfirm(id: number) {
    console.log('Delete item id:', id);
    setOpenDelete(false);
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
                    <Grid className={classes.addressGrid} item xs={12} md={4}>
                      <Paper className={classes.addAddress}>
                        <AddCircleOutlineIcon
                          onClick={addAddress}
                          className={classes.addIcon}
                        />
                        <Button
                          className={classes.addButton}
                          variant="contained"
                          onClick={addAddress}
                        >
                          Добавить Адрес
                        </Button>
                      </Paper>
                    </Grid>
                    {addresses.map((address: IAddress) => (
                      <React.Fragment key={address.id}>
                        <ConfirmDelete
                          openDelete={openDelete}
                          setOpenDelete={setOpenDelete}
                          handleConfirm={handleConfirm}
                          address={address}
                        />
                        <Grid
                          className={classes.addressGrid}
                          item
                          xs={12}
                          md={4}
                        >
                          <Paper className={classes.address}>
                            <Box className={classes.chipBox}>
                              <Typography
                                className={classes.addressTitle}
                                variant="h6"
                              >
                                Адрес Доставки
                              </Typography>
                              {address.default && (
                                <Chip size="small" label="Основной" />
                              )}
                            </Box>
                            <Box className={classes.addressBox}>
                              <Box>
                                <Typography variant="subtitle2">
                                  Адрес
                                </Typography>
                                <Typography variant="body1">
                                  {address?.address}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="subtitle2">
                                  Город
                                </Typography>
                                <Typography variant="body1">
                                  {address?.city}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="subtitle2">
                                  Индекс
                                </Typography>
                                <Typography variant="body1">
                                  {address?.zip_code}
                                </Typography>
                              </Box>
                            </Box>
                            <Box className={classes.editAddressButtonBox}>
                              <Button variant="contained" color="primary">
                                Редактировать
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={confirmDelete}
                              >
                                Удалить
                              </Button>
                            </Box>
                          </Paper>
                        </Grid>
                      </React.Fragment>
                    ))}
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
  let addresses = [] as IAddress[];
  if (session) {
    const userUrl = `http://0.0.0.0:8000/api/user/addresses/?user=${session?.user?.id}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${session?.user?.token}`,
      },
    };
    const addressesPromise = await axios.get(userUrl, config);
    addresses = addressesPromise.data;
    console.log(addresses);
  }
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
    props: { session, addresses },
  };
}

const AddressesdHead = () => (
  <Head>
    <title key="title">Редактировать Адреса</title>
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
