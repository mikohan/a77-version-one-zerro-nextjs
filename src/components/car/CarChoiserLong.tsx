import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core';
import CarBage from '~/components/car/CarBage';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { IState } from '~/interfaces/IState';
import { IMake, ICar } from '~/interfaces';
import { setCurrentCarAction } from '~/store/actions';
import { capitalize } from '~/utils';
import useLocalStorage from '~/hooks/useLocalStorage';
import { imageServerUrl } from '~/config';

interface ISelectProps {
  label: string;
  id: string;
  placeholder?: string;
  options: IOptions[];
}
interface IOptions {
  label: string | undefined;
  value: string | undefined;
}
interface IProps {
  size: string;
}

export default function SimpleSelect({ size }: IProps) {
  let formSize: any = 'small';
  let fontSize: string = '1rem';
  let padding: string = '0.7rem 14px';
  if (size === 'sm') {
    formSize = 'small';
    fontSize = '1rem';
    padding = '0.6rem 14px';
  } else if (size === 'md') {
    formSize = 'medium';
    fontSize = '1.1rem';
    padding = '0.8rem 14px';
  } else if (size === 'lg') {
    formSize = 'small';
    fontSize = '1.1rem';
    padding = '0.7rem 14px';
  }
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        paddingBottom: theme.spacing(2),
      },
      paper: {
        background: theme.palette.background.paper,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
      },
      item: {
        marginBottom: theme.spacing(1.5),
      },
      choiseText: {
        padding: theme.spacing(2),
      },
      textField: {
        width: '95%',
      },
      resize: {
        color: theme.palette.text.secondary,
        padding: padding,
        fontSize: fontSize,
      },
      label: {},
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      option: {
        fontSize: fontSize,
        WebkitAppearance: 'none',
        MozAppearanceppearance: 'none',
        appearance: 'none',
        padding: '5px',
      },
    })
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentCar = useSelector((state: IState) => state.shop.currentCar);
  const makes = useSelector((state: IState) => state.shop.makes);
  const models = useSelector((state: IState) => state.shop.cars);
  const [localStorage, setLocalStorage] = useLocalStorage('currentCar', {});
  const theme = useTheme();
  const defImg =
    theme.palette.type === 'light'
      ? '/images/local/carsAvatar/generic2.png'
      : '/images/local/carsAvatar/generic2-white.png';

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
  let carImg = defImg;

  if (currentCar && currentCar.hasOwnProperty('model')) {
    carSelected = `Выбран ${capitalize(currentCar.make.name)} ${capitalize(
      currentCar.model
    )}`;
    // here need to set car img
  } else {
    carSelected = `Поиск по Машине`;
  }

  if (currentCar && currentCar.hasOwnProperty('image')) {
    if (currentCar.image) {
      carImg = `${imageServerUrl}${currentCar.image}`;
    } else {
      carImg = defImg;
    }
  } else {
    carImg = defImg;
  }

  const [make, setMake] = React.useState<IOptions>({
    label: '',
    value: '',
  });
  const [model, setModel] = React.useState<IOptions>({
    label: '',
    value: '',
  });

  const [modelOptions, setModelOptions] = useState<IOptions[]>([]);

  useEffect(() => {
    const initMakeName = Object.keys(currentCar!).length
      ? currentCar?.make.name
      : '';
    const initMakeSlug = Object.keys(currentCar!).length
      ? currentCar?.make.slug
      : '';
    const initModelName = Object.keys(currentCar!).length
      ? currentCar?.model
      : '';
    const initModelSlug = Object.keys(currentCar!).length
      ? currentCar?.slug
      : '';
    setMake({ label: initMakeName, value: initMakeSlug });
    setModel({ label: initModelName, value: initModelSlug });
  }, [currentCar]);

  useEffect(() => {
    let modelsByMake: ICar[] = sortedModels.filter(
      (model: ICar) => model.make.slug === make.value
    );
    const modelOpts: IOptions[] = modelsByMake.map((model: ICar) => ({
      label: model.model.toUpperCase(),
      value: model.slug,
    }));
    setModelOptions(modelOpts);
  }, [make]);

  const handleMakeChange = (event: React.ChangeEvent<{ value: any }>) => {
    setMake({ label: event.target.value as string, value: event.target.value });
  };
  const handleModelChange = (event: React.ChangeEvent<{ value: any }>) => {
    setModel({
      label: event.target.value as string,
      value: event.target.value,
    });
    const curCar = models.find((car: ICar) => car.slug === event.target.value);

    dispatch(setCurrentCarAction(curCar));
    setLocalStorage(curCar);
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
      size={formSize}
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
          {capitalize(option.label as string)}
        </option>
      ))}
    </TextField>
  );

  return (
    <React.Fragment>
      <Box className={classes.container}>
        <Grid container className={classes.paper}>
          <Grid
            className={classes.item}
            container
            item
            sm={12}
            md={4}
            justify="center"
            alignItems="center"
          >
            <CarBage size={size} text={carSelected} carImg={carImg} />
          </Grid>
          <Grid
            className={classes.item}
            container
            item
            sm={12}
            md={4}
            justify="center"
            alignItems="center"
          >
            <Select id="make" label="Марка" options={makesOptions} />
          </Grid>
          <Grid
            className={classes.item}
            container
            item
            sm={12}
            md={4}
            justify="center"
            alignItems="center"
          >
            <Select id="model" label="Модель" options={modelOptions} />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
