import React, { useEffect } from 'react';
import AnimationPage from '~/components/common/AnimationPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { containerMaxWidth, REVALIDATE } from '~/config';
import { Container, Grid, Typography } from '@material-ui/core';
import ProductPageHead from '~/components/heads/ProductPageHead';
import { IImage } from '~/interfaces/IImage';
import { imageServerUrl } from '~/config';
import { asString } from '~/helpers';
import { ParsedUrlQuery } from 'querystring';

import {
  IProduct,
  IProductElasticBase,
  IProductElasticHitsFirst,
  IProductElasticHitsSecond,
} from '~/interfaces';
import { getProduct, getProductsAll } from '~/endpoints/productEndpoint';
import { useRouter } from 'next/router';
import ImageGallery from 'react-image-gallery';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

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
  if (router.isFallback) {
    return <div> ... Loading</div>;
  }

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
        <Container maxWidth={containerMaxWidth}>
          <Grid container>
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
