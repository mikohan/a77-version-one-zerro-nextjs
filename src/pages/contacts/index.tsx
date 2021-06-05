import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Box, Paper, Grid, Typography, Container } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { getPage } from '~/endpoints/blogEndpoint';
import { IPage } from '~/interfaces';
import { COMPANY_INFORMATION } from '~/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '0 auto',
      [theme.breakpoints.down('lg')]: {
        maxWidth: '80%',
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '70%',
      },
    },
    title: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    phoneTotalBox: {
      display: 'flex',
      flexDirection: 'column',
    },
    phoneBlock: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      border: '1px solid blue',
      display: 'flex',
      alignItems: 'center',
    },
    secondCol: {
      marginLeft: theme.spacing(2),
    },
  })
);

interface IProps {
  page: IPage;
}

export default function About() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AboutHead />
      <AnimationPage>
        <Grid className={classes.container} container>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h1">
              Контакты компании {COMPANY_INFORMATION.COMPANY_NAME}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Box className={classes.phoneTotalBox}>
                <Typography variant="h5">Телефоны</Typography>
                <Box className={classes.phoneBlock}>
                  <Typography variant="h6">
                    {COMPANY_INFORMATION.SHOP_PHONE_TWO}
                  </Typography>
                  <Typography className={classes.secondCol} variant="body2">
                    Звонок бесплатный!
                  </Typography>
                </Box>
                <Box className={classes.phoneBlock}>
                  <Typography variant="h6">
                    {COMPANY_INFORMATION.SHOP_PHONE}
                  </Typography>
                  <Typography className={classes.secondCol} variant="body2">
                    Звонки из Москвы
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}
export const getStaticProps: any = async (context: any) => {
  const page = await getPage('kontakty');

  return {
    props: {
      page,
    },
  };
};

const AboutHead = () => (
  <Head>
    <title key="title">Контакты | Angara Parts</title>
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
