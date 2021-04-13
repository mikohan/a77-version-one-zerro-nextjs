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
import { cookiesAge } from '~/config';
import { IState } from '~/interfaces/IState';
import { useCookies } from 'react-cookie';
import useLocalStorage from '~/hooks/useLocalStorage';
import { IMake } from '~/interfaces';
import { Grid, Typography } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'relative',
      minWidth: 500,
      minHeight: 250,
      borderRadius: '0.25rem',
      paddingTop: theme.spacing(3),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
    },
    closeIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    formContainer: {},
    fieldContainer: {
      padding: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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

  function handleClickAway() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        ВЫБРАТЬ МАШИНУ
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className={classes.paper}>
                <Grid className={classes.formContainer} container>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Выберите машину, чтобы сузить поиск запчастей
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
                              {make.name.toUpperCase()}
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
                  <Grid item xs={12}>
                    some content
                  </Grid>
                  <Grid item xs={12}>
                    <IconButton className={classes.closeIcon}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            </ClickAwayListener>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
