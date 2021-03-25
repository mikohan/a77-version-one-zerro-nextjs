import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { IProductElasticHitsSecond } from '~/interfaces/product';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

interface IProp {
  product: IProductElasticHitsSecond;
}

export default function ComplexGrid({ product }: IProp) {
  const imgPath: string = product._source.images.length
    ? (product._source.images[0].img500 as string)
    : '/images/local/defaultParts500.jpg';
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
          gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
          /* gridAutoRows: `minmax(50px, 100px)`, */
          justifyContent: 'center',
        },
        [theme.breakpoints.up('sm')]: {
          gridTemplateColumns: `1fr 2fr 1fr`,
          gridAutoRows: `minmax(150px, 200px)`,
        },
        boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)',
        borderRadius: '2px',
        background: 'white',
        transition: '0.5s',
        '&:hover $shoppingCartIcon': {
          transform: `scale(1.3)`,
          color: theme.palette.primary.main,
          cursor: 'pointer',
        },
      },
      cardImageLink: {
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
          alignItems: 'flex-end',
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
        fontSize: '2rem',
        color: theme.palette.grey[500],
        transition: '0.2s',
      },
      productSku: {
        color: theme.palette.grey[500],
      },
    })
  );
  const classes = useStyles();

  return (
    <div key={product._id} className={classes.card}>
      <a className={classes.cardImageLink}>
        <img src={imgPath} className={classes.cardImage} alt="Some image" />
      </a>
      <div className={classes.cardContent}>
        <Typography className={classes.productName} variant="h6">
          {product._source.name}
        </Typography>
        <Typography className={classes.productSku} variant="body2">
          SKU: {product._source.cat_number}
        </Typography>
      </div>
      <div className={classes.cardInfo}>
        <Typography variant="h6">$ 450.00</Typography>
        <div>
          <ShoppingCartOutlinedIcon className={classes.shoppingCartIcon} />
        </div>
      </div>
    </div>
  );
}
