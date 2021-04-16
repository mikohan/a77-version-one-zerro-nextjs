import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Grid, Chip, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
    },
    paperOne: {
      height: theme.spacing(20),
    },
    firstRow: {},
  })
);

const CatNumberBlock = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography className={classes.paperOne} variant="body2">
        Some content
      </Typography>
    </div>
  );
};

export default CatNumberBlock;
