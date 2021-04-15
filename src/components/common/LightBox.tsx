import React from 'react';
import classes from '~/components/styles/LightBox.module.scss';
import Image from 'next/image';

export default function LightBox() {
  return (
    <React.Fragment>
      <div className={classes.swiperContainer}></div>
      <div className={classes.swiperWrapper}>
        <div className={classes.swiperSlide}>
          <Image
            src="/images/tmp/kia-bongo.png"
            layout="responsive"
            width={400}
            height={300}
          />
        </div>
        <div className={classes.swiperSlide}>Some content</div>
        <div className={classes.swiperSlide}>Some content</div>
      </div>
    </React.Fragment>
  );
}
