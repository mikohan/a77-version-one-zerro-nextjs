import React, { useEffect } from 'react';
import AnimationPage from '~/components/common/AnimationPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { containerMaxWidth, REVALIDATE } from '~/config';
import { Container, Grid } from '@material-ui/core';
import ProductPageHead from '~/components/heads/ProductPageHead';
import {
  IProduct,
  IProductElasticBase,
  IProductElasticHitsFirst,
  IProductElasticHitsSecond,
} from '~/interfaces';
import { getProduct, getProductsAll } from '~/endpoints/productEndpoint';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface IProps {
  product: IProduct;
}
export default function ProductPage({ product }: IProps) {
  const classes = useStyles();
  const router = useRouter();
  if (router.isFallback) {
    return <div> ... Loading</div>;
  }
  return (
    <React.Fragment>
      {/* <ProductPageHead product={product} /> */}
      <AnimationPage>
        <Container maxWidth={containerMaxWidth}>
          <Grid container></Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params;

  const product: IProduct = await getProduct('vkladyshi-korennye-4030');

  return {
    revalidate: REVALIDATE,
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const promise = await getProductsAll();
  const prods = promise.hits.hits;
  const paths = prods.map((prod: any) => {
    return { params: { product: prod._source.slug } };
  });

  return {
    fallback: false,
    paths: paths,
  };
};
