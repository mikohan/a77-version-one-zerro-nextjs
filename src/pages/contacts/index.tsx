import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Box, Paper, Grid, Typography, NoSsr } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { getPage } from '~/endpoints/blogEndpoint';
import { IPage } from '~/interfaces';
import { COMPANY_INFORMATION } from '~/config';
import Link from 'next/link';
import url from '~/services/url';
import GoogleMap from '~/components/companyPages/GoogleMap';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
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
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(5),
      height: '100%',
    },
    phoneBlock: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
    },
    secondCol: {
      marginLeft: theme.spacing(2),
    },
    subtitle: {
      paddingBottom: theme.spacing(2),
    },
    sideGridLeft: {
      paddingRight: theme.spacing(1),
    },
    sideGridRight: {
      paddingLeft: theme.spacing(1),
    },
    deliveryLink: {
      fontSize: '0.95rem',
      color: theme.palette.primary.main,
    },
    secondRow: {
      paddingTop: theme.spacing(2),
    },
    mapGrid: {
      paddingTop: theme.spacing(2),
    },
    mapPaper: {
      padding: theme.spacing(2),
    },
    horisontalBox: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

interface IProps {
  page: IPage;
  google_key: string;
}

export default function About({ google_key }: IProps) {
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
          <Grid container item xs={12}>
            <Grid className={classes.sideGridLeft} item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.subtitle} variant="h5">
                  Телефоны
                </Typography>
                <Typography variant="body2">
                  {COMPANY_INFORMATION.SHOP_CONTACT_TEXT}
                </Typography>
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
                <Box className={classes.phoneBlock}>
                  <Typography variant="h6">
                    {COMPANY_INFORMATION.SHOP_PHONE_THREE}
                  </Typography>
                  <Typography className={classes.secondCol} variant="body2">
                    Если не получается дозвонитсься
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid className={classes.sideGridRight} item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.subtitle} variant="h5">
                  Адрес и Доставка
                </Typography>
                <Box className={classes.phoneBlock}>
                  <Typography variant="h6">
                    {COMPANY_INFORMATION.SHOP_ADDRESS}
                  </Typography>
                </Box>
                <Box className={classes.phoneBlock}>
                  <Typography variant="h6">
                    {COMPANY_INFORMATION.SHOP_EMAIL}
                  </Typography>
                  <Typography className={classes.secondCol} variant="body2">
                    Адрес для писем
                  </Typography>
                </Box>
                <Box className={classes.phoneBlock}>
                  <Typography variant="h6">
                    Можно заказать доставку.{' '}
                  </Typography>
                  <Typography className={classes.secondCol} variant="body2">
                    <Link href={url.delivery()}>
                      <a className={classes.deliveryLink}>Подробнее...</a>
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Grid className={classes.secondRow} container item xs={12}>
            <Grid className={classes.sideGridLeft} item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.subtitle} variant="h5">
                  График работы
                </Typography>
                <Box className={classes.phoneBlock}>
                  <Typography variant="h6">
                    {COMPANY_INFORMATION.SHOP_WORKING_HOURS}
                  </Typography>
                  <Typography className={classes.secondCol} variant="body2">
                    Без выходных.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid className={classes.sideGridRight} item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.subtitle} variant="h5">
                  Реквизиты
                </Typography>
                <Box>
                  <Typography variant="h6">
                    ИНН {COMPANY_INFORMATION.RECVIZITY.INN}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    КПП {COMPANY_INFORMATION.RECVIZITY.KPP}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    БИК {COMPANY_INFORMATION.RECVIZITY.BIK}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    ОГРН {COMPANY_INFORMATION.RECVIZITY.OGRN}
                  </Typography>
                </Box>
                <Box className={classes.horisontalBox}>
                  <Typography variant="h6">
                    Номер счета {COMPANY_INFORMATION.RECVIZITY.ACC}
                  </Typography>
                  <Typography className={classes.secondCol} variant="body1">
                    "ПромСвязьБанк"
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <NoSsr>
            <Grid className={classes.mapGrid} item xs={12}>
              <Paper className={classes.mapPaper}>
                <GoogleMap google_key={google_key} />
              </Paper>
            </Grid>
          </NoSsr>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}
export const getStaticProps: any = async (context: any) => {
  const page = await getPage('kontakty');
  const google_key = process.env.GOOGLE_MAPS_KEY;

  return {
    props: {
      page,
      google_key,
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
