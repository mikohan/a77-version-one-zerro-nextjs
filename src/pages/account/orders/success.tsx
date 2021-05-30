import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Box, Grid, Typography, Container, Paper } from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// This is the recommended way for Next.js 9.3 or newer
export default function OrderSuccess() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <React.Fragment>
      <OrderSuccessHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.container} container></Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  })
);

const OrderSuccessHead = () => (
  <Head>
    <title key="title">Заказ ANGARA77</title>
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
