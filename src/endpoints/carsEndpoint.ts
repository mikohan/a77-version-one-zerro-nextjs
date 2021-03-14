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
          make
          slug
        }
      }
    `,
  });
  return await promise.data.vehicles;
}

export async function getVehicle(slug: string) {
  const promise = await client.query({
    query: gql`
      query {
        vehicles(slug: ${slug}) {
          id
          model
          year
          engine
          make
          slug
        }
      }
    `,
  });
  return await promise.data.vehicles;
}

export async function getVehicleByModel(model: string) {
  const promise = await client.query({
    query: gql`
      query {
        vehiclesByMake(make: ${model} {
          id
          model
          year
          engine
          make
          slug
        }
      }
    `,
  });
  return await promise.data.vehicles;
}
