import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IProductElasticHitsSecond } from '~/interfaces/product';
import { Grid, Box, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div>Lorem ipsum dolor sit amet.</div>
        <div>Lorem ipsum dolor sit amet.</div>
        <div>Lorem ipsum dolor sit amet.</div>
        <div>Lorem ipsum dolor sit amet.</div>
        <div>Lorem ipsum dolor sit amet.</div>
      </div>
    </div>
  );
}
