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
        try {
          const promise = await axios.post(
            'http://localhost:8000/api/user/authenticate/',
            credentials
          );
          const user = promise.data.user;
          const retSession = {
            token: promise.data.token,
            ...user,
          };
          console.log(retSession);
          return retSession;
        } catch (e) {
          console.log('FUcks up');
          throw '/account/create?error=credentials_error';
        }
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
  callbacks: {
    jwt: async (token: any, user: any) => {
      if (user) {
        token.accessToken = user.data.token;
      }
      console.log(token, 'Token', user, 'User');
      return token;
    },
    session: async (session: any, token: any) => {
      session.accessToken = token.accessToken;
      console.log(session, 'Session');
      return session;
    },
  },
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/account/create',
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
