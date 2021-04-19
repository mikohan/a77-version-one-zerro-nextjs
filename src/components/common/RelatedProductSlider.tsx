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
import { imageServerUrl } from '~/config';
import { IProduct } from '~/interfaces';
import { IImage } from '~/interfaces/IImage';
import Image from 'next/image';
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
  })
);

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);

interface IProps {
  product: IProduct[];
}

interface ISlide {
  image: string;
  thumbnail: string;
}

export default function Swipper({ products }: IProps) {
  const init: any = null;
  const [thumbSwiper, setThumbSwiper] = useState(init);

  const classes = useStyles();
  const images = products?.map((product: IProduct) => {
    const img = product.images[0].img245;
    return {
      image: img,
    };
  });

  const slides = [];
  const thumbs = [];
  if (images?.length) {
    for (let im of images) {
      slides.push(
        <SwiperSlide key={im.image} className={classes.swiperSlide}>
          <Image
            layout="responsive"
            width={900}
            height={600}
            src={`${imageServerUrl}${im.image}`}
          />
        </SwiperSlide>
      );
      thumbs.push(
        <SwiperSlide key={im.thumbnail}>
          <Image
            layout="responsive"
            width={150}
            height={100}
            src={`${imageServerUrl}${im.thumbnail}`}
          />
        </SwiperSlide>
      );
    }
  } else {
    for (let i = 0; i < 10; i += 1) {
      slides.push(
        <SwiperSlide key={i + 1}>
          <Image
            layout="responsive"
            width={700}
            height={500}
            src={`https://picsum.photos/id/${i + 1}/500/300`}
          />
        </SwiperSlide>
      );
      thumbs.push(
        <SwiperSlide key={i + 1}>
          <Image
            layout="intrinsic"
            width={150}
            height={100}
            src={`https://picsum.photos/id/${i + 1}/500/300`}
          />
        </SwiperSlide>
      );
    }
  }

  return (
    <React.Fragment>
      <Swiper
        className={classes.swiperContainer}
        id="main"
        thumbs={{ swiper: thumbSwiper }}
        spaceBetween={5}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
      >
        {slides}
      </Swiper>
    </React.Fragment>
  );
}
