import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Box, Paper, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { IPage, IBread } from '~/interfaces';
import { COMPANY_INFORMATION } from '~/config';
import url from '~/services/url';
import GoogleMap from '~/components/companyPages/GoogleMap';
import Image from 'next/image';
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
      width: '100%',
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
    leftImage: {
      textAlign: 'center',
      paddingRight: theme.spacing(1),
    },
    rightImage: {
      textAlign: 'center',
      paddingLeft: theme.spacing(1),
    },
    revTitle: {
      paddingBottom: theme.spacing(2),
    },
  })
);

// Comment for gh

interface IProps {
  page: IPage;
  google_key: string;
}
const breadCrumbs = [
  { name: `${COMPANY_INFORMATION.COMPANY_NAME_ENG}`, path: '/' },
  { name: 'Гарантии', path: url.warranty() },
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
              Гарантии от компании {COMPANY_INFORMATION.COMPANY_NAME}
            </Typography>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.subtitle} variant="h6">
                Вы всегда можете вернуть запчасть
              </Typography>
              <Typography className={classes.p} variant="body1">
                Cлучается так, что Вы заказали запчасть, а она вам не
                понадобилась.Или мастер в автосервисе ошибся и Вы купили не то,
                что нужно. Мы без проблем примем запчасть назад, у нас нет
                никаких сложных процедур возврата.
              </Typography>
              <Typography className={classes.p} variant="body1">
                Мы помним каждого клиента и все копии чеков храним у себя, так
                что достаточно позвонить и привезти запчасть. Только одна
                просьба - пожалуйста сохраните приличный вид упаковки и
                запчасти, ведь кто-то другой будет ее покупать.
              </Typography>
              <Typography className={classes.p} variant="body1">
                Для покупателей из регионов: Если вдруг мы неправильно подберем
                Вам запчасть, то оплатим транспортные расходы за свой счет!
              </Typography>
              <Typography className={classes.p} variant="body1">
                Если вы сделали онлайн оплату, то деньги возвращаются на счет с
                которого вы оплачивали в течении 24 часов. Если вы возвращаете
                запчасть которая не понадобилась, то мы возвращаем вам деньги,
                но транспортные расходы на Вас. Если вы делаете возврат по нашей
                вине(не та запчасть), то все расходы на нас.
              </Typography>
            </Paper>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.subtitle} variant="h6">
                Гарантия на запчасти
              </Typography>
              <Typography className={classes.p} variant="body1">
                Мы хорошо разбираемся в запчастях и знаем запчасти каких
                производителей лучше. Стараемся максимально точно понять
                требования клиента. Если все же появляются какие то вопросы, мы
                обязательно отправим Вам фото запчасти и ее размеры.
              </Typography>
              <Typography className={classes.p} variant="body1">
                Отправляем посылки только после того, как Вы будете уверены, что
                это Ваша запчасть! А после отправки посылки , мы отправим Вам
                номер транспортной накладной, по которой вы всегда сможете
                отследить передвижение посылки.
              </Typography>
            </Paper>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.subtitle} variant="h6">
                    Отзывы о нас
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} justify="center">
                  <Box className={classes.leftImage}>
                    <Typography className={classes.revTitle} variant="h6">
                      Гугл
                    </Typography>
                    <Image
                      src="/images/local/google_rev1.png"
                      width={759}
                      height={765}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} justify="center">
                  <Box className={classes.rightImage}>
                    <Typography className={classes.revTitle} variant="h6">
                      Яндекс
                    </Typography>
                    <Image
                      src="/images/local/yand_otzyv_1.png"
                      width={548}
                      height={731}
                    />
                  </Box>
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
export const getStaticProps: any = async () => {
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
      <title key="title">Гарантия | {COMPANY_INFORMATION.COMPANY_NAME}</title>
      <meta
        key="description"
        name="description"
        content={`Ангара Запчасти | ${COMPANY_INFORMATION.SHOP_PHONE}. Информация о Гарантии и условиях возврата.`}
      />
      <link
        rel="canonical"
        key="canonical"
        href={`${SITE_DOMAIN_FULL}${url.warranty()}`}
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

