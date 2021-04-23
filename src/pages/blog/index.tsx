import React from 'react';
import Link from 'next/link';
import { IPost } from '~/interfaces';
import { getPosts } from '~/endpoints/blogEndpoint';
import {
  containerMaxWidth,
  imageServerUrl,
  REVALIDATE,
  BLOG_DATA,
} from '~/config';
import { GetStaticPropsContext } from 'next';
import url from '~/services/url';
import parse from 'html-react-parser';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import AnimationPage from '~/components/common/AnimationPage';
import { Grid, Typography, Container, Paper } from '@material-ui/core';
import BlogHead from '~/components/heads/BlogHead';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
    },
    sidePanel: {
      border: '1px solid blue',
    },
    pageTitle: {
      padding: theme.spacing(2),
    },
    paper: {
      marginTop: theme.spacing(5),
    },
    a: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: 'center',
      fontWeight: 600,
    },
    image: {
      objectFit: 'cover',
    },
    author: {
      color: theme.palette.text.secondary,
      paddingLeft: theme.spacing(5),
      paddingBottom: theme.spacing(2),
    },
    date: {
      paddingLeft: theme.spacing(2),
      fontWeight: 500,
      color: theme.palette.primary.main,
    },
    excerpt: {
      lineHeight: 1.75,
      textIndent: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
);

interface IProps {
  posts: IPost[];
}

interface IPaperProps {
  post: IPost;
}

function BlogPaper({ post }: IPaperProps) {
  const classes = useStyles();
  const img = post.image
    ? `${imageServerUrl}${post.image}`
    : BLOG_DATA.DEFAULT_BLOG_IMAGE;
  return (
    <Paper className={classes.paper}>
      <Link href={url.post(post.slug)}>
        <a className={classes.a}>
          <div>
            <Image
              className={classes.image}
              layout="responsive"
              src={img}
              width={900}
              height={600}
            />
          </div>
          <Typography className={classes.title} variant="h4">
            {post.title}
          </Typography>
        </a>
      </Link>
      <Typography className={classes.author} variant="body2">
        ---- {post.author}
        <Typography className={classes.date} variant="body2" component="span">
          {post.date}
        </Typography>
      </Typography>
      <Typography className={classes.excerpt} variant="body1">
        {post.excerpt}
      </Typography>
    </Paper>
  );
}

export default function Posts({ posts }: IProps) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <BlogHead />
      <AnimationPage>
        <Container maxWidth={containerMaxWidth}>
          <Grid container>
            <Grid container item xs={12} md={9}>
              <Typography className={classes.pageTitle} variant="h1">
                Статьи об автомобилях, ремонте, запчастях.
              </Typography>
              <div className={classes.container}>
                {posts.map((post: IPost) => {
                  return <BlogPaper key={post.slug} post={post} />;
                })}
              </div>
            </Grid>
            <Grid className={classes.sidePanel} item xs={12} md={3}>
              side panel
            </Grid>
          </Grid>
        </Container>
      </AnimationPage>
    </React.Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const posts = await getPosts();

  return {
    revalidate: REVALIDATE,
    props: {
      posts,
    },
  };
}
