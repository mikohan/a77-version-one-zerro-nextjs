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
import { capitalize } from '~/utils';

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

export default function Swipper({ product }: IProps) {
  const init: any = null;
  const [thumbSwiper, setThumbSwiper] = useState(init);
  const classes = useStyles();
  const images = product?.images.map((image: IImage) => ({
    image: image.img800,
    thumbnail: image.img150,
    dimension: image.dimension,
  }));
  let alt: string = 'Запчасти для коммерческого и легкового транспорта';
  if (product && product.model.length) {
    alt = `${capitalize(product?.model[0].make.name)} ${
      product?.model[0].model
    } ${product?.name}`;
  }

  const slides = [];
  const thumbs = [];
  if (images?.length) {
    for (let im of images) {
      const { width, height } = Object.keys(im.dimension).length
        ? im.dimension
        : { width: 900, height: 600 };
      const {
        tmbWidth,
        tmbHeight,
      }: { tmbWidth: number; tmbHeight: number } = Object.keys(im.dimension)
        .length
        ? { tmbWidth: width / 6, tmbHeight: height / 6 }
        : { tmbWidth: 150, tmbHeight: 100 };
      slides.push(
        <SwiperSlide key={im.image} className={classes.swiperSlide}>
          <Image
            layout="responsive"
            width={width}
            height={height}
            src={`${imageServerUrl}${im.image}`}
            alt={alt}
          />
        </SwiperSlide>
      );
      thumbs.push(
        <SwiperSlide key={im.thumbnail}>
          <Image
            layout="responsive"
            width={tmbWidth}
            height={tmbHeight}
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
            width={1200}
            height={900}
            src={`https://picsum.photos/id/${i + 1}/1200/900`}
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
  const options = {
    settings: {},
    buttons: {
      showDownloadButton: false,
    },
  };

  return (
    <React.Fragment>
      <SRLWrapper options={options}>
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
