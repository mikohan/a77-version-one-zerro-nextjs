import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Paper, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import BreadCrumbs from '~/components/common/BreadCrumbs';
import url from '~/services/url';
import { IBread } from '~/interfaces';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Image from 'next/image';
import { COMPANY_INFORMATION } from '~/config';

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
    revLeft: {
      paddingRight: theme.spacing(1),
    },
    revRight: {
      paddingLeft: theme.spacing(1),
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
    table: {
      minWidth: '100%',
      '& td, & th': {
        fontSize: '1rem',
      },
    },
  })
);
const breadCrumbs = [
  { name: `${COMPANY_INFORMATION.COMPANY_NAME_ENG}`, path: '/' },
  { name: 'О Компании', path: url.about() },
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
              O Компании
            </Typography>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Grid className={classes.payment} item xs={12}>
                <Typography variant="body1">
                  Находите все нужные запчасти в одном месте.
                </Typography>
                <Typography variant="body1">
                  Верните запчасти в любой момент, если взяли лишнее или если
                  запчасти не понадобились. Процедура проста - покажите чек и
                  сразу же вернем деньги.
                </Typography>
                <Typography variant="body1">
                  Покупайте только качественные запчасти, мы подскажем - на чем
                  остановить свой выбор
                </Typography>
                <Typography variant="body1">
                  Купите все необходимое для ремонта или ТО, даже если в сервисе
                  забыли о какой нибудь мелочи
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h1">
              Лучше всего о нашей компании расскажут наши клиенты:
            </Typography>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Grid className={classes.revLeft} item xs={6}>
              <Paper className={classes.paper}>
                <Image
                  src="/images/local/google_otz_new.png"
                  width={600}
                  height={833}
                  layout="responsive"
                />
              </Paper>
            </Grid>
            <Grid className={classes.revRight} item xs={6}>
              <Paper className={classes.paper}>
                <Image
                  src="/images/local/yand_otz_new.png"
                  width={600}
                  height={833}
                  layout="responsive"
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h1">
              Реквизиты
            </Typography>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Название
                    </TableCell>
                    <TableCell align="right">
                      {COMPANY_INFORMATION.RECVIZITY.NAME}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ИНН
                    </TableCell>
                    <TableCell align="right">7733607590</TableCell>
                  </TableRow>
                  {COMPANY_INFORMATION.RECVIZITY.KPP && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        КПП
                      </TableCell>
                      <TableCell align="right">773301001</TableCell>
                    </TableRow>
                  )}

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Банк
                    </TableCell>
                    <TableCell align="right">
                      ПАО "ПРОМСВЯЗЬБАНК" Г.МОСКВА
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      БИК
                    </TableCell>
                    <TableCell align="right">044525555</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ОГРН
                    </TableCell>
                    <TableCell align="right">5077746795418</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Номер счета
                    </TableCell>
                    <TableCell align="right">40702810170030424301</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Grid className={classes.payment} item xs={12}></Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h1">
              Сертификаты
            </Typography>
          </Grid>
          <Grid className={classes.row} container item xs={12}>
            <Paper className={classes.paper}>
              <Grid className={classes.payment} item xs={12}>
                <Image
                  src="/images/local/ang_sert_big.jpg"
                  layout="responsive"
                  width={900}
                  height={1200}
                />
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
      <title key="title">О Компании | {COMPANY_INFORMATION.COMPANY_NAME}</title>
      <meta
        key="description"
        name="description"
        content={`Angara 77 | ${COMPANY_INFORMATION.SHOP_PHONE} | Продажа автозапчастей для грузовых и легковых автомобилей, спецтехники, мотоциклов.`}
      />
      <link
        rel="canonical"
        key="canonical"
        href={`${SITE_DOMAIN_FULL}${url.about()}`}
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

