import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { TextField, Box, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    paper: {
      background: theme.palette.background.paper,
      border: '1px solid pink',
    },
    choiseText: {
      padding: theme.spacing(2),
    },
    textField: {
      width: '80%',
    },
    resize: {
      color: theme.palette.text.secondary,
      padding: '.4rem 14px',
      fontSize: '1.1rem',
    },
    label: {},
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const Select = () => (
    <TextField
      className={classes.textField}
      id="outlined-select-currency-native"
      select
      label="сортировать"
      SelectProps={{
        native: true,
      }}
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
      InputLabelProps={{
        classes: {
          root: classes.label,
        },
      }}
      variant="outlined"
      size="small"
      fullWidth
    >
      {[{ value: 'Value', label: 'label' }].map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );

  return (
    <Box className={classes.container}>
      <Grid container className={classes.paper}>
        <Grid container item xs={4} justify="center" alignItems="center">
          <Typography className={classes.choiseText} variant="body2">
            Поиск запчастей по автомобилю
          </Typography>
        </Grid>
        <Grid container item xs={4} justify="center" alignItems="center">
          <Select />
        </Grid>
        <Grid container item xs={4} justify="center" alignItems="center">
          <Select />
        </Grid>
      </Grid>
    </Box>
  );
}
