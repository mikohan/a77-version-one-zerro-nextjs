import Head from 'next/head';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MainLayout from '~/layouts/Main';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    h3: {
      color: 'red',
    },
  })
);

export default function Home() {
  const classes = useStyles();
  return (
    <MainLayout>
      <Paper className={classes.paper}>
        <Link href="/testpage">To Test Page</Link>
        <h3>Some content</h3>
      </Paper>
    </MainLayout>
  );
}
