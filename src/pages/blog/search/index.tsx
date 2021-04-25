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
import PaginationSearch from '~/components/blog/PaginationSearch';
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
    search: {
      fontWeight: 700,
      color: theme.palette.success.main,
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
  count: number;
  searchQuery: string;
}

export default function Posts({
  posts,
  categories,
  totalPages,
  curPage,
  categorySlug,
  totalPosts,
  count,
  searchQuery,
}: IProps) {
  const classes = useStyles();

  const initSearch = searchQuery ? searchQuery : '';
  const initCount = count ? count : 0;

  const [search, setSearch] = useState(initSearch);
  const [found, setFound] = useState(initCount);
  const router = useRouter();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setFound(0);
  }
  function handleSubmit() {
    router.push({
      pathname: `/blog/search`,
      query: {
        search: search,
        page: curPage,
      },
    });
    setFound(count);
  }
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (search) {
        handleSubmit();
      }
    }
  }

  function transResults(num: number): string {
    if (num === 1) {
      return 'результат';
    } else if (num >= 2 && num < 5) {
      return 'результата';
    } else {
      return 'результатов';
    }
  }

  return (
    <React.Fragment>
      <BlogHead />
      <AnimationPage>
        <div className={classes.container}>
          <Grid container>
            <Grid item xs={12}>
              <Box className={classes.pageTitle}>
                {found ? (
                  <Typography variant="body1" component="span">
                    Вы искали <span className={classes.search}>{search}</span>{' '}
                  </Typography>
                ) : (
                  <Typography variant="body1" component="span">
                    Вы ищите <span className={classes.search}>{search}</span>{' '}
                  </Typography>
                )}
                {found ? (
                  <Typography variant="body1" component="span">
                    найдено {found} {transResults(found)}
                  </Typography>
                ) : (
                  <Typography variant="body1" component="span">
                    Ничего не нашлось
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid container item xs={12} md={8}>
              <div className={classes.itemContainer}>
                {posts.map((post: IPost) => {
                  return <BlogPaper key={post.slug} post={post} />;
                })}
              </div>
              <Grid className={classes.pagination} item xs={12}>
                <PaginationSearch
                  count={totalPages}
                  curPage={curPage}
                  search={search}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const search = asString(context.query.search);
  let page = parseInt(asString(context.query.page));

  const pageFrom = postsOnPage * (page - 1);
  const pageTo = pageFrom + postsOnPage;
  let posts: IPost[] = [];
  if (!page) {
    page = 1;
  }

  const safe = search.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  posts = await searchPosts(safe, pageFrom, pageTo);

  let total = 0;
  if (posts.length && posts[0].totalCount) {
    total = posts[0].totalCount;
  }
  let count: number = 0;
  if (posts.length && posts[0].count) {
    count = posts[0].count;
  }
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
      count,
      searchQuery: search,
    },
  };
}
