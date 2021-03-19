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
    media: {
      marginTop: theme.spacing(2),
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardGrid: {
      padding: theme.spacing(1),
    },
    gridPaper: {
      padding: theme.spacing(5),
    },
    gridItem: {
      border: '1px solid grey',
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
      <Grid container direction="column">
        <Grid container spacing={0}>
          <Grid item xs className={classes.gridItem}>
            <Paper className={classes.gridPaper}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
              alias!
            </Paper>
          </Grid>
          <Grid item xs className={classes.gridItem}>
            <Paper className={classes.gridPaper}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
              alias!
            </Paper>
          </Grid>
          <Grid item xs className={classes.gridItem}>
            <Paper className={classes.gridPaper}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
              alias!
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs style={{ marginTop: '1em' }}>
          <Paper className={classes.gridPaper}>
            Lorem ipsum dolor sit amet.
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
