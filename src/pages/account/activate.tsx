import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import { Grid, Container, Button, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { GetServerSidePropsContext } from 'next';
import { verify } from '~/store/users/userAction';
import { useDispatch } from 'react-redux';
import url from '~/services/url';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: { paddingBottom: theme.spacing(5) },
  })
);
// This is the recommended way for Next.js 9.3 or newer

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { token } = context.query;
  return {
    props: {
      token,
    },
  };
};

interface IProps {
  token: string;
}

export default function Register({ token }: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  function handleActivate() {
    if (token) {
      dispatch(verify(token));
      router.push(url.account.login());
    } else {
      setErrorMessage('Токен не получен, попробуйте снова');
    }
  }

  return (
    <React.Fragment>
      <RegisterHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.main} container>
            {errorMessage && (
              <Grid>
                <Typography variant="h6" color="error">
                  {errorMessage}
                </Typography>
              </Grid>
            )}
            <Grid item md={12}>
              <Button variant="contained" onClick={handleActivate}>
                Активировать
              </Button>
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
