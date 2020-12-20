import React, { ReactNode } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    filtersHeader: {
      padding: theme.spacing(2),
    },
    filterHeaderDiv: {
      marginTop: theme.spacing(2),
    },
    // Filters widht when collapse
    filtersWidth: {
      width: '80%',
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
      <Grid container item xs={12} justify="center">
        <Typography className={classes.filterHeaderDiv} variant="h6">
          Filters
        </Typography>
      </Grid>
      <Grid item container xs={12} justify="center">
        <Box className={classes.filtersWidth}>{children}</Box>
      </Grid>
    </Grid>
  );
}
