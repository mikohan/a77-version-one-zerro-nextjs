import { Grid, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import FilterCheck from '~/components/filters/FilterCheck';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export default function LeftSideComponent() {
  const classes = useStyles();

  const filterItems = ['brand one', 'bmw', 'stelox', 'other brand'];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Here goes some content for side</Paper>
        <Paper className={classes.paper}>
          <FilterCheck options={filterItems} />
        </Paper>
      </Grid>
    </Grid>
  );
}
