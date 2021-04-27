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
      flexWrap: 'wrap',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: theme.spacing(25),
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      overflowWrap: 'break-word',
      fontWeight: 500,
      padding: theme.spacing(1),
    },
    date: {
      paddingTop: theme.spacing(0.3),
      paddingBottom: theme.spacing(0.3),
      paddingLeft: theme.spacing(1),
      color: theme.palette.text.secondary,
      fontWeight: 500,
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
          <Paper key={post.slug} className={classes.item}>
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
            <Typography
              className={classes.date}
              variant="subtitle2"
              component="div"
            >
              {post.date}
            </Typography>
          </Paper>
        ))}
      </Box>
    </React.Fragment>
  );
}
