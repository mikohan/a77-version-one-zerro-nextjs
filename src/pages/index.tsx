// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future
// here is the plan in future

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import MainLayout from '~/layouts/Main';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListForTesting from '~/components/ListForTesting';
import { GetStaticProps } from 'next';
import { makesUrl } from '~/config';
import { IMake } from '~/interfaces/IMake';
import axios from 'axios';
import { parseCookies } from '~/helpers';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

interface IHomeProps {
  makes: IMake[];
}

export default function Home(props: IHomeProps) {
  const classes = useStyles();

  const { makes } = props;

  return (
    <MainLayout>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ListForTesting makes={makes} />
          </Grid>
          <Grid item xs={4}>
            Text
          </Grid>
          <Grid item xs={4}>
            Text
          </Grid>
          <Link href="/testpage">To Test Page</Link>
        </Grid>
      </Paper>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const promise = await axios.get(makesUrl);
  const makes: IMake[] = await promise.data;

  return { props: { makes } };
};
