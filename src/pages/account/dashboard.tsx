import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  Box,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
  useSession,
} from 'next-auth/client';
import Avatar from '@material-ui/core/Avatar';
import { imageServerUrl } from '~/config';
import { GetServerSidePropsContext } from 'next';
import CreateForm from '~/components/account/CreateForm';
import { useRouter } from 'next/router';
import DashboardLeftMenu from '~/components/account/DashboardLeftMenu';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
    },
    left: {
      border: '1px solid pink',
    },
    right: {
      border: '1px solid pink',
    },

    main: { paddingBottom: theme.spacing(5) },
  })
);
// This is the recommended way for Next.js 9.3 or newer
interface IProps {
  session: any;
}
export default function Dashboard({ session }: IProps) {
  const classes = useStyles();
  /* const [session, loading] = useSession(); */
  const [errorMessage, setErrorMessage] = useState('');
  //const router = useRouter();

  let img = ``;
  if (session?.user?.image) {
    const test = /^http.+/.test(session?.user?.image as string);
    img = test
      ? (session?.user?.image as string)
      : `${imageServerUrl}${session?.user?.image}`;
  }
  if (session) {
    return (
      <React.Fragment>
        <DashboardHead />
        <AnimationPage>
          <Container maxWidth="lg">
            <Grid className={classes.container} container>
              <Grid className={classes.left} item container xs={3}>
                <DashboardLeftMenu />
              </Grid>
              <Grid className={classes.right} item container xs={9}>
                <Grid className={classes.headerGrid} item xs={12} md={6}>
                  <Paper>
                    <Box>
                      <Avatar src={img}>
                        {session.user?.email?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="h6">
                        Добро пожаловать {session.user?.email}!
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Maxime tempora nostrum itaque, dolorum quas autem molestias
                  eligendi aut tenetur adipisci perferendis earum labore,
                  facilis nam velit pariatur quo. Voluptate quod labore
                  veritatis animi dicta nostrum iure possimus quae ducimus quos?
                  Aspernatur laudantium dolor dolores. Fugiat quaerat similique
                  nulla impedit vero.
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </AnimationPage>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>login first</div>
      </React.Fragment>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  /* if (session && session.user?.email) { */
  /*   //Redirect uncomment later */
  /*   return { */
  /*     redirect: { */
  /*       permanent: false, */
  /*       destination: url.account.create(), */
  /*     }, */
  /*   }; */
  /* } */
  return {
    props: { session },
  };
}

const DashboardHead = () => (
  <Head>
    <title key="title">
      Заргестрироваться в интернет магазине АНГАРА запчасти для грузовиков и
      коммерческого транспорта
    </title>
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
