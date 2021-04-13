import React, { useEffect } from 'react';
import AnimationPage from '~/components/common/AnimationPage';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { containerMaxWidth, REVALIDATE } from '~/config';
import { Container, Grid } from '@material-ui/core';
import ProductPageHead from '~/components/heads/ProductPageHead';
import {
  IProductElasticBase,
  IProductElasticHitsFirst,
  IProductElasticHitsSecond,
} from '~/interfaces';
import { getProduct, getProductsAll } from '~/endpoints/productEndpoint';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface IProps {
  product: IProductElasticHitsSecond;
}
export default function ProductPage({ product }: IProps) {
  const classes = useStyles();
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
  console.log(slug);

  const product = await getProduct('filtr-masljanyj-5503');

  return {
    revalidate: REVALIDATE,
    props: {
      product: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const promise: IProductElasticHitsFirst = await getProductsAll();
  const prods = promise.hits;
  /* const paths = prods.map((prod: any) => { */
  /*   return { params: { product: prod.slug } }; */
  /* }); */

  return {
    fallback: true,
    paths: [{ params: { product: 'some' } }],
  };
};
