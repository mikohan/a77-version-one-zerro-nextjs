import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MainLayout from '~/layouts/Main';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListForTesting from '~/components/ListForTesting';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const links = [
    { path: 'hyundai/porter/engine', name: 'Engine' },
    { path: 'hyundai/porter/transmission', name: 'Transmission' },
  ];
  const makeLinks = [
    { path: 'hyundai', name: 'Хендай' },
    { path: 'bmw', name: 'БМВ' },
  ];
  const modelLinks = [
    { path: 'hyundai/porter-1', name: 'porter1' },
    { path: 'bmw/bmv520', name: 'bmw520' },
  ];
  return (
    <MainLayout>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ListForTesting links={links} />
          </Grid>
          <Grid item xs={4}>
            Text
            <ListForTesting links={makeLinks} />
          </Grid>
          <Grid item xs={4}>
            Text
            <ListForTesting links={modelLinks} />
          </Grid>
          <Link href="/testpage">To Test Page</Link>
        </Grid>
      </Paper>
    </MainLayout>
  );
}
