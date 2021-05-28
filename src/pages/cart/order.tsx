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
  TextField,
  Checkbox,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { GetServerSidePropsContext } from 'next';
import DashboardLeftMenu from '~/components/account/DashboardLeftMenu';
import url from '~/services/url';
import { useRouter } from 'next/router';
import axios from 'axios';
import { IAddress, IUser } from '~/interfaces';
import { userAddressesListUrl } from '~/config';
import { getUserCookie } from '~/services/getUserCookie';
import NoLoggedIn from '~/components/account/NotLoggedIn';

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
    formBox: {
      padding: theme.spacing(5),
      width: '100%',
    },
    title: {
      paddingBottom: theme.spacing(3),
    },
    fieldsBox: {
      maxWidth: '70%',
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    helper: {
      paddingBottom: theme.spacing(0.5),
    },
    textField: {
      background: theme.palette.action.hover,
    },
    checkboxBox: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);
// This is the recommended way for Next.js 9.3 or newer
interface IProps {
  access: string;
  addressFromServer: IAddress;
  id: string | number;
}
export default function EditAddress({}: IProps) {
  const classes = useStyles();
  const router = useRouter();
  const [address, setAddress] = useState<IAddress>({} as IAddress);
  function handleSubmit() {}
  // Disabling button if form fields are empty
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
                  <Paper className={classes.formBox}></Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  /* const id = context.params?.id; */
  /* const data = await getUserCookie(context); */

  /* let address = {} as IAddress; */
  /* let access = ''; */
  /* let user = {} as IUser; */
  /* if (data) { */
  /*   access = data.access; */
  /*   user = data.user; */
  /*   const userUrl = `${userAddressesListUrl}${id}/`; */
  /*   const config = { */
  /*     headers: { */
  /*       'Content-Type': 'application/json', */
  /*       Authorization: `Bearer ${access}`, */
  /*     }, */
  /*   }; */
  /*   const addressesPromise = await axios.get(userUrl, config); */
  /*   address = addressesPromise.data; */
  /* } */
  return {
    props: {},
  };
}

const AddressesdHead = () => (
  <Head>
    <title key="title">Редактировать Адрес</title>
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
