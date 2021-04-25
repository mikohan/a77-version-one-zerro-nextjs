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
import {
  GetStaticPropsContext,
  GetStaticPathsContext,
  GetServerSidePropsContext,
} from 'next';
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
import { getCategories } from '~/endpoints/categories';

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
}

export default function Posts({
  posts,
  categories,
  totalPages,
  curPage,
  categorySlug,
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
        page: curPage,
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
              <LatestPosts posts={posts} />
            </Grid>
          </Grid>
        </div>
      </AnimationPage>
    </React.Fragment>
  );
}

function distinctArray(array: IBlogCategory[]): IBlogCategory[] {
  const result: IBlogCategory[] = [];
  const map = new Map();
  for (const item of array) {
    if (!map.has(item.id)) {
      map.set(item.id, true);
      result.push({
        id: item.id,
        name: item.name,
        slug: item.slug,
        postsCount: item.postsCount,
      });
    }
  }
  return result;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const search = asString(context.query.search);
  let page = parseInt(asString(context.query.page));

  const pageFrom = postsOnPage * (page - 1);
  const pageTo = pageFrom + postsOnPage;
  let posts: IPost[] = [];
  if (!page) {
    page = 1;
  }

  if (!search) {
    /* posts = await getPosts(); */
  } else {
    const safe = search.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    //posts = await searchPosts(safe, pageFrom, pageTo);
  }
  posts = await searchPosts(search, pageFrom, pageTo);
  console.log(posts[0].category);

  let total = 0;
  if (posts.length && posts[0].totalCount) {
    total = posts[0].totalCount;
  }
  const count = posts.length;
  const promiseCategories = await getBlogCategories();

  let categories: IBlogCategory[] = [];
  promiseCategories.forEach((category: IBlogCategory) => {
    if (category.postsCount > 0) {
      if (!categories.some((cat: IBlogCategory) => cat.slug === category.slug))
        categories.push(category);
    }
  });

  const totalPages = Math.ceil(count / postsOnPage);

  return {
    props: {
      posts,
      categories,
      totalPages,
      curPage: page,
      totalPosts: total,
    },
  };
}
