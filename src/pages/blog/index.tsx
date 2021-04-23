import React from 'react';
import Link from 'next/link';
import { IPost } from '~/interfaces';
import { getPosts } from '~/endpoints/blogEndpoint';
import { REVALIDATE } from '~/config';
import { GetStaticPropsContext } from 'next';
import url from '~/services/url';

interface IProps {
  posts: IPost[];
}

export default function Posts({ posts }: IProps) {
  return (
    <React.Fragment>
      {posts.map((post: IPost) => {
        return (
          <div>
            <Link href={url.post(post.slug)}>
              <div>{post.title}</div>
            </Link>
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
