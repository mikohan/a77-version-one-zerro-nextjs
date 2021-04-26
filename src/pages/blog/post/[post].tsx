import React, { useEffect, useState } from 'react';
import { IBlogCategory, IPost, IProduct } from '~/interfaces';
import { getBlogCategories, getPosts, getPost } from '~/endpoints/blogEndpoint';
import { REVALIDATE, BLOG_DATA } from '~/config';
import { GetStaticPropsContext, GetStaticPathsContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import AnimationPage from '~/components/common/AnimationPage';
import { Grid, Typography, Box, Paper } from '@material-ui/core';
import BlogHead from '~/components/heads/BlogHead';
import SearchField from '~/components/blog/SearchBar';
import BlogPaper from '~/components/blog/PostSingleRow';
import CategoryList from '~/components/blog/CategoryList';
import Pagination from '~/components/blog/Pagination';
import { asString } from '~/helpers';
import LatestPosts from '~/components/blog/LatestPosts';
import { useRouter } from 'next/router';
import { getLatestProducts } from '~/endpoints/productEndpoint';
import { translateProducts } from '~/utils';
import LatestProducts from '~/components/common/LatestProducts';
import BreadCrumbs from '~/components/common/BreadCrumbs';
import url from '~/services/url';

const postsOnPage = BLOG_DATA.postsPerPage;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '0 auto',
      [theme.breakpoints.down('lg')]: {
        maxWidth: 1400,
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: 1600,
      },
    },
    breads: {
      paddingTop: theme.spacing(2),
    },
    pageTitle: {
      paddingBottom: theme.spacing(4),
    },
    itemContainer: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    sidePanel: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      /* border: '1px solid blue', */
    },
    searchContainer: {
      marginBottom: theme.spacing(3),
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: theme.spacing(4),
    },
  })
);

interface IProps {
  post: IPost;
  categories: IBlogCategory[];
  latestPosts: IPost[];
  latestProducts: IProduct[];
  totalPosts: number;
}

export default function Posts({
  post,
  categories,
  latestPosts,
  latestProducts,
  totalPosts,
}: IProps) {
  const classes = useStyles();

  const [search, setSearch] = useState('');
  const router = useRouter();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  function handleSubmit() {
    router.push({
      pathname: `/blog/search`,
      query: {
        search: search,
        page: 1,
      },
    });
  }
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (search) {
        handleSubmit();
      }
    }
  }
  const breadCrumbs = [
    { name: 'Ангара77', path: '/' },
    { name: 'Блог', path: url.blog() },
  ];

  return (
    <React.Fragment>
      <BlogHead />
      <AnimationPage id="blogCategoriesPage">
        <div className={classes.container}>
          <Grid container>
            <Grid className={classes.breads} item xs={12}>
              <BreadCrumbs breadCrumbs={breadCrumbs} />
            </Grid>
            <Grid justify="center" item container xs={12}>
              <Typography className={classes.pageTitle} variant="h1">
                {post.title}
              </Typography>
            </Grid>
            <Grid container item xs={12} md={8}>
              <div className={classes.itemContainer}>{post.title}</div>
            </Grid>
            <Grid className={classes.sidePanel} item xs={12} md={4}>
              <Box className={classes.searchContainer}>
                <SearchField
                  handleSearch={handleSearch}
                  handleSubmit={handleSubmit}
                  handleKeyPress={handleKeyPress}
                />
              </Box>
              <CategoryList categories={categories} totalPosts={totalPosts} />
              <LatestPosts posts={latestPosts} />
              <LatestProducts products={latestProducts} />
            </Grid>
          </Grid>
        </div>
      </AnimationPage>
    </React.Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const latestProductsPromise = await getLatestProducts(5);
  const latestProducts: IProduct[] = translateProducts(
    latestProductsPromise.hits.hits
  );

  const slug = asString(context.params?.post);

  const post: IPost = await getPost(slug);
  const promiseCategories = await getBlogCategories();
  const latestPosts = await getPosts(5);
  const categories = promiseCategories
    .slice()
    .filter((cat: IBlogCategory) => cat.postsCount > 0);
  const totalPosts = post.totalCount;

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    revalidate: REVALIDATE,
    props: {
      post,
      categories,
      latestPosts,
      latestProducts,
      totalPosts,
    },
  };
}

export async function getStaticPaths(context: GetStaticPathsContext) {
  const posts = await getPosts();
  const paths = posts.map((post: IPost) => ({ params: { post: post.slug } }));

  return {
    paths,
    fallback: false,
  };
}
