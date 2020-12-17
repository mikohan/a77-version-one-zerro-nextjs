import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
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
        FilterComponent goes here
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}
