import React, { useState } from 'react';
import Head from 'next/head';
import AnimationPage from '~/components/common/AnimationPage';
import { footerData, SITE_DOMAIN_FULL } from '~/config';
import {
  Grid,
  Container,
  Button,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { GetServerSidePropsContext } from 'next';
import { resetPasswordConfirm } from '~/store/users/userAction';
import { useDispatch, useSelector } from 'react-redux';
import url from '~/services/url';
import { useRouter } from 'next/router';
import { getUserCookie } from '~/services/getUserCookie';
import { IState, IUser } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: { paddingBottom: theme.spacing(5), paddingTop: theme.spacing(5) },
    paper: {
      padding: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '40vh',
    },
    typography: {
      paddingBottom: theme.spacing(5),
      color: theme.palette.success.main,
    },
    typogBott: {
      paddingBottom: theme.spacing(5),
      textAlign: 'center',
    },
    form: {
      marginBottom: theme.spacing(5),
      display: 'flex',
      width: theme.spacing(70),
    },
    buttonReset: {
      marginLeft: theme.spacing(2),
      minWidth: theme.spacing(30),
    },
  })
);
// This is the recommended way for Next.js 9.3 or newer

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const req = context.query;
  console.log(req);
  const uid = req.uid;
  const token = req.token;

  /* if (access) { */
  /*   return { */
  /*     redirect: { */
  /*       destination: url.account.dashboard(), */
  /*       permanent: false, */
  /*     }, */
  /*   }; */
  /* } */

  return {
    props: {
      uid,
      token,
    },
  };
};

interface IProps {
  token: string;
  uid: string;
}

export default function ResetPassword({ uid, token }: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(true);
  const stateMessage = useSelector((state: IState) => state.user.message);
  const errors = useSelector((state: IState) => state.user.errors);
  console.log(stateMessage);
  console.log(errors);

  const initMsg =
    'Откройте пожалуйста форму и введите ваш Email, после этого на почту приедет ссылка для сброса пароля.';
  const [message, setMessage] = useState(initMsg);

  const router = useRouter();
  function handleOpen() {
    setOpenForm(!openForm);
    setMessage(initMsg);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpenForm(false);
    if (!passwordError) {
      dispatch(resetPasswordConfirm(uid, token, password));
    }
  }
  async function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    if (e.target.value.length > 6) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  return (
    <React.Fragment>
      <RegisterHead />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.main} container>
            <Grid item md={12}>
              <Paper className={classes.paper}>
                <Typography className={classes.typography} variant="h6">
                  Сброс пароля
                </Typography>
                <Typography className={classes.typogBott} variant="body1">
                  {message}
                </Typography>
                {openForm && (
                  <form
                    id="resetForm"
                    className={classes.form}
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      error={passwordError}
                      type="password"
                      variant="outlined"
                      label="Новый Пароль"
                      size="small"
                      fullWidth
                      onChange={handleEmail}
                      helperText="Пароль должен быть длинее 6 знаков!"
                    />
                    <Button
                      type="submit"
                      className={classes.buttonReset}
                      variant="contained"
                      color="secondary"
                      disabled={passwordError}
                    >
                      Сбросить пароль
                    </Button>
                  </form>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  {openForm ? (
                    <span>Закрыть форму</span>
                  ) : (
                    <span>Открыть форму</span>
                  )}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

const RegisterHead = () => (
  <Head>
    <title key="title">Сброс пароля</title>
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
