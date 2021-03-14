import { gql } from '@apollo/client';
import { client } from './apolloClient';

// const client = ...

client
  .query({
    query: gql`
      query  {
        makes {
            id
            name
            slug
            country
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));
