import React, { ReactNode } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    filtersHeader: {
      margin: '0 auto',
    },
  })
);

interface IProps {
  children?: ReactNode;
}

export default function FiltersWidget({ children }: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.filtersHeader} variant="h6">
          Filters
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}
