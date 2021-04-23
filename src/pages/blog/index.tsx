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
    paper: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    a: {
      display: 'flex',
      flexDirection: 'column',
    },
    imageContainer: {},
    title: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: 'center',
    },
    image: {
      objectFit: 'cover',
    },
    main: {},
    some: {},
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
  console.log(post.image);
  const img = post.image
    ? `${imageServerUrl}${post.image}`
    : BLOG_DATA.DEFAULT_BLOG_IMAGE;
  return (
    <Paper className={classes.paper}>
      <Link href={url.post(post.slug)}>
        <a className={classes.a}>
          <Typography className={classes.title} variant="h6">
            {post.title}
          </Typography>
          <div className={classes.imageContainer}>
            <Image
              className={classes.image}
              src={img}
              width={900}
              height={600}
            />
          </div>
          <div>{post.title}</div>
        </a>
      </Link>
      <div>{parse(post.excerpt)}</div>
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
          <Grid className={classes.main} container>
            <Grid className={classes.some} container item xs={12} md={9}>
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
