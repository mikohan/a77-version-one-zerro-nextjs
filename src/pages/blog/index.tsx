import React from 'react';
import Link from 'next/link';
import { IPost } from '~/interfaces';
import { getPosts } from '~/endpoints/blogEndpoint';
import { containerMaxWidth, REVALIDATE } from '~/config';
import { GetStaticPropsContext } from 'next';
import url from '~/services/url';
import parse from 'html-react-parser';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { addMainUrlInPostImage } from '~/helpers';
import AnimationPage from '~/components/common/AnimationPage';
import { Grid, Box, Container } from '@material-ui/core';
import BlogHead from '~/components/heads/BlogHead';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      border: '1px solid pink',
      padding: theme.spacing(2),
    },
    sidePanel: {
      border: '1px solid blue',
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
  return (
    <div>
      <Link href={url.post(post.slug)}>
        <div>{post.title}</div>
      </Link>
      <div>{parse(post.excerpt)}</div>
    </div>
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
