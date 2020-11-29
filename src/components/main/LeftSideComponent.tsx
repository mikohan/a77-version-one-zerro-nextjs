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

  const filterOptions = {
    type: 'check',
    slug: 'brand',
    name: 'Brand',
    items: [
      { slug: 'bmw', name: 'BMW name', count: 5 },

      { slug: 'fake', name: 'Fake', count: 3 },
    ],
    value: [],
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Here goes some content for side</Paper>
        <Paper className={classes.paper}>
          <FilterCheck />
        </Paper>
      </Grid>
    </Grid>
  );
}
