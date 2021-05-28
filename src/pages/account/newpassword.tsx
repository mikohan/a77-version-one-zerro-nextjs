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
  Box,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { GetServerSidePropsContext } from 'next';
import { resetPasswordConfirm } from '~/store/users/userAction';
import { useDispatch, useSelector } from 'react-redux';
import url from '~/services/url';
import { useRouter } from 'next/router';
import { IState } from '~/interfaces';
import Link from 'next/link';

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
    form: {
      marginBottom: theme.spacing(5),
      display: 'flex',
      width: theme.spacing(70),
    },
    buttonReset: {
      marginLeft: theme.spacing(2),
      minWidth: theme.spacing(30),
    },
    helpers: {
      paddingTop: theme.spacing(5),
      display: 'flex',
      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    message: {
      paddingBottom: theme.spacing(5),
      textAlign: 'center',
      color: theme.palette.success.main,
    },
    error: {
      paddingBottom: theme.spacing(5),
      textAlign: 'center',
      color: theme.palette.error.main,
    },
  })
);
// This is the recommended way for Next.js 9.3 or newer

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const req = context.query;
  const uid = req.uid;
  const token = req.token;

  if (!token || !uid) {
    return {
      redirect: {
        destination: url.account.login(),
        permanent: false,
      },
    };
  }

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
  const [showButton, setShowButton] = useState(true);

  const stateMessage = useSelector((state: IState) => state.user.message);
  const errors = useSelector((state: IState) => state.user.errors);

  const initMsg = '';
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

  React.useEffect(() => {
    if (stateMessage) {
      const success: boolean = stateMessage.success || false;
      let successMsg = '';
      if (success) {
        successMsg = `Пароль успшно изменен! Перейти на страницу входа в акаунт.`;
        setMessage(successMsg);
        setShowButton(false);
      }
    } else if (errors) {
      const detail = errors.detail || '';
      let detailMsg = '';
      if (detail) {
        detailMsg = `Ссылка не активна. Попробуйте сбросить пароль еще раз!`;
        setMessage(detailMsg);
        setShowButton(false);
      }
    }
  }, [stateMessage, errors]);

  function goLogin() {
    router.push(url.account.login());
  }
  function goReset() {
    router.push(url.account.resetPassword());
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
                {message && (
                  <Typography
                    className={errors ? classes.error : classes.message}
                    variant="body1"
                    color="secondary"
                  >
                    {message}
                  </Typography>
                )}
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
                {showButton ? (
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
                ) : (
                  <React.Fragment>
                    {errors ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={goReset}
                      >
                        Сбросить пароль еще раз
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={goLogin}
                      >
                        Войти в акаунт
                      </Button>
                    )}
                  </React.Fragment>
                )}
                <Box className={classes.helpers}>
                  <Link href={url.account.register()}>
                    <a>
                      <Typography variant="body2" color="primary">
                        Нет аккаунта? Создать.
                      </Typography>
                    </a>
                  </Link>
                  <Link href={url.account.resetPassword()}>
                    <a>
                      <Typography variant="body2" color="secondary">
                        Сбросить пароль еще раз
                      </Typography>
                    </a>
                  </Link>
                </Box>
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
