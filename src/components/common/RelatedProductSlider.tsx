// import Swiper core and required modules
import React from 'react';
import Image from 'next/image';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import SwiperCore, {
  Thumbs,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct } from '~/interfaces';
import ProductCardGrid from '~/components/common/ProductCardGrid';

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
          <Box style={{ width: 300, height: 500 }}>
            <Image
              layout="intrinsic"
              width={400}
              height={250}
              src={`https://picsum.photos/id/${i + 1}/500/300`}
              blurDataURL="data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAMABbAAAAMwAAABIAAACHAJEAdQC6AD8AEAD/AP8A/wD/AP8A/wACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAQAAUAAAAAACAAA0AAAAAADQAEAAAAAAAdAAJAAAAAAAGAAIAAAAAALMAAgAAAAAA0AACAAAAAADgAAEAAAAAAAAAAAAAAAAAAAAAAAAAAADQAAIAAAAAAOAAAQAAAAAA0AACAAAAAADgAAEAAAAAAAAAAAAAAAAAAAAAAAAAAADQAAIAAAAAAOAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAoAAgAAAAEAAAABAAEAAAACAAEAAAAAAAAAAAAAAAAAAAAAADEALgAwAC4AMwAAADUAMAAoADEAYwApAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI4AAAAAAAAAZAAAAAAAAABkAAAAAAAAAAAAAAAAAAAA1wALAAAAAAAAAAAAAAAAAGQAAAAAAAAAZQAAAAAAAABkAAAAAAAAAAgAAAAAAAAACAAAAAAAAAAIAAAAAAAAAAgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AABAAAABAAAAAQAGgADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN4AAQAAAAQAAAAEAKMAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADeAAEAAAAEAAAABACjAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3gABAAAABAAAAAQAowACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN4AAQAAAAQAAAAEAKMAAgAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA/wD/AP8A/wAFAAAAAAAAAAEAAAAAAAAAAAAAAAAAAADvAL4ArQDeAO8AvgCtAN4AAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADvAL4ArQDeAO8AvgCtAN4AAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADvAL4ArQDeAO8AvgCtAN4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADvAL4ArQDeAO8AvgCtAN4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADvAL4ArQDeAO8AvgCtAN4AAAAAAAAAAAADAAAAAAAAAO8AvgCtAN4A7wC+AK0A3gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADvAL4ArQDeAO8AvgCtAN4AAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhwAAAIcAAACHAAAAAAAAAP8A/wD/AP8A/wD/AP8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAJ8A1gBUAF8AeQADAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAALAAAAAAACADXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAg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"
              placeholder="blur"
            />
          </Box>
        </SwiperSlide>
      );
    }
  }

  return (
    <React.Fragment>
      <Grid container item xs={12}>
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
