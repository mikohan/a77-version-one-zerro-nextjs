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
        padding: theme.spacing(3),
        position: 'relative',
        display: 'grid',

        gridTemplateColumns: `1fr 2fr 1fr`,
        gridAutoRows: `minmax(200px, 250px)`,
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
        display: 'flex',
        alignItems: 'center',
        border: '2px solid grey',
      },
      productName: {
        fontSize: '1.1rem',
        color: theme.palette.grey[700],
      },
      cardImage: {
        border: '2px solid red',
        maxWidth: '100%',
        height: 'auto',
        objectFit: 'scale-down', // contain maki it small, cover make it big
      },
      cardContent: {
        border: '2px solid green',
        minWidth: '30%',
        height: '100%',
      },
      cardInfo: {
        minWidth: '25%',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        /* background: theme.palette.grey[200], */
      },
      shoppingCartIcon: {
        fontSize: '2rem',
        color: theme.palette.grey[500],
        transition: '0.2s',
      },
      productSku: {
        paddingLeft: theme.spacing(2),
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
        <div className={classes.productSku}>
          <Typography variant="body2">
            SKU: {product._source.cat_number}
          </Typography>
        </div>
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
