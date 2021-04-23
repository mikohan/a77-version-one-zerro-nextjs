import React from 'react';
import Link from 'next/link';
import { IPost } from '~/interfaces';
import { getPosts, getPost } from '~/endpoints/blogEndpoint';
import { REVALIDATE } from '~/config';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { asString } from '~/helpers';
import parse from 'html-react-parser';
import { addMainUrlInPostImage } from '~/helpers';

interface IProps {
  post: IPost;
}

export default function Posts({ post }: IProps) {
  const newText = addMainUrlInPostImage(post.text);
  return (
    <React.Fragment>
      <div>
        <div>{post.title}</div>
        <div>{parse(newText)}</div>
      </div>
    </React.Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  let slug = '';
  if (context.params?.post) {
    slug = asString(context.params?.post);
  }
  const post = await getPost(slug);

  return {
    revalidate: REVALIDATE,
    props: {
      post,
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
