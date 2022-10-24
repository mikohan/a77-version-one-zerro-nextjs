import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Box, Paper, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { IBread } from '~/interfaces';
import { COMPANY_INFORMATION } from '~/config';
import Link from 'next/link';
import url from '~/services/url';
import GoogleMap from '~/components/companyPages/GoogleMap';
import BreadCrumbs from '~/components/common/BreadCrumbs';

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
    breads: {
      paddingTop: theme.spacing(2),
    },
    title: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(3),
      height: '100%',
    },
    phoneBlock: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    secondCol: {
      marginLeft: theme.spacing(2),
    },
    subtitle: {
      paddingBottom: theme.spacing(2),
    },
    sideGridLeft: {
      paddingBottom: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        paddingLefg: theme.spacing(1),
      },
    },
    sideGridRight: {
      paddingBottom: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(1),
      },
    },
    deliveryLink: {
      fontSize: '0.95rem',
      color: theme.palette.primary.main,
    },
    mapGrid: {
      paddingTop: theme.spacing(2),
    },
    mapPaper: {
      padding: theme.spacing(2),
    },
    horisontalBox: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    envelop: {
      paddingTop: theme.spacing(2),
    },
  })
);

interface IProps {
  google_key: string;
}
const breadCrumbs = [
  { name: `${COMPANY_INFORMATION.COMPANY_NAME_ENG}`, path: '/' },
  { name: 'Контакты', path: url.contacts() },
];

export default function About({ google_key }: IProps) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AboutHead />
      <AnimationPage>
        <Grid className={classes.container} container>
          <Grid className={classes.breads} item xs={12}>
            <BreadCrumbs breadCrumbs={breadCrumbs} />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h1">
              Контакты компании {COMPANY_INFORMATION.COMPANY_NAME}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid className={classes.sideGridLeft} item sm={12} md={6}>
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
            <Grid className={classes.sideGridRight} item sm={12} md={6}>
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
          <Grid container item xs={12}>
            <Grid className={classes.sideGridLeft} item sm={12} md={6}>
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
            <Grid className={classes.sideGridRight} item sm={12} md={6}>
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
          <Grid className={classes.mapGrid} item xs={12}>
            <Paper className={classes.mapPaper}>
              <GoogleMap google_key={google_key} />
            </Paper>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}
export const getStaticProps: any = async (context: any) => {
  const google_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  return {
    props: {
      google_key,
    },
  };
};

const AboutHead = () => {
  const breadItems = breadCrumbs.map((bread: IBread, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: bread.name,
    item: `${SITE_DOMAIN_FULL}${bread.path}`,
  }));
  return (
    <Head>
      <title key="title">Контакты | {COMPANY_INFORMATION.COMPANY_NAME}</title>
      <meta
        key="description"
        name="description"
        content={`Контакты Ангара Запчасти| ${COMPANY_INFORMATION.SHOP_PHONE}. Информация о контактах и способах связи.`}
      />
      <link
        rel="canonical"
        key="canonical"
        href={`${SITE_DOMAIN_FULL}${url.contacts()}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadItems,
          }),
        }}
      />
    </Head>
  );
};

