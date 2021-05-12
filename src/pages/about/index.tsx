import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, imageServerUrl, SITE_DOMAIN_FULL } from '~/config';
import { Button, Box, Grid, Typography, Container } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { getPage } from '~/endpoints/blogEndpoint';
import { IPage } from '~/interfaces';
import { getLatestProducts } from '~/endpoints/productEndpoint';
import { translateProducts } from '~/utils';
import { IProduct } from '~/interfaces';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import Avatar from '@material-ui/core/Avatar';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(2),
    },
    html: {
      '& p, & span': {
        fontSize: '1rem',
      },
      '& h2, & h3, & h4': {
        fontSize: '1.4rem',
      },
      '& li, & ol': {
        fontSize: '1.1rem',
        fontWeight: 'bold',
      },
    },
  })
);

interface IProps {
  page: IPage;
  products: IProduct[];
}

export default function About({ page, products }: IProps) {
  const classes = useStyles();
  const [session, loading] = useSession();
  return (
    <React.Fragment>
      <AboutHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.main} container>
            <Grid item xs={12}>
              <Typography variant="h1">{page.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              {session ? (
                <div>
                  <Avatar>
                    <Image
                      src={`${imageServerUrl}${session.user?.image}`}
                      width={50}
                      height={50}
                    />
                  </Avatar>
                  <Typography variant="h6">
                    Session exists signed as {session.user?.email}
                  </Typography>
                  <Button onClick={() => signOut()} variant="outlined">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div>
                  <Typography variant="h6">There is no session</Typography>
                  <Button variant="outlined" onClick={() => signIn()}>
                    Sigh In
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}
export const getStaticProps: any = async (context: any) => {
  const page = await getPage('politika-konfidentsialnosti');
  const prods = await getLatestProducts(20);
  const products = translateProducts(prods.hits.hits);

  return {
    props: {
      page,
      products,
    },
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
