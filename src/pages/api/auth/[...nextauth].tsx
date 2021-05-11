import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import axios from 'axios';

import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Yandex({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: 'Custom provider',
      credentials: {
        username: {
          label: 'username',
          type: 'text',
          placeholder: 'fjfj@fjfj.com',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        //call api here
        const promise = await axios.post(
          'http://localhost:8000/api/rest-auth/login/',
          credentials
        );
        console.log(promise.data);
        return promise.data;
      },
    }),
    /* Providers.Email({ */
    /*   server: { */
    /*     host: '', */
    /*     port: 0, */
    /*     auth: { */
    /*       user: '', */
    /*       pass: '', */
    /*     }, */
    /*   }, */
    /*   from: '', */
    /* }), */
  ],
  session: {
    jwt: true,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
