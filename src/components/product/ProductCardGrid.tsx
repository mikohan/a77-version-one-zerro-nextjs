import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { IProductElasticHitsSecond } from '~/interfaces/product';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { capitalize } from '~/utils';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ChipContainer from '../common/ChipBox';
import { useSelector } from 'react-redux';
import { IState } from '~/interfaces/IState';
import Skeleton from '@material-ui/lab/Skeleton';

interface IProp {
  product: IProductElasticHitsSecond;
}

export default function ProductCardGrid({ product }: IProp) {
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
        background: theme.palette.background.paper,
        transition: '0.5s',
        '&:hover $shoppingCartIcon': {
          transform: `scale(1.1)`,
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
        wordBreak: 'break-word',
      },
      productSku: {
        paddingLeft: theme.spacing(2),
        color: theme.palette.text.disabled,
      },
    })
  );
  const classes = useStyles();
  const productsLoading = useSelector(
    (state: IState) => state.shopNew.productsLoading
  );

  const currentCar = useSelector((state: IState) => state.shop.currentCar);
  const compatable = product._source.model.some(
    (item: any) => item.slug.toLowerCase() === currentCar?.slug
  );

  return (
    <div key={product._id} className={classes.card}>
      <a className={classes.cardImageLink}>
        {productsLoading && (
          <Skeleton variant="rect" className={classes.cardImage} />
        )}
        <img
          src={imgPath}
          className={classes.cardImage}
          alt={product._source.full_name}
        />
      </a>
      <div className={classes.cardContent}>
        <Typography className={classes.productName} variant="body1">
          {capitalize(product._source.name)}
        </Typography>
      </div>
      {compatable && <ChipContainer car={currentCar?.model} />}
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
