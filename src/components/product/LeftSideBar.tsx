import React, { ReactNode } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ModelsList from './ModelsList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      border: '1px solid blue',
    },
    whiteBox: {
      padding: theme.spacing(2),
      width: '100%',
      background: '#fff',
    },
    children: {},
  })
);

interface IProps {
  children?: ReactNode;
}

export default function FiltersWidget({ children }: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container>
      <Box className={classes.whiteBox}>
        <Grid item xs={12}>
          <Typography variant="h6">Filters</Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} justify="center">
          <Box className={classes.children}>{children}</Box>
        </Grid>
      </Box>
    </Grid>
  );
}
