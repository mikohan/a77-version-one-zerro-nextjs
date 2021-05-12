import React from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Button, Box, Grid, Typography, Container } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { getPage } from '~/endpoints/blogEndpoint';
import { IPage } from '~/interfaces';
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
  useSession,
} from 'next-auth/client';
import Avatar from '@material-ui/core/Avatar';
import Image from 'next/image';
import { imageServerUrl } from '~/config';
import { GetServerSidePropsContext } from 'next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(2),
    },
    html: {
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
// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}

interface IProps {
  providers: any;
  csrfToken: any;
}

export default function Register({ providers, csrfToken }: IProps) {
  const classes = useStyles();
  const [session, loading] = useSession();
  return (
    <React.Fragment>
      <RegisterHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.main} container>
            <Grid className={classes.left} item md={6}>
              <form method="post" action="/api/auth/callback/credentials">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <label>
                  Username
                  <input name="username" type="text" />
                </label>
                <label>
                  Password
                  <input name="password" type="password" />
                </label>
                <button type="submit">Sign in</button>
              </form>
            </Grid>
            <Grid item md={6}>
              <>
                {Object.values(providers).map((provider: any) => (
                  <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))}
              </>
            </Grid>
            <Grid item xs={12}>
              {session ? (
                <div>
                  <Avatar>
                    {session.user?.image ? (
                      <Image
                        src={`${imageServerUrl}${session.user?.image}`}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <div>{session.user?.email?.charAt(0).toUpperCase()}</div>
                    )}
                  </Avatar>
                  <Typography variant="h6">
                    Session exists signed as {session.user?.email}
                  </Typography>
                  <Button variant="outlined">Sign Out</Button>
                </div>
              ) : (
                <div>
                  <Typography variant="h6">There is no session</Typography>
                  <Button variant="outlined" onClick={() => signIn()}>
                    Sigh In
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

const RegisterHead = () => (
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
