/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, IconButton, Typography, Chip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import CarIcon from '@material-ui/icons/DriveEtaRounded';
import DoneIcon from '@material-ui/icons/Done';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import { capitalize } from '~/utils';
import { ICar } from '~/interfaces';
import url from '~/services/url';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      background: theme.palette.background.paper,
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    autocomlete: {
      width: '100%',
    },
    clearIcon: {
      color: theme.palette.text.disabled,
      fontSize: '90%',
      cursor: 'pointer',
    },
    input: {
      fontSize: '1.1rem',
      /* color: theme.palette.text.secondary, */
      '&::placeholder': {
        fontSize: '1rem',
      },
    },
    listbox: {
      color: theme.palette.text.secondary,
      fontSize: '1rem',
    },
  })
);

interface IOptions {
  title: string;
  year: number;
  firstLetter: string;
}

export default function Grouped() {
  const classes = useStyles();
  const initState: string[] = [];
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(initState);
  const [error, setError] = useState(false);
  const [helper, setHelper] = useState('');
  const router = useRouter();
  const currentCar: ICar | undefined = useSelector(
    (state: IState) => state.shop.currentCar
  );
  let chipLabel: string = 'Select car';
  if (currentCar && Object.keys(currentCar).length) {
    chipLabel = `${capitalize(currentCar.make.name)} ${capitalize(
      currentCar.model
    )}`;
  }

  async function handleInput(
    event: React.ChangeEvent<{}>,
    value: string
  ): Promise<void> {
    let url = '';
    if (/^\d+/.test(value)) {
      url = `http://localhost:8000/api/product/findnumber?q=${value}`;
    } else {
      url = `http://localhost:8000/api/product/autocomplete?q=${value}`;
    }
    const promise = await callAip(url);
    const opts = promise.hits.hits;
    const options: string[] = opts.map((item: any) => item._source.name);
    setOptions([...new Set(options)]);

    async function callAip(url: string) {
      const prom = await axios(url);
      return prom.data;
    }

    setInputValue(value);
    setError(false);
    setHelper('');
  }

  function handleClose(event: React.ChangeEvent<{}>) {
    setOptions(initState);
  }
  function handleSubmit() {
    if (inputValue !== '') {
      router.push({
        pathname: '/search',
        query: {
          search: inputValue,
        },
      });
    } else {
      setError(true);
      setHelper('Поле не может быть пустым');
    }
  }
  function handleEnter(event: React.KeyboardEvent<{}>) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }
  function handleClear() {
    setInputValue('');
  }
  function handleBlur() {
    setError(false);
    setHelper('');
  }
  // Redirect to car page on click
  function handleCurrentCar() {
    if (currentCar && Object.keys(currentCar).length > 0) {
      router.push({
        pathname: url.model(currentCar.make.slug, currentCar.slug),
      });
    }
  }
  const textField = (params: any) => (
    <TextField
      {...params}
      autoFocus
      margin="dense"
      placeholder="Номер или название"
      error={error}
      helperText={helper}
      label={<Typography variant="body2">По номеру или по Названию</Typography>}
      variant="outlined"
      name="search"
      onBlur={handleBlur}
      onFocus={handleBlur}
    />
  );

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.container} item xs={3}>
        <Chip
          icon={<CarIcon />}
          label={chipLabel}
          onClick={handleCurrentCar}
          clickable
          color="default"
          onDelete={handleCurrentCar}
          deleteIcon={<DoneIcon />}
          variant="outlined"
        />
      </Grid>
      <Grid className={classes.container} item xs={6}>
        <Autocomplete
          freeSolo
          filterOptions={(options, state) => options}
          onKeyUp={handleEnter}
          inputValue={inputValue}
          fullWidth
          onClose={handleClose}
          onChange={handleSubmit}
          onInputChange={handleInput}
          className={classes.autocomlete}
          id="grouped-demo"
          options={options}
          size="small"
          getOptionLabel={(option) => option}
          renderInput={(params) => textField(params)}
          classes={{ listbox: classes.listbox }}
        />
        <IconButton onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
      </Grid>
      <Grid className={classes.container} item xs={3}></Grid>
    </Grid>
  );
}
