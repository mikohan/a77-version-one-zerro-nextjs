import React, { useEffect, useState } from 'react';
import { IBlogCategory, IPost } from '~/interfaces';
import {
  getBlogCategories,
  getPosts,
  getPostsByCategory,
  getTotalPosts,
  searchPosts,
} from '~/endpoints/blogEndpoint';
import { REVALIDATE } from '~/config';
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

const postsOnPage = 2;
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
    pageTitle: {
      padding: theme.spacing(2),
    },
    itemContainer: {
      padding: theme.spacing(2),
    },
    sidePanel: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingTop: theme.spacing(2),
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
  posts: IPost[];
  categories: IBlogCategory[];
  totalPages: number;
  curPage: number;
  categorySlug: string;
  totalPosts: number;
  latestPosts: IPost[];
}

export default function Posts({
  posts,
  categories,
  totalPages,
  curPage,
  categorySlug,
  totalPosts,
  latestPosts,
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
        page: curPage,
      },
    });
  }
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    e.key === 'Enter' && e.preventDefault();
    if (search) {
      handleSubmit();
    }
  }

  return (
    <React.Fragment>
      <BlogHead />
      <AnimationPage>
        <div className={classes.container}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.pageTitle} variant="h1">
                Статьи об автомобилях, ремонте, запчастях.
              </Typography>
            </Grid>
            <Grid container item xs={12} md={8}>
              <div className={classes.itemContainer}>
                {posts.map((post: IPost) => {
                  return <BlogPaper key={post.slug} post={post} />;
                })}
              </div>
              <Grid className={classes.pagination} item xs={12}>
                <Pagination
                  count={totalPages}
                  curPage={curPage}
                  categorySlug={categorySlug}
                />
              </Grid>
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
            </Grid>
          </Grid>
        </div>
      </AnimationPage>
    </React.Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = asString(context.params?.slug);
  const page = parseInt(asString(context.params?.page));

  const pageFrom = postsOnPage * (page - 1);
  const pageTo = pageFrom + postsOnPage;

  const posts = await getPostsByCategory(slug, pageFrom, pageTo);
  const promiseCategories = await getBlogCategories();
  const latestPosts = await getPosts(5);
  const categories = promiseCategories
    .slice()
    .filter((cat: IBlogCategory) => cat.postsCount > 0);

  let total = 0;
  let vseTotal = 0;
  vseTotal = await getTotalPosts();

  const find = categories.find((cat: IBlogCategory) => cat.slug === slug);
  total = find ? find?.postsCount : 0;

  let totalPages = Math.ceil(total / postsOnPage);
  if (slug === 'vse-kategorii') {
    totalPages = Math.ceil(vseTotal / postsOnPage);
  }

  if (posts.length == 0) {
    return {
      notFound: true,
    };
  }

  return {
    revalidate: REVALIDATE,
    props: {
      posts,
      categories,
      totalPages,
      curPage: page,
      categorySlug: slug,
      totalPosts: vseTotal,
      latestPosts,
    },
  };
}

function range(int: number): number[] {
  const array: number[] = [];
  for (let i = 0; i < int; i++) {
    array.push(i);
  }
  return array;
}

export async function getStaticPaths(context: GetStaticPathsContext) {
  const vseSlug = 'vse-kategorii';
  const promiseCategories = await getBlogCategories();
  const categories: IBlogCategory[] = promiseCategories
    .slice()
    .filter((cat: IBlogCategory) => cat.postsCount > 0);
  const total = await getTotalPosts();
  const paths: any[] = [];

  for (let vsePage of range(Math.ceil(total / postsOnPage))) {
    const path = { params: { slug: vseSlug, page: (vsePage + 1).toString() } };
    paths.push(path);
  }

  for (let category of categories) {
    for (const page of range(Math.ceil(category.postsCount / postsOnPage))) {
      const path = {
        params: { slug: category.slug, page: (page + 1).toString() },
      };
      paths.push(path);
    }
  }

  return {
    paths,
    fallback: false,
  };
}
