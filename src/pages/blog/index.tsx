import React from 'react';
import Link from 'next/link';
import { IPost } from '~/interfaces';
import { getPosts } from '~/endpoints/blogEndpoint';
import { REVALIDATE } from '~/config';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';

interface IProps {
  posts: IPost[];
}

export default function Posts({ posts }: IProps) {
  return (
    <React.Fragment>
      {posts.map((post: IPost) => {
        return (
          <div>
            <div>{post.title}</div>
            <div>{post.text}</div>
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

export async function getStaticPaths(context: GetStaticPathsContext) {
  const posts = await getPosts();
  const paths = posts.map((post: IPost) => ({ params: { post: post.slug } }));

  return {
    paths,
    fallback: false,
  };
}
