import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CarBage from '~/components/car/CarBage';

import { TextField, Box, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { IMake, ICar } from '~/interfaces';
import { setCurrentCarAction } from '~/store/actions';

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
      fontSize: '0.9rem',
    },
    label: {},
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    option: {
      fontSize: '0.9rem',
    },
  })
);

interface ISelectProps {
  label: string;
  id: string;
  placeholder?: string;
  options: IOptions[];
}
interface IOptions {
  label: string;
  value: string;
}

export default function SimpleSelect() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentCar = useSelector((state: IState) => state.shop.currentCar);
  const makes = useSelector((state: IState) => state.shop.makes);
  const models = useSelector((state: IState) => state.shop.cars);

  const sortedMakes = makes
    .slice()
    .sort((a: IMake, b: IMake) => (a.priority! > b.priority! ? -1 : 1));
  const sortedModels = models
    .slice()
    .sort((a: ICar, b: ICar) => (a.priority! > b.priority! ? -1 : 1));

  let makesOptions: IOptions[] = [];

  if (makes && Object.keys(makes).length > 0) {
    makesOptions = sortedMakes.map((make: IMake) => ({
      label: make.name,
      value: make.slug,
    }));
  }

  let carSelected = '';
  let carImg = '/images/local/carsAvatar/generic.png';

  if (currentCar && currentCar.hasOwnProperty('model')) {
    carSelected = `Выбран ${currentCar.make.name.toUpperCase()} ${currentCar.model.toUpperCase()}`;
    // here need to set car img
    carImg = '/images/local/carsAvatar/hd-78.png';
  } else {
    carSelected = `Поиск запчастей по Вашей Машине`;
    carImg = '/images/local/carsAvatar/generic.png';
  }
  const [make, setMake] = React.useState<IOptions>({
    label: 'Choise make',
    value: 'make',
  });
  const [model, setModel] = React.useState<IOptions>({
    label: 'Choise model',
    value: 'model',
  });
  const [modelOptions, setModelOptions] = useState<IOptions[]>([]);

  const handleMakeChange = (event: React.ChangeEvent<{ value: any }>) => {
    setMake({ label: event.target.value as string, value: event.target.value });
    let modelsByMake: ICar[] = sortedModels.filter(
      (model: ICar) => model.make.slug === event.target.value
    );
    const modelOpts: IOptions[] = modelsByMake.map((model: ICar) => ({
      label: model.model.toUpperCase(),
      value: model.slug,
    }));
    setModelOptions(modelOpts);
  };
  const handleModelChange = (event: React.ChangeEvent<{ value: any }>) => {
    setModel({
      label: event.target.value as string,
      value: event.target.value,
    });
    const curCar = models.find((car: ICar) => car.slug === event.target.value);

    dispatch(setCurrentCarAction(curCar));
  };

  const Select = ({ label, id, options }: ISelectProps) => (
    <TextField
      onChange={id === 'make' ? handleMakeChange : handleModelChange}
      value={id === 'make' ? make.value : model.value}
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
      {id === 'make' ? (
        <option
          className={classes.option}
          key={'defalultMake'}
          value="defalutMake"
        >
          Выбрать Марку
        </option>
      ) : (
        <option
          className={classes.option}
          key={'defalultModel'}
          value="defalutModel"
        >
          Выбрать Модель
        </option>
      )}
      {options.map((option) => (
        <option
          className={classes.option}
          key={option.value}
          value={option.value}
        >
          {option.label.toUpperCase()}
        </option>
      ))}
    </TextField>
  );

  return (
    <React.Fragment>
      <Box className={classes.container}>
        <Grid container className={classes.paper}>
          <Grid container item xs={4} justify="center" alignItems="center">
            <CarBage text={carSelected} carImg={carImg} />
          </Grid>
          <Grid container item xs={4} justify="center" alignItems="center">
            <Select id="make" label="Марка" options={makesOptions} />
          </Grid>
          <Grid container item xs={4} justify="center" alignItems="center">
            <Select id="model" label="Модель" options={modelOptions} />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
