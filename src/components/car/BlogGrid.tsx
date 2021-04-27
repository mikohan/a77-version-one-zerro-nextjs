import {
  IFilter,
  IProductElasticHitsFirst,
  IProduct,
  ICategory,
  ICar,
  IPost,
} from '~/interfaces';
import React from 'react';
import { Hidden, Grid } from '@material-ui/core';
import PageHeader from '~/components/product/PageHeader';
import LeftSideBar from '~/components/product/LeftSideBar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FilterWidget from '~/components/product/FilterWidget';
import { Box, Paper, Typography } from '@material-ui/core';
import LeftSidePopularWidget from '~/components/product/LeftSidePopularWidet';
import CategoryBlock from '~/components/car/CategoryBlock';
import { capitalize } from '~/utils';
import Image from 'next/image';
import ProductSmallGrid from '~/components/car/ProductSmallGrid';
import ProductsGrid from '~/components/blog/ProductGrid';
import LatestPosts from '~/components/blog/LatestPosts';
import { imageServerUrl } from '~/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
    },
    item: {
      maxWidth: theme.spacing(25),
      border: '1px solid blue',
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    image: {},
    title: {
      overflowWrap: 'break-word',
      fontWeight: 500,
      padding: theme.spacing(1),
      border: '2px solid pink',
    },
  })
);

interface IProps {
  posts: IPost[];
}
export default function ModelShopList(props: IProps) {
  const { posts } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box className={classes.container}>
        {posts.map((post: IPost) => (
          <Box key={post.slug} className={classes.item}>
            <Image
              src={`${imageServerUrl}${post.image}`}
              layout="intrinsic"
              className={classes.image}
              width={200}
              height={160}
            />
            <Typography
              className={classes.title}
              variant="subtitle2"
              component="div"
            >
              {post.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
}
