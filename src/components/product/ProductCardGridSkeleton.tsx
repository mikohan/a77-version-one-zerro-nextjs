import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ProductCardGridSkeleton() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      card: {
        position: 'relative',
        display: 'block',
        boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
        borderRadius: '2px',
      },
      cardImage: {
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover', // contain maki it small, cover make it big
      },
      cardContent: {
        lineHeight: '1.5',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
      cardInfo: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        /* background: theme.palette.grey[200], */
      },
      shoppingCartIcon: {
        minWidth: '3rem',
        minHeight: '3rem',
      },
      cardImageLink: {
        display: 'block',
        position: 'relative',
        width: '100%',
        paddingBottom: '100%',
      },
      productName: {
        wordBreak: 'break-word',
      },
      productSku: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
    })
  );
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <a className={classes.cardImageLink}>
        <Skeleton variant="rect" className={classes.cardImage} />
      </a>
      <div className={classes.cardContent}>
        <Skeleton variant="text" />
      </div>
      <div className={classes.productSku}>
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
