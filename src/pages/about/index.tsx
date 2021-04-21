import React, { useState } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Box, Grid, Typography } from '@material-ui/core';
import SwiperProduct from '~/components/common/SwiperProduct';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import RelatedProductSlider from '~/components/common/RelatedProductSlider';
import { getPopularProductsByModel } from '~/endpoints/productEndpoint';
import { IProduct } from '~/interfaces';
import { SRLWrapper } from 'simple-react-lightbox';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(20),
    },
  })
);

interface IProps {}

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
          </Grid>
          <Grid item xs={12}>
            <SRLWrapper>
              <Box m={5} style={{ border: '1px solid pink' }}>
                <a href="/images/local/defaultParts500.jpg">
                  <Image
                    layout="intrinsic"
                    src="/images/local/defaultParts500.jpg"
                    alt="Picture of the author"
                    width={150}
                    height={100}
                    // srl_gallery_image="true" // Add this if your thumbnail is not recognized
                  />
                </a>
                <a href="/images/local/defaultParts245.jpg">
                  <Image
                    layout="intrinsic"
                    src="/images/local/defaultParts500.jpg"
                    alt="Picture of the author"
                    width={150}
                    height={100}
                    // srl_gallery_image="true" // Add this if your thumbnail is not recognized
                  />
                </a>
                <a href="/images/local/defaultParts245.jpg">
                  <Image
                    layout="intrinsic"
                    src="/images/local/defaultParts500.jpg"
                    alt="Picture of the author"
                    width={150}
                    height={100}
                    // srl_gallery_image="true" // Add this if your thumbnail is not recognized
                  />
                </a>
              </Box>
            </SRLWrapper>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}
export const getServerSideProps: any = async (context: any) => {
  return {
    props: {},
  };
};

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
