import React from 'react';
import classes from '~/components/styles/LightBox.module.scss';
import Image from 'next/image';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation]);

export default function LightBox() {
  return (
    <React.Fragment>
      <div className={classes.swiperContainer}>
        <Swiper navigation autoHeight className={classes.swiperWrapper}>
          <SwiperSlide className={classes.swiperSlide}>
            <Image src="/images/tmp/kia-bongo.png" layout="fill" />
          </SwiperSlide>
          <SwiperSlide className={classes.swiperSlide}>
            <img src="/images/tmp/kia-bongo.png" />
          </SwiperSlide>
          <SwiperSlide className={classes.swiperSlide}>
            <img src="/images/tmp/kia-bongo.png" />
          </SwiperSlide>
          <div className={classes.swiperSlide}>Some content</div>
          <div className={classes.swiperSlide}>Some content</div>
        </Swiper>
      </div>
    </React.Fragment>
  );
}
