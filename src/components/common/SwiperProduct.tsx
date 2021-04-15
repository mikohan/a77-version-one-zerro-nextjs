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
      '& >ul': {
        paddingInlineStart: 0,
      },
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
  /* const images = product.images.map((image: IImage) => ({ */
  /*   image: image.img800, */
  /*   thumbnail: image.img150, */
  /* })); */
  const slides = [];
  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={i + 1} tag="li">
        <Image
          layout="responsive"
          width={500}
          height={300}
          src={`https://picsum.photos/id/${i + 1}/500/300`}
        />
      </SwiperSlide>
    );
  }

  return (
    <React.Fragment>
      <div className={styles.myclass}>
        <Swiper
          id="main"
          spaceBetween={10}
          slidesPerView={1}
          className={classes.swiperWrapper}
          tag="section"
          wrapperTag="ul"
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {slides}
        </Swiper>
      </div>
    </React.Fragment>
  );
}
