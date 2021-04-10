/* eslint-disable no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
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
import SearchBar from '~/components/header/SearchBar';

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
const strip = (value: string) => value.replace(/[^a-zA-Z\s0-9]/g, '');

function filterOut(text: string, cursor: number): [string, number] {
  const beforeCursor = text.slice(0, cursor);
  const afterCursor = text.slice(cursor, text.length);

  const filterdBeforeCursor = strip(beforeCursor);
  const filterAfterCursor = strip(afterCursor);

  const newText = filterdBeforeCursor + filterAfterCursor;
  const newCursor = filterdBeforeCursor.length;

  return [newText, newCursor];
}

export default function SearchBox() {
  const classes = useStyles();
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

  // Redirect to car page on click
  function handleCurrentCar() {
    if (currentCar && Object.keys(currentCar).length > 0) {
      router.push({
        pathname: url.model(currentCar.make.slug, currentCar.slug),
      });
    }
  }

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
      <Grid item xs={6}>
        <SearchBar />
      </Grid>
      <Grid className={classes.container} item xs={3}></Grid>
    </Grid>
  );
}
