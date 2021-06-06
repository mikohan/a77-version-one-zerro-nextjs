import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Box, Paper, Grid, Typography, NoSsr } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { IPage } from '~/interfaces';
import { COMPANY_INFORMATION } from '~/config';
import Link from 'next/link';
import url from '~/services/url';
import GoogleMap from '~/components/companyPages/GoogleMap';
import Image from 'next/image';

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
              Гарантии от компании {COMPANY_INFORMATION.COMPANY_NAME}
            </Typography>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.subtitle} variant="h6">
                Доставка по Москве
              </Typography>

              <Grid container>
                <Grid item xs={6}>
                  lorem
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.p} variant="body1">
                    Доставка по городу - 290 рублей. При заказе от 8000 рублей -
                    Доставим бесплатно!
                  </Typography>
                  <Typography className={classes.p} variant="body1">
                    При возможности доставим в этот же день! В ином случае - на
                    следующий день Можем сделать срочную доставку курьерским
                    сервисом прямо до дверей.
                  </Typography>
                  <Typography className={classes.p} variant="body1">
                    Позвоните или закажите звонок чтобы узнать точное время
                    доставки
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.subtitle} variant="h6">
                Доставка по России
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  lorem
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.p} variant="body1">
                    Первое, что Вам нужно сделать - это позвонить нам, или
                    заказать звонок, или связаться любым удобным способом. Мы
                    обсудим, какие запчасти нужны, оригинал или аналог, сколько
                    стоит и т.д.
                  </Typography>
                  <Typography className={classes.p} variant="body1">
                    Доставка до транспортной - за наш счет. В среднем стоимость
                    доставки во все города до Урала включительно - 500 руб
                    Стоимость обрешетки - от 300 руб. Иногда нужна обрешетка,
                    например при отправке стекол. Это за счет клиента
                  </Typography>
                  <Typography className={classes.p} variant="body1">
                    Скорость - 500 км / один день. Например в Ростов на Дону
                    запчасти придут через два дня.
                  </Typography>
                  <Typography className={classes.p} variant="body1">
                    Вы можете выбрать любую транспортную на Ваш вкус. Наши
                    водители предпочитают "Деловые линии", там больше порядка.
                    Когда груз придет в Ваш город, Вам позвонят из транспортной
                    компании, или отправят sms. Скажут где и когда можно забрать
                    запчасти Вы забираете запчасти, ремонтируете Ваш автомобиль
                    и зарабатываете деньги.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.subtitle} variant="h6">
                Отзывы о нас
              </Typography>
              <Grid container item xs={12}>
                <Grid item xs={12} md={6}>
                  <Image
                    src="/images/local/google_rev1.png"
                    width={759}
                    height={765}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Image
                    src="/images/local/yand_otzyv_1.png"
                    width={548}
                    height={731}
                  />
                </Grid>
              </Grid>
            </Paper>
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
  const google_key = process.env.GOOGLE_MAPS_KEY;

  return {
    props: {
      google_key,
    },
  };
};

const AboutHead = () => (
  <Head>
    <title key="title">Гарантия | Angara Parts</title>
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
