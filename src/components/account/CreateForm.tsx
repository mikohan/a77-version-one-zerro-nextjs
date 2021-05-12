import React, { useRef, useState } from 'react';
import {
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    textFieldGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    buttonGrid: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& > *': {
        marginBottom: theme.spacing(2),
      },
    },
    capcha: {
      minWidth: theme.spacing(30),
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    bg: {
      padding: theme.spacing(0.5),
      backgroundColor: '#e5e5f7',
      opacity: 0.7,
      backgroundImage: `repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 17px ), repeating-linear-gradient( #444cf755, #444cf7 )`,
    },
  })
);

export default function CreateForm() {
  const [number1, setNumber1] = useState(Math.ceil(Math.random() * 10));
  const [number2, setNumber2] = useState(Math.ceil(Math.random() * 10));
  const [active, setActive] = useState(false);

  function handleRefresh() {
    setNumber1(Math.ceil(Math.random() * 10));
    setNumber2(Math.ceil(Math.random() * 10));
  }

  function handleCaptcha(event: React.ChangeEvent<HTMLInputElement>) {
    const res = number1 + number2;
    if (res === +event.target.value) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Создать Аккаунт</Typography>
        </Grid>
        <Grid
          className={classes.textFieldGrid}
          item
          xs={12}
          container
          justify="center"
        >
          <TextField
            required
            name="username"
            label="Email"
            type="email"
            helperText="Ваш Емайл"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid
          className={classes.textFieldGrid}
          item
          container
          xs={12}
          justify="center"
        >
          <TextField
            required
            name="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            helperText="Ваш Пароль"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item container xs={12} className={classes.buttonGrid}>
          <Box className={classes.capcha}>
            <Box>
              <CachedIcon onClick={handleRefresh} />
            </Box>
            <Box className={classes.bg}>
              <Typography variant="h6" component="span">
                {number1}
              </Typography>
              <Typography variant="h6" component="span">
                {' '}
                +{' '}
              </Typography>
              <Typography variant="h5" component="span">
                {number2}
              </Typography>
            </Box>
            <Box style={{ width: 100 }}>
              <TextField
                variant="outlined"
                size="small"
                onChange={handleCaptcha}
                label={<Typography variant="body2">результат</Typography>}
              />
            </Box>
          </Box>
          <Button
            disabled={!active}
            variant="contained"
            color="primary"
            type="submit"
          >
            Создать Аккаунт
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
