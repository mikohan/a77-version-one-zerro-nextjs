import { Grid, Paper } from '@material-ui/core';

export default function LeftSideComponent() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>Here goes some content for side</Paper>
      </Grid>
    </Grid>
  );
}
