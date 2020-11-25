import Head from 'next/head';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MainLayout from '~/layouts/Main';
import Link from 'next/link';

const useStyles = makeStyles(
  createStyles((theme: Theme) => {
    return {};
  })
);

export default function Home() {
  const classes = useStyles();
  return (
    <MainLayout>
      <Link href="/testpage">To Test Page</Link>
    </MainLayout>
  );
}
