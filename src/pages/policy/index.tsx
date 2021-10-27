import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { COMPANY_INFORMATION, SITE_DOMAIN_FULL } from '~/config';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { getPage } from '~/endpoints/blogEndpoint';
import parse from 'html-react-parser';
import { IPage, IBread } from '~/interfaces';
import url from '~/services/url';
import BreadCrumbs from '~/components/common/BreadCrumbs';

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
      padding: theme.spacing(5),
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
const breadCrumbs = [
  { name: `${COMPANY_INFORMATION.COMPANY_NAME_ENG}`, path: '/' },
  { name: 'Политика конфидециальности', path: url.policy() },
];

export default function About({ page }: IProps) {
  const classes = useStyles();
  const string = page.textHTML;
  const re = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/gi;
  const reCompany = /ООО/giu;
  const reCompanyName = /Ангара/gi;

  const newPage = string.replace(re, SITE_DOMAIN_FULL);
  let newPage2 = newPage.replace(reCompany, '');
  newPage2 = newPage2.replace(
    reCompanyName,
    COMPANY_INFORMATION.RECVIZITY.NAME
  );

  return (
    <React.Fragment>
      <AboutHead />
      <AnimationPage>
        <Grid className={classes.container} container>
          <Grid item xs={12}>
            <BreadCrumbs breadCrumbs={breadCrumbs} />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h1">
              {page.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.html}>{parse(newPage2)}</Paper>
          </Grid>
        </Grid>
      </AnimationPage>
    </React.Fragment>
  );
}
export const getStaticProps: any = async () => {
  const page = await getPage('politika-konfidentsialnosti');

  return {
    props: {
      page,
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
      <title key="title">
        Политика конфиденциальности | {COMPANY_INFORMATION.COMPANY_NAME}
      </title>
      <meta
        key="description"
        name="description"
        content={`Политика конфиденциальности компании Ангара Запчасти | ${COMPANY_INFORMATION.SHOP_PHONE}`}
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

