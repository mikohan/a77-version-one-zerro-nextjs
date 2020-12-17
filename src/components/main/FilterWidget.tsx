import { Grid, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

interface IProps {
  filters?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export default function FiltersWidget({ filters }: IProps) {
  const classes = useStyles();

  // Needs to get filters here probably from store Redux

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Some place for filter category</Paper>
        <Paper className={classes.paper}>
          {filters ? (
            filters.map((filter: any) => filter)
          ) : (
            <span>No filters passed out</span>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
