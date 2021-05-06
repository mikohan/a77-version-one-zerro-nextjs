import { gql } from '@apollo/client';
import { client, clientBlog } from './apolloClient';
import { IBlogCategory, IPage, IPost } from '~/interfaces';

// Total posts count
export async function getTotalPosts(): Promise<number> {
  const query = gql`
    query totalPosts {
      totalPosts
    }
  `;
  const promise = await clientBlog.query({
    query: query,
  });
  return promise.data.totalPosts;
}
// Get blog categories
export async function getBlogCategories(): Promise<IBlogCategory[]> {
  const query = gql`
    query categories {
      categories {
        id
        name
        slug
        postsCount
      }
    }
  `;
  const promise = await clientBlog.query({
    query: query,
  });
  return promise.data.categories;
}
// Get posts by category
export async function getPostsByCategory(
  slug: string,
  pageFrom: number,
  pageTo: number
): Promise<IPost[]> {
  const query = gql`
    query postsByCategory($slug: String!, $pageFrom: Int!, $pageTo: Int!) {
      postsByCategory(slug: $slug, pageFrom: $pageFrom, pageTo: $pageTo) {
        title
        excerpt
        slug
        image
        text
        author
        date
        tags
        car {
          model
          slug
          make {
            name
            slug
          }
        }
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
      pageFrom,
      pageTo,
    },
  });
  return promise.data.postsByCategory;
}

// Search post

export async function searchPosts(
  search: string,
  pageFrom: number,
  pageTo: number
): Promise<IPost[]> {
  const query = gql`
    query postsSearch($search: String!, $pageFrom: Int!, $pageTo: Int!) {
      postsSearch(search: $search, pageFrom: $pageFrom, pageTo: $pageTo) {
        slug
        title
        text
        image
        author
        date
        totalCount
        count
        tags
        excerpt
        car {
          model
          slug
          make {
            name
            slug
          }
        }
        category {
          id
          name
          slug
        }
      }
    }
  `;
  const promise = await clientBlog.query({
    query: query,
    variables: {
      search,
      pageFrom,
      pageTo,
    },
  });
  const data = await promise.data.postsSearch;
  return data;
}

// Together products
export async function getPost(slug: string): Promise<IPost> {
  const query = gql`
    query post($slug: String!) {
      post(slug: $slug) {
        slug
        title
        text
        excerpt
        image
        author
        date
        count
        totalCount
        tags
        car {
          model
          slug
          make {
            name
            slug
          }
        }
        partsCategory {
          id
          name
          slug
        }
        category {
          id
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

export async function getPosts(limit: number = 0): Promise<IPost[]> {
  const query = gql`
    query posts($limit: Int!) {
      posts(limit: $limit) {
        title
        excerpt
        slug
        image
        text
        author
        date
        tags
        car {
          model
          slug
          make {
            name
            slug
          }
        }
        partsCategory {
          id
          name
          slug
        }
        category {
          id
          name
          slug
        }
      }
    }
  `;
  const promise = await clientBlog.query({
    query: query,
    variables: {
      limit,
    },
  });
  return promise.data.posts;
}

export async function getPostsByCar(
  model: string,
  limit: number = 10
): Promise<IPost[]> {
  const query = gql`
    query postsByCar($model: String!, $limit: Int!) {
      postsByCar(model: $model, limit: $limit) {
        title
        excerpt
        slug
        image
        text
        author
        date
        tags
        car {
          model
          slug
          make {
            name
            slug
          }
        }
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
      model,
      limit,
    },
  });
  return promise.data.postsByCar;
}

export async function getPages(): Promise<IPage[]> {
  const query = gql`
  pages {
    title
    slug
    textHTML
    text
    }
  `;
  const promise = await client.query({
    query: query,
  });
  return promise.data.pages;
}

export async function getPage(slug: string): Promise<IPage> {
  const query = gql`
    query page($slug: String!) {
      page(slug: $slug) {
        slug
        title
        text
        textHTML
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
