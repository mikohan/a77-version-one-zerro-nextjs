import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Box, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    paper: {
      background: theme.palette.background.paper,
      border: '1px solid pink',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '80%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return (
    <Box className={classes.container}>
      <Grid container className={classes.paper}>
        <Grid container item xs={4} justify="center" alignItems="center">
          <Typography variant="h6">Select a car</Typography>
        </Grid>
        <Grid container item xs={4} justify="center">
          <FormControl
            size="small"
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel id="inputMake">Age</InputLabel>
            <Select
              labelId="makeLabel"
              id="make"
              value={age}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container item xs={4} justify="center">
          <FormControl
            size="small"
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel id="modelLabel">Age</InputLabel>
            <Select
              labelId="inputModle"
              id="model"
              value={age}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
