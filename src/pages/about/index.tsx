import React, { useState } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, imageServerUrl, SITE_DOMAIN_FULL } from '~/config';
import { IProductElasticHitsFirst } from '~/interfaces/product';
import { Box, Grid, Typography } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import SwiperProduct from '~/components/common/SwiperProduct';
import LightBox from '~/components/common/LightBox';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(20),
    },
  })
);

interface IProps {
  products: IProductElasticHitsFirst;
}

export default function About() {
  const classes = useStyles();
  const [state, setState] = useState('');
  return (
    <React.Fragment>
      <AboutHead />
      <AnimationPage>
        <Grid className={classes.main} container>
          <Grid item xs={12}>
            <Typography variant="h1">{state}</Typography>
            <Box m={5} style={{ border: '1px solid green' }}>
              <LightBox />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box m={5} style={{ border: '1px solid pink' }}>
              <SwiperProduct />
            </Box>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}

const AboutHead = () => (
  <Head>
    <title key="title">About US - History & Team | Angara Parts</title>
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
