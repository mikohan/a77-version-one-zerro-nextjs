import React, { useEffect, useState } from 'react';
import { IBlogCategory, IPost, IProduct } from '~/interfaces';
import { getBlogCategories, getPosts, getPost } from '~/endpoints/blogEndpoint';
import { REVALIDATE, BLOG_DATA, imageServerUrl } from '~/config';
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
import Avatar from '~/components/common/AvatarImage';
import Image from 'next/image';
import parse from 'html-react-parser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: theme.spacing(2),
      margin: '0 auto',
      [theme.breakpoints.down('lg')]: {
        maxWidth: 1400,
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: 1600,
      },
    },
    breads: {
      paddingLeft: theme.spacing(5),
      paddingTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
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
      paddingBottom: theme.spacing(3),
      /* border: '1px solid blue', */
    },
    searchContainer: {
      marginBottom: theme.spacing(3),
    },
    paper: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('md')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
      },
    },
    author: {
      marginBottom: theme.spacing(2),
      display: 'flex',
      algnItems: 'center',
    },
    authorRightColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      paddingLeft: theme.spacing(2),
    },
    spanContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    authorSpan: {
      fontWeight: 700,
      color: theme.palette.text.secondary,
    },
    dateSpan: {
      fontSize: '0.95rem',
      color: theme.palette.text.disabled,
    },
    divider: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      color: theme.palette.text.disabled,
    },
    time: {
      color: theme.palette.text.disabled,
    },
    excerpt: {
      fontSize: '1.3rem',
    },
    text: {
      [theme.breakpoints.up('xxl')]: {
        '&  p, & div, & span': {
          fontSize: '1.6rem',
        },
      },
      '&  p, & div': {
        fontSize: '1.3rem',
      },
      '&  h2, & h3, & h4': {
        fontSize: '2rem',
      },
      '&  h5, & h6': {
        fontSize: '1.8rem',
      },
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
    { name: post.title, path: url.post(post.slug) },
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
            <Grid container item xs={12} md={8}>
              <div className={classes.itemContainer}>
                <Paper className={classes.paper}>
                  <Typography className={classes.pageTitle} variant="h1">
                    {post.title}
                  </Typography>
                  <Grid className={classes.author} container xs={12}>
                    <Avatar image="/images/local/A100.png" />
                    <Box className={classes.authorRightColumn}>
                      <Typography
                        className={classes.spanContainer}
                        variant="body2"
                      >
                        <div className={classes.authorSpan}>{post.author}</div>
                        <div className={classes.divider}>|</div>
                        <div className={classes.dateSpan}>{post.date}</div>
                      </Typography>
                      <Typography className={classes.time} variant="body2">
                        Время чтения 20 мин
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid container xs={12}>
                    <Grid item xs={12}>
                      <Typography className={classes.excerpt} variant="body1">
                        {post.excerpt}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Image
                        src={`${imageServerUrl}${post.image}`}
                        layout="responsive"
                        width={900}
                        height={600}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={classes.text}>{parse(post.text)}</Box>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
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
