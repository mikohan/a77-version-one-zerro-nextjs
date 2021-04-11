import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CarIcon from '~/components/common/CarIcon';

import { TextField, Box, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    paper: {
      background: theme.palette.background.paper,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    choiseText: {
      padding: theme.spacing(2),
    },
    textField: {
      width: '95%',
    },
    resize: {
      color: theme.palette.text.secondary,
      padding: '.6rem 14px',
      fontSize: '1rem',
    },
    label: {},
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function SimpleSelect() {
  const classes = useStyles();
  const currentCar = useSelector((state: IState) => state.shop.currentCar);
  let carSelected = '';
  if (currentCar && currentCar.hasOwnProperty('model')) {
    carSelected = `Выбран ${currentCar.make.name.toUpperCase()} ${currentCar.model.toUpperCase()}`;
  } else {
    carSelected = `Choise your car here`;
  }
  const [age, setAge] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  interface ISelectProps {
    label: string;
    id: string;
    placeholder?: string;
    options?: string[];
  }

  const Select = ({ label, id }: ISelectProps) => (
    <TextField
      className={classes.textField}
      id={id}
      select
      label={label}
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
      {[{ value: 'Value', label: 'Default' }].map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );

  return (
    <React.Fragment>
      <Box className={classes.container}>
        <Grid container className={classes.paper}>
          <Grid container item xs={4} justify="center" alignItems="center">
            <CarIcon text={carSelected} />
          </Grid>
          <Grid container item xs={4} justify="center" alignItems="center">
            <Select id="make" label="Марка" />
          </Grid>
          <Grid container item xs={4} justify="center" alignItems="center">
            <Select id="model" label="Модель" />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
