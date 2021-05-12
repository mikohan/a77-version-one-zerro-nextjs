import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import axios from 'axios';
import { imageServerUrl } from '~/config';

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
          label: 'Введите Емайл',
          type: 'text',
          placeholder: 'your@email.com',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        //call api here
        const promise = await axios.post(
          'http://localhost:8000/api/user/authenticate/',
          credentials
        );
        const user = promise.data.user;
        return user;
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
  pages: {
    signIn: '/account/create',
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
