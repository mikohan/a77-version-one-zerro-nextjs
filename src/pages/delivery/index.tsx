import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Hidden, Paper, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { COMPANY_INFORMATION } from '~/config';
import Image from 'next/image';
import url from '~/services/url';
import BreadCrumbs from '~/components/common/BreadCrumbs';
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
    rusImg: {
      paddingRight: theme.spacing(3),
    },
  })
);
const breadCrumbs: IBread[] = [
  { name: `${COMPANY_INFORMATION.COMPANY_NAME_ENG}`, path: '/' },
  { name: 'Доставка', path: url.delivery() },
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
              Доставка {COMPANY_INFORMATION.COMPANY_NAME}
            </Typography>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.subtitle} variant="h6">
                Доставка по Москве
              </Typography>

              <Grid container>
                <Hidden smDown>
                  <Grid item xs={6}>
                    <Image
                      src="/images/local/moscow.jpg"
                      width={558}
                      height={445}
                    />
                  </Grid>
                </Hidden>
                <Grid item sm={12} md={6}>
                  <Typography className={classes.p} variant="body1">
                    Доставка по городу - <span>290 рублей</span>. При заказе от
                    <span> 8000 рублей</span> - Доставим <span>бесплатно</span>!
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
                <Hidden smDown>
                  <Grid
                    className={classes.rusImg}
                    container
                    alignItems="center"
                    item
                    xs={6}
                  >
                    <Image
                      src="/images/local/russia.jpg"
                      width={800}
                      height={400}
                    />
                  </Grid>
                </Hidden>
                <Grid item sm={12} md={6}>
                  <Typography className={classes.p} variant="body1">
                    Первое, что Вам нужно сделать - это позвонить нам, или
                    заказать звонок, или связаться любым удобным способом. Мы
                    обсудим, какие запчасти нужны, оригинал или аналог, сколько
                    стоит и т.д.
                  </Typography>
                  <Typography className={classes.p} variant="body1">
                    Доставка до транспортной - <span> за наш счет</span>. В
                    среднем стоимость доставки во все города до Урала
                    включительно - <span>500 руб </span>
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
      <title key="title">Доставка | {COMPANY_INFORMATION.SHOP_PHONE}</title>
      <meta
        key="description"
        name="description"
        content={`Доставка компании Ангара Запчасти | ${COMPANY_INFORMATION.SHOP_PHONE}. Информация о способах и стоимости доставки по Москве и в регионы`}
      />
      <link
        rel="canonical"
        key="canonical"
        href={`${SITE_DOMAIN_FULL}${url.delivery()}`}
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

