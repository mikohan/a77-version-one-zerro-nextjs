import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCarAction } from '~/store/actions/categoriesAction';
import { ICar } from '~/interfaces/ICar';
import { cookiesAge, imageServerUrl } from '~/config';
import { IState } from '~/interfaces/IState';
import { useCookies } from 'react-cookie';
import useLocalStorage from '~/hooks/useLocalStorage';
import { IMake } from '~/interfaces';
import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { capitalize } from '~/utils';
import { shopLastCarAction } from '~/store/shop/shopActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'relative',
      minWidth: 400,
      maxWidth: 500,
      minHeight: 250,
      borderRadius: '0.25rem',
      paddingTop: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[2],
    },
    carButton: {
      fontSize: '0.85rem',
      color: theme.palette.text.secondary,
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.text.primary,
        transition: '0.2s',
      },
    },
    title: {
      paddingLeft: theme.spacing(3),
    },
    titleText: {
      color: theme.palette.text.secondary,
    },
    closeIcon: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    closeButtonContainer: {
      minHeight: theme.spacing(3),
    },
    bottomCloseButton: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    formContainer: {},
    fieldContainer: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    carsListContainer: {
      paddingBottom: theme.spacing(3),
    },
    rootList: {
      width: '100%',

      /* maxWidth: 360, */
      /* backgroundColor: theme.palette.background.paper, */
    },
    myCarsText: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(3),
    },
  })
);

export default function CarChooseModal() {
  const classes = useStyles();
  const currentCar: ICar | undefined = useSelector(
    (state: IState) => state.shop.currentCar
  );
  const initMake = Object.keys(currentCar!).length ? currentCar?.make.slug : '';
  const initModel = Object.keys(currentCar!).length ? currentCar?.slug : '';

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [makes, setMakes] = React.useState({});
  const [models, setModels] = React.useState<ICar[]>([]);
  const [selectedMake, setSelectedMake] = React.useState(initMake);
  const [selectedModel, setSelectedModel] = React.useState(initModel);
  const [localstorage, setLocalStorage] = useLocalStorage(
    'currentCar',
    undefined
  );
  useEffect(() => {
    setSelectedMake(initMake);
    setSelectedModel(initModel);
  }, [currentCar]);

  const [cookie, setCookie, removeCookie] = useCookies(['currentCar']);
  const dispatch = useDispatch();

  // Save to local storage hook init

  /* const stateModel = useSelector((state: IState) => state.shop.currentCar.slug); */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;
  const carMakes: IMake[] = useSelector((state: IState) => {
    return state.shop.makes;
  });
  let sortedMakes: IMake[] = [];

  if (carMakes) {
    sortedMakes = carMakes
      .slice()
      .sort((a: IMake, b: IMake) => (a.priority! > b.priority! ? -1 : 1));
  }

  const carModels: ICar[] = useSelector((state: IState) => state.shop.cars);

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectedMake(event.target.value);
    setMakes(sortedMakes);
    setSelectedModel('');
  };

  const handleModelChange = (event: React.ChangeEvent<{ value: any }>) => {
    const getModel = models.find(
      (model: ICar) => model.slug === event.target.value
    );

    removeCookie('currentCar');
    setCookie('currentCar', JSON.stringify(getModel), {
      path: '/',
      maxAge: cookiesAge.cookieCurrentCarMaxAge,
    });
    setLocalStorage(getModel);

    // Setting cookie if user select a car
    if (getModel) {
      dispatch(setCurrentCarAction(getModel));
    }
    setAnchorEl(null);
    setSelectedModel(event.target.value as string);
  };

  useEffect(() => {
    let sortedModels: ICar[] = [];
    if (carModels) {
      const carModelsByMake = carModels.filter(
        (model: ICar) => model.make.slug === selectedMake
      );
      sortedModels = carModelsByMake
        .slice()
        .sort((a: ICar, b: ICar) => (a.priority! > b.priority! ? -1 : 1));
    }
    setModels(sortedModels);
  }, [selectedMake]);

  function handleCloseDialog() {
    setAnchorEl(null);
  }
  // Last car stuff
  const lastCars = useSelector((state: IState) => state.shopNew.lastCars) || [];
  useEffect(() => {
    if (Array.isArray(lastCars)) {
      if (lastCars.length <= 5) {
        if (!lastCars.find((car: ICar) => car.slug === currentCar!.slug)) {
          if (Object.keys(currentCar!).length) {
            lastCars.unshift(currentCar!);
          }
        }
      } else {
        if (!lastCars.find((car: ICar) => car.slug === currentCar!.slug)) {
          if (Object.keys(currentCar!).length) {
            lastCars.pop();
            lastCars.unshift(currentCar!);
          }
        }
      }
    }
    dispatch(shopLastCarAction(lastCars));
    window.localStorage.setItem('lastCars', JSON.stringify(lastCars));
  }, [currentCar]);

  function handleQuickCurrentCar(carSlug: string) {
    const getCar = models.find((car: ICar) => car.slug === carSlug);
    dispatch(setCurrentCarAction(getCar));
  }

  return (
    <div>
      <Typography
        variant="body2"
        className={classes.carButton}
        aria-describedby={id}
        onClick={handleClick}
      >
        Выбрать машину
      </Typography>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={classes.paper}>
              <Grid className={classes.formContainer} container>
                <Grid item xs={12} className={classes.title}>
                  <Typography className={classes.titleText} variant="h6">
                    Выбрать машину
                  </Typography>
                </Grid>
                <Grid className={classes.fieldContainer} item xs={6}>
                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    size="small"
                  >
                    <InputLabel id="labelMake">Марка</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="makeLabelId"
                      value={selectedMake}
                      onChange={handleChange}
                    >
                      {sortedMakes.map((make: IMake) => {
                        return (
                          <MenuItem key={make.id} value={make.slug}>
                            {capitalize(make.name)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid className={classes.fieldContainer} item xs={6}>
                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    size="small"
                  >
                    <InputLabel id="labelModel">Модель</InputLabel>
                    <Select
                      labelId="modelLabelId"
                      id="model-select"
                      value={selectedModel ? selectedModel : ''}
                      onChange={handleModelChange}
                      disabled={selectedMake ? false : true}
                    >
                      {models.map((model: ICar) => (
                        <MenuItem key={model.id} value={model.slug}>
                          {model.model}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid className={classes.carsListContainer} item xs={12}>
                  <Typography className={classes.myCarsText} variant="body2">
                    Мои машины (быстрый выбор)
                  </Typography>
                  <List
                    component="nav"
                    className={classes.rootList}
                    aria-label="contacts"
                  >
                    {lastCars.map((car: ICar) => (
                      <ListItem
                        dense
                        selected={car.slug === currentCar?.slug}
                        key={car.id}
                        button
                        onClick={() => handleQuickCurrentCar(car.slug)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={`${capitalize(car.make.name)} ${capitalize(
                              car.model
                            )}`}
                            src={`${imageServerUrl}${car.image}`}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${capitalize(car.make.name)} ${capitalize(
                            car.model
                          )}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid className={classes.closeButtonContainer} item xs={12}>
                  <IconButton
                    className={classes.closeIcon}
                    onClick={handleCloseDialog}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Button
                className={classes.bottomCloseButton}
                onClick={handleCloseDialog}
              >
                закрыть
              </Button>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
