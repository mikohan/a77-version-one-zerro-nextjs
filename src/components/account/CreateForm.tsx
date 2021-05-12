import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

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
      border: '1px solid pink',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
);

export default function CreateForm() {
  const [number, setNumber] = useState(0);
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
              <span>{number}</span>
              <span>+</span>
              <span>{number}</span>
            </Box>
            <Box style={{ width: 100 }}>
              <TextField variant="outlined" size="small" />
            </Box>
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Создать Аккаунт
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
