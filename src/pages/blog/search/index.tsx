import React, { useEffect, useState } from 'react';
import { IBlogCategory, IPost, IProduct } from '~/interfaces';
import {
  getBlogCategories,
  getPosts,
  searchPosts,
} from '~/endpoints/blogEndpoint';
import { getLatestProducts } from '~/endpoints/productEndpoint';
import { BLOG_DATA, COMPANY_INFORMATION } from '~/config';
import { GetServerSidePropsContext } from 'next';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import AnimationPage from '~/components/common/AnimationPage';
import { Grid, Typography, Box } from '@material-ui/core';
import BlogHead from '~/components/heads/BlogHead';
import SearchField from '~/components/blog/SearchBar';
import BlogPaper from '~/components/blog/PostSingleRow';
import CategoryList from '~/components/blog/CategoryList';
import PaginationSearch from '~/components/blog/PaginationSearch';
import { asString } from '~/helpers';
import LatestPosts from '~/components/blog/LatestPosts';
import { useRouter } from 'next/router';
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
    pageTitle: {
      paddingBottom: theme.spacing(2),
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
      fontSize: '1.2rem',
      fontStyle: 'italic',
      color: theme.palette.success.main,
      marginRight: theme.spacing(1),
    },
    breads: {
      paddingTop: theme.spacing(2),
    },
  })
);

interface IProps {
  posts: IPost[];
  categories: IBlogCategory[];
  totalPages: number;
  curPage: number;
  latestPosts: IPost[];
  totalPosts: number;
  count: number;
  searchQuery: string;
  latestProducts: IProduct[];
}

export default function Posts({
  posts,
  categories,
  totalPages,
  curPage,
  latestPosts,
  totalPosts,
  count,
  searchQuery,
  latestProducts,
}: IProps) {
  const breadCrumbs = [
    { name: `${COMPANY_INFORMATION.COMPANY_NAME_ENG}`, path: '/' },
    { name: 'Блог', path: url.blog() },
  ];
  const classes = useStyles();

  const initSearch = searchQuery ? searchQuery : '';
  const initCount = count ? count : 0;

  const [search, setSearch] = useState(initSearch);
  const [found, setFound] = useState(initCount);
  const router = useRouter();
  useEffect(() => {
    setFound(count);
  }, [count]);
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setFound(0);
  }
  function handleSubmit() {
    setFound(count);
    router.push(url.blogSearch(search, 1));
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
      <BlogHead breads={breadCrumbs} />
      <AnimationPage id="blogSearchPage">
        <div className={classes.container}>
          <Grid container>
            <Grid item xs={12}>
              <Grid className={classes.breads} item xs={12}>
                <BreadCrumbs breadCrumbs={breadCrumbs} />
              </Grid>
              <Grid
                container
                item
                justify="center"
                className={classes.pageTitle}
              >
                {found ? (
                  <Typography variant="body1" component="span">
                    Вы искали <span className={classes.search}>{search}</span>{' '}
                  </Typography>
                ) : (
                  <Typography variant="body1" component="span">
                    Вы ищите <span className={classes.search}>{search}</span>{' '}
                  </Typography>
                )}
                {found && found !== 100 ? (
                  <Typography variant="body1" component="span">
                    найдено {found} {transResults(found)}
                  </Typography>
                ) : (
                  ''
                )}
              </Grid>
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
              <LatestPosts posts={latestPosts} />
              <LatestProducts products={latestProducts} />
            </Grid>
          </Grid>
        </div>
      </AnimationPage>
    </React.Fragment>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const latestProductsPromise = await getLatestProducts(5);
  const latestProducts: IProduct[] = translateProducts(
    latestProductsPromise.hits.hits
  );
  const search = asString(context.query.search);
  let page = parseInt(asString(context.query.page));

  const pageFrom = postsOnPage * (page - 1);
  const pageTo = pageFrom + postsOnPage;
  let posts: IPost[] = [];
  if (!page) {
    page = 1;
  }

  const latestPosts = await getPosts(5);

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
      latestPosts,
      latestProducts,
    },
  };
}
