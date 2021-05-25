import React, { useState, useEffect } from 'react';
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
  Chip,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { GetServerSidePropsContext } from 'next';
import DashboardLeftMenu from '~/components/account/DashboardLeftMenu';
import url from '~/services/url';
import { useRouter } from 'next/router';
import axios from 'axios';
import { IAddress } from '~/interfaces';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { userAddressesListUrl } from '~/config';
import { getUserCookie } from '~/services/getUserCookie';

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
    addressGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    address: {
      height: '100%',
      minHeight: theme.spacing(30),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
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
  access: string;
  addressesFromServer: IAddress[];
}
export default function Dashboard({ addressesFromServer, access }: IProps) {
  const classes = useStyles();
  const router = useRouter();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  useEffect(() => {
    setAddresses(addressesFromServer);
  }, []);

  function addAddress() {
    router.push(url.account.addAddress());
  }

  function confirmDelete(id: number) {
    if (confirm('Удалить адрес?')) {
      async function deleteAddress(id: number) {
        const url = `${userAddressesListUrl}${id}/`;
        console.log(url);
        const config = {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        };
        try {
          await axios.delete(url, config);
        } catch (e) {
          console.error('Cannot delete user address ', e);
        }
      }
      deleteAddress(id);
      const newAddresses = addresses.filter(
        (address: IAddress) => address.id != id
      );
      setAddresses(newAddresses);
    }
  }
  function goEditAddress(id: number) {
    router.push(url.account.editAddress(id));
  }

  if (access) {
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
                    {addresses.map((address: IAddress, i: number) => (
                      <React.Fragment key={address.id}>
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
                                Адрес #{i + 1}
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
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => goEditAddress(address.id)}
                              >
                                Редактировать
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => confirmDelete(address.id)}
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
  const data = await getUserCookie(context);
  let addresses = [] as IAddress[];
  let access = '';
  if (data) {
    access = data.access;
    const user = data.user;
    const userUrl = `${userAddressesListUrl}?user=${user.id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };
    const addressesPromise = await axios.get(userUrl, config);
    addresses = addressesPromise.data;
  }
  return {
    props: { addressesFromServer: addresses, access },
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
