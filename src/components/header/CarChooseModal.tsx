/*
1. Needs to realize how to use cookies on server side
2. Save current car on choser
3. Save user id and currentCar to server endpoint
4. Make garage of cars based on user id in cookies
5. When wisiting car page suggest change car or not?
6. Split car chooser to select from garage or from all cars
7. Make JWT authorization for saving orders and so on
8. Make product selector based on car and filters
9. Make filters builder according to product properties
10.Make related product widget
11. Make analogs product widget
12. Make all categories on car page list
13. Make related category widget
14. Make blog
15. Make related post widget
16. Make main page with widgets
17. Make search widget
18. Make search logic by car or all products or category with that products

 */

import React from 'react';
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
import { getModelsByMakeUrl } from '~/config';
import { IState } from '~/interfaces/IState';
import { useCookies } from 'react-cookie';

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  const [make, setMake] = React.useState('');
  const [models, setModels] = React.useState([]);

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const getUrl = `${getModelsByMakeUrl}${event.target.value}/`;
    const res = await axios.get(getUrl);
    const models = await res.data;
    setMake(event.target.value as string);
    setModels(models);
  };

  const carMakes: string[] = useSelector((state: IState) => {
    return state.shop.makes;
  });

  // Save to local storage hook init
  const [cookie, setCookie] = useCookies(['currentCar']);

  const dispatch = useDispatch();

  const router = useRouter();

  const stateModel = useSelector((state: IState) => state.shop.currentCar.slug);

  const handleModelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    /* dispatch(changeCarModel(event.target.value as string)); */
    // Closing car selector form
    setCookie('currentCar', JSON.stringify(getModel));
    const getModel = models.find(
      (model: ICar) => model.slug === event.target.value
    );

    // Setting cookie if user select a car
    if (getModel) {
      dispatch(setCurrentCarAction(getModel));
    }
    setAnchorEl(null);
    const pushUrl = `/car/${make}/${event.target.value as string}`;
    router.push(pushUrl);
  };

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        Выбрать машину
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
                  {carMakes.map((make: string) => {
                    return (
                      <MenuItem key={make} value={make}>
                        {make.toUpperCase()}
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
                  value={stateModel}
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
