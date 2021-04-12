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
import { useRouter } from 'next/router';
import { cookiesAge, getModelsByMakeUrl } from '~/config';
import { IState } from '~/interfaces/IState';
import { useCookies } from 'react-cookie';
import useLocalStorage from '~/hooks/useLocalStorage';
import { firstSlug } from '~/config';
import { getVehicles } from '~/endpoints/carsEndpoint';
import { IMake } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      minWidth: 500,
      minHeight: 250,
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [makes, setMakes] = React.useState({});
  const [models, setModels] = React.useState<ICar[]>([]);
  const [selectedMake, setSelectedMake] = React.useState('');
  const [selectedModel, setSelectedModel] = React.useState('');
  const currentCar = useSelector((state: IState) => state.shop.currentCar);
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
    let sortedModels: ICar[] = [];
    if (carModels) {
      const carModelsByMake = carModels.filter(
        (model: ICar) => model.make.slug === event.target.value
      );
      sortedModels = carModelsByMake
        .slice()
        .sort((a: ICar, b: ICar) => (a.priority! > b.priority! ? -1 : 1));
    }
    setSelectedMake(event.target.value);
    setModels(sortedModels);
    setMakes(sortedMakes);
  };

  const handleModelChange = (event: React.ChangeEvent<{ value: any }>) => {
    /* dispatch(changeCarModel(event.target.value as string)); */
    // Closing car selector form
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
  console.log(selectedMake);

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        ВЫБРАТЬ МАШИНУ
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={classes.paper}>
              <FormControl className={classes.formControl}>
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
              <FormControl className={classes.formControl}>
                <InputLabel id="labelModel">Модель</InputLabel>
                <Select
                  labelId="modelLabelId"
                  id="model-select"
                  value={''}
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
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
