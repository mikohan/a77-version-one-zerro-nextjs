import { gql } from '@apollo/client';
import { IMake } from '~/interfaces/IMake';
import { ICar } from '~/interfaces/ICar';
import { client } from './apolloClient';
import { IRating } from '~/interfaces/product';
import axios from 'axios';
import { backServerUrl } from '~/config';

export async function carWithCountAndCats(model: string, limit?: number) {
  let url = '';
  if (limit) {
    url = `${backServerUrl}/api/product/by-car-count-cat?make=${model}&limit=${limit}`;
  } else {
    url = `${backServerUrl}/api/product/by-car-count-cat?make=${model}`;
  }
  const response = await axios.get(url);
  return response.data;
}

export async function createOrUpdateRatings(
  score: number,
  productId: number,
  userId: string
) {
  const mutation = gql`
    mutation($score: Int!, $productId: ID!, $userId: String) {
      createRating(score: $score, productId: $productId, userId: $userId) {
        rating {
          score
          product
          autouser
        }
      }
    }
  `;
  const promise = await client.mutate({
    mutation: mutation,
    variables: {
      score,
      productId,
      userId,
    },
  });
  return await promise.data.createRating;
}

export async function createOrUpdateUser(userId: string) {
  const mutation = gql`
    mutation($userId: String!) {
      createAutoUser(userId: $userId) {
        user {
          userId
        }
      }
    }
  `;
  const promise = await client.mutate({
    mutation: mutation,
    variables: {
      userId: userId,
    },
  });
  return await promise.data.createAutoUser;
}

// const client = ...
export async function getMake(slug: string): Promise<IMake> {
  const query = gql`
    query make($slug: String!) {
      make(slug: $slug) {
        id
        name
        rusname
        slug
        country
        priority
        image
      }
    }
  `;
  const promise = await client.query({
    query: query,
    variables: {
      slug: slug,
    },
  });
  return await promise.data.make;
}

export async function getMakes(): Promise<IMake[]> {
  const promise = await client.query({
    query: gql`
      query {
        makes {
          id
          name
          rusname
          slug
          country
          priority
          image
        }
      }
    `,
  });
  return await promise.data.makes;
}

export async function getVehicles(): Promise<ICar[]> {
  const promise = await client.query({
    query: gql`
      query {
        vehicles {
          id
          model
          year
          engine
          priority
          image
          weight
          make {
            id
            name
            country
            priority
            slug
          }
          slug
        }
      }
    `,
  });
  return await promise.data.vehicles;
}

export async function getRating(
  productId: number,
  userId: string
): Promise<IRating> {
  const query = gql`
    query rating($productId: Int!, $userId: String!) {
      rating(productId: $productId, userId: $userId) {
        score
        product
        autouser
      }
    }
  `;
  const promise = await client.query({
    query: query,
    variables: {
      productId,
      userId,
    },
  });
  return await promise.data.rating;
}

export async function getRatingAvg(productId: number): Promise<IRating> {
  const query = gql`
    query ratingAvg($productId: Int!) {
      ratingAvg(productId: $productId) {
        ratingAvg
      }
    }
  `;
  const promise = await client.query({
    query: query,
    variables: {
      productId,
    },
  });
  return await promise.data.ratingAvg;
}

export async function getVehicle(slug: string): Promise<ICar> {
  const query = gql`
    query vehicle($slug: String!) {
      vehicle(slug: $slug) {
        id
        model
        year
        engine
        priority
        image
        weight
        history
        liquids
        to
        make {
          id
          name
          country
          priority
          slug
        }
        slug
      }
    }
  `;
  const promise = await client.query({
    query: query,
    variables: {
      slug: slug,
    },
  });
  const data = await promise.data.vehicle;
  return data;
}

export async function getVehiclesByMake(slug: string): Promise<ICar[]> {
  const query = gql`
    query vehiclesByMake($slug: String!) {
      vehiclesByMake(slug: $slug) {
        id
        model
        year
        engine
        count
        priority
        image
        weight
        make {
          id
          name
          country
          priority
          slug
        }
        slug
      }
    }
  `;
  const promise = await client.query({
    query: query,
    variables: {
      slug: slug,
    },
  });
  const data = await promise.data.vehiclesByMake;
  return data;
}

export async function getVehiclesByPriority(priority: number): Promise<ICar[]> {
  const query = gql`
    query vehiclesByPriority($priority: Int!) {
      vehiclesByPriority(priority: $priority) {
        id
        model
        year
        engine
        priority
        image
        weight
        make {
          id
          name
          country
          priority
          slug
        }
        slug
      }
    }
  `;
  const promise = await client.query({
    query: query,
    variables: {
      priority,
    },
  });
  const data = await promise.data.vehiclesByPriority;
  return data;
}
