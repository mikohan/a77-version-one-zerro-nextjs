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
import {
  changeCarModel,
  fetchCategories,
} from '~/store/actions/categoriesAction';
import { IMake } from '~/interfaces/IState';
import { vehiclesUrl } from '~/config';
import axios from 'axios';
import { ICar } from '~/interfaces/ICar';

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
interface CarChooseModalProps {
  currentCar?: string;
}

interface IModelState {
  models: string[];
}

export default function CarChooseModal({ currentCar }: CarChooseModalProps) {
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
    const url = 'http://localhost:8000/testcategory/models/';

    const getUrl = `${url}${event.target.value}/`;
    const res = await axios.get(getUrl);
    const models = await res.data;
    setMake(event.target.value as string);
    setModels(models);
  };

  const carMakes = useSelector((state: any) => {
    return state.cars.makes;
  });

  const dispatch = useDispatch();

  const handleModelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(changeCarModel(event.target.value as string));
  };

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        {currentCar ? currentCar : 'Выбрать машину'}
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
                  <MenuItem value="all">Все Машины</MenuItem>
                  {carMakes.map((make: IMake) => {
                    return (
                      <MenuItem key={make.slug} value={make.slug}>
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
                  id="demo-simple-select"
                  value={''}
                  onChange={handleModelChange}
                  disabled={make ? false : true}
                >
                  {models.map((model: ICar) => (
                    <MenuItem key={model.id} value={model.slug}>
                      {model.model} {model.year[0]} {model.year[1]}
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
