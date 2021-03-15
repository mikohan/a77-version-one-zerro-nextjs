import { gql } from '@apollo/client';
import { IMake } from '~/interfaces/IMake';
import { ICar } from '~/interfaces/ICar';
import { client } from './apolloClient';

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

export async function getVehicle(slug: string): Promise<ICar> {
  const query = gql`
    query vehicle($slug: String!) {
      vehicle(slug: $slug) {
        id
        model
        year
        engine
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
  return await promise.data.vehicle;
}

export async function getVehicleByModel(slug: string): Promise<ICar> {
  const query = gql`
    query vehiclesByMake($slug: String!) {
      vehiclesByMake(slug: $slug) {
        id
        model
        year
        engine
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
  return await promise.data.vehiclesByMake;
}
