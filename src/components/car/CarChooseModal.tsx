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
import axios from 'axios';
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
      minWidth: 300,
      minHeight: 50,
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
  const [make, setMake] = React.useState('');
  const [models, setModels] = React.useState<ICar[]>([]);
  const [localstorage, setLocalStorage] = useLocalStorage(
    'currentCar',
    undefined
  );
  const [modelState, setModelState] = React.useState<string | undefined>('');

  const [cookie, setCookie, removeCookie] = useCookies(['currentCar']);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (localstorage) {
      setModelState(localstorage.model);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const getUrl = `${getModelsByMakeUrl}${event.target.value}/`;
    const models: ICar[] = await getVehicles();
    setMake(event.target.value as string);
    setModels(models);
  };

  const carMakes: IMake[] = useSelector((state: IState) => {
    return state.shop.makes;
  });

  // Save to local storage hook init

  /* const stateModel = useSelector((state: IState) => state.shop.currentCar.slug); */

  const handleModelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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
    const pushUrl = `/${firstSlug}/${make}/${event.target.value as string}`;
    router.push(pushUrl);
    setModelState(event.target.value as string);
  };

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        ВЫБРАТЬ МОДЕЛЬ
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={classes.paper}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Марка</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={make}
                  onChange={handleChange}
                >
                  {carMakes.map((make: IMake) => {
                    return (
                      <MenuItem key={make.id} value={make.slug}>
                        {make.name.toUpperCase()}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Модель</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="model-select"
                  value={modelState}
                  onChange={handleModelChange}
                  disabled={make ? false : true}
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
