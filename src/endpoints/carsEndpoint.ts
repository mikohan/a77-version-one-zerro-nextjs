import { gql } from '@apollo/client';
import { IMake } from '~/interfaces/IMake';
import { client } from './apolloClient';

// const client = ...

export async function getMakes() {
  const promise = await client.query({
    query: gql`
      query {
        makes {
          id
          name
          slug
          country
          priority
        }
      }
    `,
  });
  return await promise.data.makes;
}

export async function getVehicles() {
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

export async function getVehicle(slug: string) {
  const query = gql`
    query vehicle($model: String!) {
      vehicle(model: $model) {
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
      model: slug,
    },
  });
  return await promise.data.vehicle;
}

export async function getVehicleByModel(make: string) {
  const query = gql`
    query vehiclesByMake($make: String!) {
      vehiclesByMake(make: $make) {
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
      make: make,
    },
  });
  return await promise.data.vehiclesByMake;
}
