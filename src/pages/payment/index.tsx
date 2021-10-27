import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL, COMPANY_INFORMATION } from '~/config';
import { Paper, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import BreadCrumbs from '~/components/common/BreadCrumbs';
import url from '~/services/url';
import { IBread } from '~/interfaces';

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
      padding: theme.spacing(5),
      height: '100%',
      width: '100%',
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
    row: {
      paddingBottom: theme.spacing(2),
    },
    subtitle: {
      paddingBottom: theme.spacing(2),
    },
    p: {
      paddingBottom: theme.spacing(2),
      '&>span': {
        fontWeight: 700,
      },
    },
    payment: {
      display: 'flex',
      flexDirection: 'column',
    },
    item: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
);
const breadCrumbs = [
  { name: `${COMPANY_INFORMATION.COMPANY_NAME_ENG}`, path: '/' },
  { name: 'Оплата', path: url.payment() },
];

export default function About() {
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
              Способы оплаты
            </Typography>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.subtitle} variant="h6">
                Оплата
              </Typography>
              <Grid className={classes.payment} item xs={12}>
                <Typography className={classes.item} variant="body1">
                  Наличными в кассе магазина
                </Typography>
                <Typography className={classes.item} variant="body1">
                  Банковской картой VISA, MASTERCARD, МИР, или MAESTRO
                </Typography>
                <Typography className={classes.item} variant="body1">
                  Через Сбербанк Онлайн
                </Typography>
                <Typography className={classes.item} variant="body1">
                  Банковским переводом
                </Typography>
                <Typography className={classes.item} variant="body1">
                  На сайте через Яндекс Кассу
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.subtitle} variant="h6">
                Как оплатить товар из регионов?
              </Typography>
              <Grid className={classes.payment} item xs={12}>
                <Typography className={classes.item} variant="body1">
                  Первое, что Вам нужно сделать - это позвонить нам, заказать
                  звонок, или связаться любым удобным способом. Мы обсудим,
                  какие запчасти нужны, оригинал или аналог, сколько стоит и
                  т.д.
                </Typography>
                <Typography className={classes.item} variant="body1">
                  Дальше мы отправим Вам на емайл счет, который можно оплатить в
                  любом банке. Банк даст квитанцию, подтверждение оплаты.
                </Typography>
                <Typography className={classes.item} variant="body1">
                  После того как оплатили счет, звоните нам и мы отправляем вам
                  запчасти. Подробнее о работе с транспортными компаниями вы
                  можете узнать в разделе
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}

const AboutHead = () => {
  const breadItems = breadCrumbs.map((bread: IBread, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: bread.name,
    item: `${SITE_DOMAIN_FULL}${bread.path}`,
  }));
  return (
    <Head>
      <title key="title">Оплата | {COMPANY_INFORMATION.COMPANY_NAME}</title>
      <meta
        key="description"
        name="description"
        content={`Способы оплаты Ангара Запчасти | ${COMPANY_INFORMATION.SHOP_PHONE}. Информация о способах оплаты.`}
      />
      <link
        rel="canonical"
        key="canonical"
        href={`${SITE_DOMAIN_FULL}${url.payment()}`}
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

