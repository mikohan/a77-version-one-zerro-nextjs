import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { IPage } from '~/interfaces';
import { COMPANY_INFORMATION } from '~/config';
import Image from 'next/image';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

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

interface IProps {
  page: IPage;
  google_key: string;
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
              Гарантии от компании {COMPANY_INFORMATION.COMPANY_NAME}
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

const AboutHead = () => (
  <Head>
    <title key="title">Доставка | Angara Parts</title>
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
