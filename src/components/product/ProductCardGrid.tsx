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
        border: '2px solid teal',
        /* height: '100%', */
        /* /1* position: 'relative', *1/ */
        /* /1* display: 'block', *1/ */
        /* boxShadow: '0 1px 3px  rgba(0, 0, 0, 0.1)', */
        /* borderRadius: '2px', */
        /* background: theme.palette.background.paper, */
        /* transition: '0.5s', */
        /* '&:hover $shoppingCartIcon': { */
        /*   transform: `scale(1.1)`, */
        /*   color: theme.palette.primary.main, */
        /*   cursor: 'pointer', */
        /* }, */
      },

      cardImage: {
        /* display: 'block', */
        /* position: 'absolute', */
        /* width: '100%', */
        /* height: '100%', */
        /* objectFit: 'cover', // contain maki it small, cover make it big */
      },
      a: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
      image: {
        flexShrink: 0,
        width: '100%',
        height: '245px',
        objectFit: 'cover', // contain maki it small, cover make it big
      },
      content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid yellow',
      },
      one: {
        background: '#ddd',
      },
      two: {
        background: '#eee',
        flex: '1 0 auto',
      },
      three: {
        background: '#fff',
      },
      cardContent: {
        border: '3px solid red',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      },
      productNameBox: {
        flex: 1,
        border: '1px solid pink',
      },
      cardContentInner: {
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
        fontSize: '1.5rem',
        color: theme.palette.text.disabled,
        transition: '0.2s',
      },
      cardImageLink: {
        display: 'block',
        position: 'relative',
        width: '100%',
        /* paddingBottom: '100%', */
      },
      productName: {
        wordBreak: 'break-word',
      },
      productSku: {
        paddingLeft: theme.spacing(2),
        color: theme.palette.text.disabled,
      },
      cartIconRow: {
        border: '2px solid pink',
        /* justifySelf: 'flex-end', */
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
  const stock = product._source.stocks.find((item: any) => item.store.id === 3);
  const price = stock?.price;

  return (
    <div className={classes.content}>
      <div className={classes.a}>
        <img
          className={classes.image}
          src={imgPath}
          alt={product._source.full_name}
        />
      </div>
      <div className={classes.one}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
      </div>
      <div className={classes.two}>
        {product._source.full_name}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
      </div>
      <div className={classes.three}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
      </div>
    </div>
  );
}
