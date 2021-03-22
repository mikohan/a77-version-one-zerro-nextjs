import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Animation from '~/components/common/AnimationPage';
import { IProductElasticHitsSecond } from '~/interfaces/product';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: '1em',
    },
    wrapper: {
      '& > div': {
        background: '#ddd',
        padding: theme.spacing(5),
      },
      '& > div:nth-child(odd)': {
        background: '#eee',
      },
      display: 'grid',
      gridTemplateColumns: '1fr 4fr',
      gridAutoRows: '100px',
      gridGap: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr 1fr',
      },
    },
  })
);

interface IProps {
  product: IProductElasticHitsSecond;
}

export default function ProductCard({ product }: IProps) {
  const classes = useStyles();

  return (
    <Animation>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div>Lorem ipsum dolor sit amet.</div>
          <div>Lorem ipsum dolor sit amet.</div>
          <div>Lorem ipsum dolor sit amet.</div>
          <div>Lorem ipsum dolor sit amet.</div>
          <div>Lorem ipsum dolor sit amet.</div>
        </div>
      </div>
    </Animation>
  );
}
