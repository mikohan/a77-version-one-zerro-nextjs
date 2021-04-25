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

  const [localPosts, setLocalPosts] = useState(posts);
  const [search, setSearch] = useState('');
  const router = useRouter();
  useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);

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
                {localPosts.map((post: IPost) => {
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

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = asString(context.params?.slug);
  const page = parseInt(asString(context.params?.page));

  const pageFrom = postsOnPage * (page - 1);
  const pageTo = pageFrom + postsOnPage;

  const posts = await getPostsByCategory(slug, pageFrom, pageTo);
  const promiseCategories = await getBlogCategories();

  let total = 0;
  let categories: IBlogCategory[] = [];
  let vseTotal = 0;
  vseTotal = await getTotalPosts();
  promiseCategories.forEach((category: IBlogCategory) => {
    if (category.postsCount > 0) {
      categories.push(category);
    }
  });

  const find = categories.find(
    (category: IBlogCategory) => category.slug === slug
  );
  total = find?.postsCount as number;

  let totalPages = Math.ceil(total / postsOnPage);
  if (slug === 'vse-kategorii') {
    totalPages = Math.ceil(vseTotal / postsOnPage);
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
    },
  };
}

interface IParams {
  slug: string;
  page: string;
}
interface IPath {
  params: IParams;
}

export async function getStaticPaths(context: GetStaticPathsContext) {
  const categories = await getBlogCategories();
  const total = await getTotalPosts();
  const paths: any[] = [];

  [...Array(total).keys()].map((page: number) => {
    const row = {
      params: {
        slug: 'vse-kategorii',
        page: Math.ceil((page + 1) / postsOnPage).toString(),
      },
    };
    if (!paths.some((path: IPath) => path.params.page === row.params.page)) {
      paths.push(row);
    }
  });

  for (let category of categories) {
    for (let page of [...Array(category.postsCount).keys()]) {
      const row = {
        params: {
          slug: category.slug,
          page: Math.ceil((page + 1) / postsOnPage).toString(),
        },
      };
      if (
        !paths.some(
          (path: IPath) =>
            path.params.page === row.params.page &&
            path.params.slug === row.params.slug
        )
      ) {
        paths.push(row);
      }
    }
  }

  return {
    paths,
    fallback: false,
  };
}
