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
import Avatar from '~/components/common/AvatarImage';

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
      /* border: '1px solid blue', */
    },
    searchContainer: {
      marginBottom: theme.spacing(3),
    },
    paper: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      [theme.breakpoints.down('md')]: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
      },
    },
    author: {
      marginBottom: theme.spacing(2),
      display: 'flex',
      algnItems: 'center',
    },
    avatar: {
      border: '1px solid blue',
    },
    spanContainer: {
      paddingLeft: theme.spacing(2),
      display: 'flex',
      border: '1px solid blue',
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
                    <Box className={classes.avatar}>
                      <Avatar />
                    </Box>
                    <Typography
                      className={classes.spanContainer}
                      variant="body2"
                    >
                      <div className={classes.authorSpan}>{post.author}</div>
                      <div className={classes.divider}>|</div>
                      <div className={classes.dateSpan}>{post.date}</div>
                    </Typography>
                  </Grid>

                  <Grid container xs={12}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quos est, sapiente atque provident ducimus necessitatibus in
                    dolore iure reprehenderit eos commodi, fugiat, nemo
                    voluptatibus asperiores quasi architecto ratione cumque
                    similique expedita amet veniam nobis aperiam ipsum
                    repudiandae! Molestias, provident nam explicabo fuga beatae
                    voluptatibus omnis culpa eos dolorem minima excepturi
                    tempore ducimus distinctio, quis itaque at maxime aperiam
                    officiis odit. Quisquam, similique natus voluptates ad nihil
                    harum molestiae corrupti culpa nulla sit autem totam
                    voluptate optio, dolorum dolor facilis qui?
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
