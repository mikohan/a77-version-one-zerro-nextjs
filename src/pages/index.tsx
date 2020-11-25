import Head from 'next/head';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MainLayout from '~/layouts/Main';

const useStyles = makeStyles(
  createStyles((theme: Theme) => {
    return {
      root: {
        minHeight: '100vh',
        position: 'relative',
      },
      footerRoot: {
        color: 'gray',
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 200,
        minWidth: '100vw',
        backgroundColor: 'gray',
      },
    };
  })
);

export default function Home() {
  const classes = useStyles();
  return (
    <MainLayout>
      <h1>My new page here</h1>
    </MainLayout>
  );
}
