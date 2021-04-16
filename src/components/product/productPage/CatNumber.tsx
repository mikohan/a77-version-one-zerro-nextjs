import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Grid, Chip, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: theme.spacing(20),
    },
    paperOne: {
      height: theme.spacing(20),
    },
    firstRow: {
      border: '1px solid pink',
    },
  })
);

const CatNumberBlock = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper>
        <Grid container>
          <Grid className={classes.firstRow} item xs={12}>
            <Typography className={classes.paperOne} variant="body2">
              Some content
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CatNumberBlock;
