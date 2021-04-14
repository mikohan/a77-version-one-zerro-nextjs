import React, { useEffect } from 'react';
import AnimationPage from '~/components/common/AnimationPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { containerMaxWidth, REVALIDATE } from '~/config';
import { Container, Grid, Typography } from '@material-ui/core';
import ProductPageHead from '~/components/heads/ProductPageHead';
import { IImage } from '~/interfaces/IImage';
import { imageServerUrl } from '~/config';

import { IProduct } from '~/interfaces';
import { getProduct, getProductsAll } from '~/endpoints/productEndpoint';
import { useRouter } from 'next/router';
import ImageGallery from 'react-image-gallery';
import PageHeader from '~/components/product/PageHeader';
import { IBread } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      border: '1px solid pink',
      background: 'rgba(0,142,129,0.1)',
      marginBottom: theme.spacing(2),
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: '5fr 4fr 3fr',
      gridGap: theme.spacing(2),
    },
    first: {
      background: theme.palette.action.hover,
    },
    second: {
      background: theme.palette.action.selected,
    },
    third: {
      background: 'rgba(0,180,204,0.2)',
    },
  })
);

interface IProps {
  product: IProduct;
}
interface IGalery {
  original: string;
  thumbnail: string;
}
export default function ProductPage({ product }: IProps) {
  const classes = useStyles();
  const router = useRouter();
  /* if (router.isFallback) { */
  /*   return <div> ... Loading</div>; */
  /* } */
  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: product.name, path: `/product/${product.slug}` },
  ];

  let images: IGalery[] = [];
  if (product.images.length) {
    images = product.images.map((item: IImage) => ({
      original: `${imageServerUrl}${item.img800}`,
      thumbnail: `${imageServerUrl}${item.img150}`,
    }));
  } else {
    images = [
      {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
      },
      {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
      },
      {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
      },
    ];
  }

  return (
    <React.Fragment>
      <ProductPageHead product={product} />
      <AnimationPage>
        <Container maxWidth="lg">
          <Grid container>
            <Grid className={classes.headerContainer} item xs={12}>
              <PageHeader header={product.name} breads={breads} />
            </Grid>
            <Grid className={classes.wrapper} item xs={12}>
              <div className={classes.first}>
                <ImageGallery items={images} />
              </div>
              <div className={classes.second}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo
                distinctio necessitatibus placeat ut vel. A laboriosam
                asperiores, harum vitae esse nisi eveniet labore eligendi qui
                deserunt. Ut facere dolorem vitae perspiciatis ratione, veniam
                fuga consequatur perferendis soluta dolor vero sint porro quod
                aliquam culpa, repudiandae, ex tempore. Sed, ipsa minus!
              </div>
              <div className={classes.third}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo
                distinctio necessitatibus placeat ut vel. A laboriosam
                asperiores, harum vitae esse nisi eveniet labore eligendi qui
                deserunt. Ut facere dolorem vitae perspiciatis ratione, veniam
                fuga consequatur perferendis soluta dolor vero sint porro quod
                aliquam culpa, repudiandae, ex tempore. Sed, ipsa minus!
              </div>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo
                distinctio necessitatibus placeat ut vel. A laboriosam
                asperiores, harum vitae esse nisi eveniet labore eligendi qui
                deserunt. Ut facere dolorem vitae perspiciatis ratione, veniam
                fuga consequatur perferendis soluta dolor vero sint porro quod
                aliquam culpa, repudiandae, ex tempore. Sed, ipsa minus!
              </div>
            </Grid>
            <Grid item xs={6}>
              <ImageGallery items={images} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h1">{product.name}</Typography>
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params!;

  const product: IProduct = await getProduct(slug as string);

  return {
    revalidate: REVALIDATE,
    props: {
      product,
    },
  };
};

interface IPaths {
  params: {
    slug: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const promise = await getProductsAll();
  const prods = promise.hits.hits;
  let paths: IPaths[] = [];
  for (let prod of prods) {
    if (prod._source.slug) {
      paths.push({ params: { slug: prod._source.slug } });
    } else {
      console.log('Something wrong with slug in product');
    }
  }

  return {
    fallback: false,
    paths: paths,
  };
};
