import React from 'react';
import { useRouter } from 'next/router';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import url from '~/services/url';
import DashboardLeftMenu from '~/components/account/DashboardLeftMenu';
import AnimationPage from '~/components/common/AnimationPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    left: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    right: {
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(2),
      },
    },
    root: {
      padding: theme.spacing(10),
    },
    buttons: {
      marginTop: theme.spacing(10),
      display: 'flex',
      justifyContent: 'center',
      '&> *': {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
    addressGrid: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(2),
      },
    },
    paper: {
      height: '100%',
    },
  })
);

export default function NoLoggedIn() {
  const classes = useStyles();
  const router = useRouter();
  function login() {
    router.push(url.account.login());
  }
  function register() {
    router.push(url.account.register());
  }

  return (
    <React.Fragment>
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid className={classes.container} container>
            <Grid className={classes.left} item container xs={12} sm={3}>
              <Grid container>
                <Grid item xs={12}>
                  <DashboardLeftMenu />
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.right} item container xs={12} sm={9}>
              <Grid container>
                <Grid item container xs={12}>
                  <Grid className={classes.addressGrid} item xs={12}>
                    <Paper className={classes.root}>
                      <Typography variant="h3" align="center">
                        Для просмотра страницы нужно авторизоваться
                      </Typography>
                      <Box className={classes.buttons}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={login}
                        >
                          Войти
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={register}
                        >
                          Создать акаунт
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}
