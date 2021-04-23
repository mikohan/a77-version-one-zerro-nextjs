import React from 'react';
import Link from 'next/link';
import { IPost } from '~/interfaces';
import { getPosts } from '~/endpoints/blogEndpoint';
import { REVALIDATE } from '~/config';
import { GetStaticPropsContext } from 'next';
import url from '~/services/url';
import parse from 'html-react-parser';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(20),
    },
  })
);

interface IProps {
  posts: IPost[];
}

export default function Posts({ posts }: IProps) {
  const classes = useStyles();
  return (
    <React.Fragment>
      {posts.map((post: IPost) => {
        return (
          <div>
            <Link href={url.post(post.slug)}>
              <div>{post.title}</div>
            </Link>
            <div>{parse(post.text)}</div>
          </div>
        );
      })}
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
