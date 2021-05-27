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
import { resetPassword } from '~/store/users/userAction';
import { useDispatch, useSelector } from 'react-redux';
import url from '~/services/url';
import { useRouter } from 'next/router';
import { getUserCookie } from '~/services/getUserCookie';
import { IUser, IState } from '~/interfaces';
import { COMPANY_INFORMATION } from '~/config';

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
    error: {
      color: theme.palette.error.main,
    },

    message: {
      color: theme.palette.success.main,
    },
  })
);
// This is the recommended way for Next.js 9.3 or newer

/* export const getServerSideProps = async ( */
/*   context: GetServerSidePropsContext */
/* ) => { */
/*   const data = await getUserCookie(context); */
/*   let access = ''; */
/*   let user = {} as IUser; */
/*   if (data) { */
/*     access = data.access; */
/*     user = data.user; */
/*   } */
/*   if (access) { */
/*     return { */
/*       redirect: { */
/*         destination: url.account.dashboard(), */
/*         permanent: false, */
/*       }, */
/*     }; */
/*   } */

/*   return { */
/*     props: { */
/*       user, */
/*       access, */
/*     }, */
/*   }; */
/* }; */

/* interface IProps { */
/*   user: IUser; */
/*   access: string; */
/* } */

export default function ResetPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const initMsg = 'Нажмите открыть';
  const [message, setMessage] = useState(initMsg);
  const messageStore = useSelector((state: IState) => state.user.message);
  const errors = useSelector((state: IState) => state.user.errors);

  const router = useRouter();
  function handleOpen() {
    setOpenForm(!openForm);
    setMessage(initMsg);
  }
  function emailIsValid(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpenForm(false);
    setShowButton(false);
    if (!emailError) {
      console.log('Submited', email);
      dispatch(resetPassword(email));
      if (messageStore) {
        setMessage(JSON.stringify(messageStore));
      } else if (errors) {
        JSON.stringify(errors);
      }
    }
  }
  async function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (emailIsValid(e.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }

  React.useEffect(() => {
    if (messageStore) {
      const success: boolean = messageStore.success || false;
      let successMsg = '';
      if (success) {
        successMsg = `На почту ${email} была отправлена ссылка для изменения пароля!`;
        setMessage(successMsg);
        setShowButton(false);
      }
    } else if (errors) {
      const detail = errors.detail || '';
      let detailMsg = '';
      if (detail) {
        detailMsg = `Упс что-то пошло не так, попробуйте еще раз! Или напишите админу ${COMPANY_INFORMATION.SHOP_EMAIL}`;
        setMessage(detailMsg);
        setShowButton(false);
      }
    }
  }, [messageStore, errors]);

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
                <Typography
                  className={errors ? classes.error : classes.message}
                  variant="body1"
                >
                  {message}
                </Typography>
                {openForm && (
                  <form
                    id="resetForm"
                    className={classes.form}
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      error={emailError}
                      type="email"
                      variant="outlined"
                      label="Email"
                      size="small"
                      fullWidth
                      onChange={handleEmail}
                    />
                    <Button
                      type="submit"
                      className={classes.buttonReset}
                      variant="contained"
                      color="secondary"
                      disabled={emailError}
                    >
                      Сбросить пароль
                    </Button>
                  </form>
                )}
                {showButton && (
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
                )}
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
