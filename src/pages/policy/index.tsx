import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Box, Grid, Typography, Paper } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { getPage } from '~/endpoints/blogEndpoint';
import parse from 'html-react-parser';
import { IPage } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      margin: '0 auto',
      [theme.breakpoints.down('lg')]: {
        maxWidth: '80%',
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '70%',
      },
    },
    title: {
      paddingBottom: theme.spacing(3),
    },
    html: {
      padding: theme.spacing(2),
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
}

export default function About({ page }: IProps) {
  const classes = useStyles();
  const string = page.textHTML;
  const re = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/gi;
  const newPage = string.replace(re, SITE_DOMAIN_FULL);
  return (
    <React.Fragment>
      <AboutHead />
      <AnimationPage>
        <Grid className={classes.container} container>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h1">
              {page.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.html}>{parse(newPage)}</Paper>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}
export const getStaticProps: any = async (context: any) => {
  const page = await getPage('politika-konfidentsialnosti');

  return {
    props: {
      page,
    },
  };
};

const AboutHead = () => (
  <Head>
    <title key="title">Политика конфиденциальности | Angara Parts</title>
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
    <link rel="canonical" key="canonical" href={`${SITE_DOMAIN_FULL}/policy`} />
  </Head>
);
