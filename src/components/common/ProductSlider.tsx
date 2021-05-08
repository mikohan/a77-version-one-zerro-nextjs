// import Swiper core and required modules
import React, { useState } from 'react';
import SwiperCore, {
  Thumbs,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { IProduct } from '~/interfaces';
import Image from 'next/image';
import { Box, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

// Import Swiper styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    swiperContainer: {
      '& > div': {
        color: theme.palette.primary.main,
      },
      '&  > div > span': {
        background: theme.palette.primary.main,
      },
    },
    swiperWrapper: {
      height: 'auto !important',
    },
    swiperSlide: {
      height: 'auto !important',
    },
    item: {
      border: '1px solid pink',
    },
  })
);

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);

interface IProps {
  products: IProduct[];
}

interface ISlide {
  image: string;
  thumbnail: string;
}

export default function Swipper({ products }: IProps) {
  const init: any = null;

  const classes = useStyles();
  const images = products?.map((product: IProduct) => {
    const img =
      product.images && product.images.length ? product.images[0].img245 : [];
    return {
      image: img,
    };
  });

  interface IProdCard {
    product: IProduct;
  }

  function ProdCard({ product }: IProdCard) {
    const img: string = product.images.length
      ? (product.images[0].img245 as string)
      : '/images/local/defaultParts245.jpg';
    return (
      <Box className={classes.item}>
        <Image layout="intrinsic" width={300} height={250} src={img} />
        <Typography variant="body1">{product.name}</Typography>
      </Box>
    );
  }

  const slides = [];
  if (images?.length) {
    for (let prod of products) {
      slides.push(
        <SwiperSlide key={prod.id} className={classes.swiperSlide}>
          <ProdCard product={prod} />
        </SwiperSlide>
      );
    }
  } else {
    for (let i = 0; i < 10; i += 1) {
      slides.push(
        <SwiperSlide key={i + 1}>
          <Box style={{ width: 300, height: 500 }}>
            <Image
              layout="responsive"
              width={700}
              height={500}
              src={`https://picsum.photos/id/${i + 1}/500/300`}
            />
          </Box>
        </SwiperSlide>
      );
    }
  }

  return (
    <React.Fragment>
      <Swiper
        className={classes.swiperContainer}
        id="main"
        spaceBetween={10}
        slidesPerView={5}
        navigation
      >
        {slides}
      </Swiper>
    </React.Fragment>
  );
}
