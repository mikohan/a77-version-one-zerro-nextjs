import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { IProductElasticHitsSecond } from '~/interfaces/product';
import { useSelector } from 'react-redux';
import { prodCardSize } from '~/config';
import { IState } from '~/interfaces/IState';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

interface IProp {
  product: IProductElasticHitsSecond;
}

export default function ComplexGrid({ product }: IProp) {
  const shopGrid = useSelector((state: IState) => state.uiState.shopGrid);
  const imgPath: string = product._source.images.length
    ? (product._source.images[0].img500 as string)
    : '/images/local/defaultParts500.jpg';
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      card: {
        position: 'relative',
        display: 'block',
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
      cardImage: {
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover', // contain maki it small, cover make it big
      },
      cardContent: {
        minHeight: '8rem',
        lineHeight: '1.5',
        padding: theme.spacing(3),
      },
      cardInfo: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        /* background: theme.palette.grey[200], */
      },
      shoppingCartIcon: {
        fontSize: '2rem',
        color: theme.palette.grey[500],
        transition: '0.2s',
      },
      cardImageLink: {
        display: 'block',
        position: 'relative',
        width: '100%',
        paddingBottom: '100%',
      },
      productName: {
        fontSize: '1.1rem',
        color: theme.palette.grey[700],
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
      </div>
      <div className={classes.productSku}>
        <Typography variant="body2">
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
