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
import { SRLWrapper } from 'simple-react-lightbox';

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
  product?: IProduct;
}
interface ISlide {
  image: string;
  thumbnail: string;
}

export default function Swipper({ product }: IProps) {
  const init: any = null;
  const [thumbSwiper, setThumbSwiper] = useState(init);
  const classes = useStyles();
  const images = product?.images.map((image: IImage) => ({
    image: image.img800,
    thumbnail: image.img150,
  }));

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
      <SRLWrapper>
        <Swiper
          className={classes.swiperContainer}
          id="main"
          thumbs={{ swiper: thumbSwiper }}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {slides}
        </Swiper>
      </SRLWrapper>
      <Swiper
        slidesPerView={6}
        style={{ width: '100%' }}
        spaceBetween={5}
        id="tumbs"
        onSwiper={setThumbSwiper}
        breakpoints={{
          // when window width is >= 640px
          200: {
            slidesPerView: 2,
          },
          450: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          // when window width is >= 768px
          960: {
            slidesPerView: 4,
          },
          1100: {
            slidesPerView: 5,
          },
          1600: {
            slidesPerView: 6,
          },
        }}
      >
        {thumbs}
      </Swiper>
    </React.Fragment>
  );
}
