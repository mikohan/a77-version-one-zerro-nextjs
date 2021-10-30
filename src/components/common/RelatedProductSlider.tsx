// import Swiper core and required modules
import React from 'react';
import Image from 'next/image';
import SwiperCore, {
  Thumbs,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { IProduct } from '~/interfaces';
import ProductCardGrid from '~/components/common/ProductCardGrid';
import { part64 } from '~/services/base64';

// Import Swiper styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    swiperContainer: {
      width: '100%',
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
    sliderItem: {
      paddingLeft: theme.spacing(1.2),
      paddingRight: theme.spacing(1.2),
    },
  })
);

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);

interface IProps {
  products: IProduct[];
}

export default function Swipper({ products }: IProps) {
  const classes = useStyles();
  const images = products?.map((product: IProduct) => {
    const img =
      product.images && product.images.length ? product.images[0].img500 : [];
    return {
      image: img,
    };
  });

  const slides = [];
  if (images?.length) {
    for (let prod of products) {
      slides.push(
        <SwiperSlide key={prod.id} className={classes.swiperSlide}>
          <div className={classes.sliderItem}>
            <ProductCardGrid product={prod} />
          </div>
        </SwiperSlide>
      );
    }
  } else {
    for (let i = 0; i < 10; i += 1) {
      slides.push(
        <SwiperSlide key={i + 1}>
          <Box style={{ width: 200, height: 300 }}>
            <Image
              layout="responsive"
              width={200}
              height={120}
              src={`/images/local/defaultParts245.jpg`}
              blurDataURL={part64}
              placeholder="blur"
            />
          </Box>
        </SwiperSlide>
      );
    }
  }

  return (
    <React.Fragment>
      <Grid container item xs={12} style={{ border: '1px solid pink' }}>
        <Swiper
          className={classes.swiperContainer}
          id="main"
          spaceBetween={10}
          slidesPerView={6}
          navigation
        >
          {slides}
        </Swiper>
      </Grid>
    </React.Fragment>
  );
}

