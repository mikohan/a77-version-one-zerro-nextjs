import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ComplexGrid() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      card: {
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(1),
        },
        padding: theme.spacing(3),
        position: 'relative',
        display: 'grid',

        [theme.breakpoints.down('sm')]: {
          gridTemplateColumns: `repeat(auto-fill, minmax(215px, 1fr))`,
          /* gridAutoRows: `minmax(50px, 100px)`, */
          justifyContent: 'center',
        },
        [theme.breakpoints.up('sm')]: {
          gridTemplateColumns: `1fr 2fr 1fr`,
          /* gridAutoRows: `minmax(150px, 200px)`, */
        },
        boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
        borderRadius: '2px',
        background: 'white',
        transition: '0.5s',
        '&:hover $shoppingCartIcon': {
          transform: `scale(1.1)`,
          color: theme.palette.primary.dark,
          cursor: 'pointer',
        },
      },
      cardImageLink: {
        position: 'relative',
        maxHeight: '100%',
        display: 'flex',
        alignItems: 'center',
      },
      productName: {
        [theme.breakpoints.down('sm')]: {
          fontSize: '1rem',
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.1rem',
        },
        color: theme.palette.grey[700],
      },
      cardImage: {
        minHeight: '10rem',
        maxWidth: '100%',
        height: 'auto',
        [theme.breakpoints.up('sm')]: {
          maxHeight: '200px',
        },
        [theme.breakpoints.down('sm')]: {
          maxWidth: '100%',
          height: 'auto',
        },
        /* border: '2px solid red', */
        objectFit: 'contain', // contain maki it small, cover make it big
      },
      cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: theme.spacing(3),
        /* border: '2px solid green', */
      },
      cardInfo: {
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        [theme.breakpoints.up('sm')]: {
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        },
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        display: 'flex',
        /* background: theme.palette.grey[200], */
      },
      shoppingCartIcon: {
        width: '3rem',
        height: '3rem',
      },
      productSku: {
        color: theme.palette.grey[500],
      },
    })
  );
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Skeleton className={classes.cardImage} variant="rect" />
      <div className={classes.cardContent}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
      <div className={classes.cardInfo}>
        <div>
          <Skeleton className={classes.shoppingCartIcon} variant="circle" />
        </div>
      </div>
    </div>
  );
}
