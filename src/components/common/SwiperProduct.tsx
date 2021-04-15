// import Swiper core and required modules
import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { imageServerUrl } from '~/config';
import { IProduct } from '~/interfaces';
import { IImage } from '~/interfaces/IImage';
import Image from 'next/image';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import styles from '~/components/styles/SwiperProduct.module.scss';

// Import Swiper styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    swiperContainer: {},
    swiperWrapper: {
      height: 'auto !important',
    },
    swiperSlide: {
      height: 'auto !important',
    },
  })
);

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface IProps {
  product?: IProduct;
}
interface ISlide {
  image: string;
  thumbnail: string;
}

export default function Swipper({ product }: IProps) {
  const classes = useStyles();
  const images = product?.images.map((image: IImage) => ({
    image: image.img800,
    thumbnail: image.img150,
  }));

  const slides = [];
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
    }
  } else {
    for (let i = 0; i < 5; i += 1) {
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
    }
  }

  return (
    <React.Fragment>
      <Swiper
        id="main"
        spaceBetween={10}
        slidesPerView={1}
        className={classes.swiperWrapper}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {slides}
      </Swiper>
    </React.Fragment>
  );
}
