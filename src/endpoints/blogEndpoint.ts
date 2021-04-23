import { gql } from '@apollo/client';
import { client, clientBlog } from './apolloClient';
import { IPage, IPost } from '~/interfaces';

// Together products
export async function getPost(slug: string): Promise<IPost[]> {
  const query = gql`
    query post($slug: String!) {
      post(slug: $slug) {
        slug
        title
        text
        image
        partsCategory {
          name
          slug
        }
        category {
          name
          slug
        }
      }
    }
  `;
  const promise = await clientBlog.query({
    query: query,
    variables: {
      slug,
    },
  });
  const data = await promise.data.post;
  return data;
}

export async function getPosts(): Promise<IPost[]> {
  const query = gql`
    query posts {
      posts {
        title
        slug
        image
        text
        partsCategory {
          name
          slug
        }
        category {
          name
          slug
        }
      }
    }
  `;
  const promise = await clientBlog.query({
    query: query,
  });
  return promise.data.posts;
}

export async function getPages(): Promise<IPage[]> {
  const query = gql`
  pages {
    title
    textHTML
    text
    }
  `;
  const promise = await client.query({
    query: query,
  });
  return promise.data.pages;
}

export async function getPage(slug: string): Promise<IPost[]> {
  const query = gql`
    query page($slug: String!) {
      page(slug: $slug) {
        slug
        title
        text
        image
        partsCategory {
          name
          slug
        }
        category {
          name
          slug
        }
      }
    }
  `;
  const promise = await clientBlog.query({
    query: query,
    variables: {
      slug,
    },
  });
  const data = await promise.data.page;
  return data;
}
