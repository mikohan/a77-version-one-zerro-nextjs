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
    signIn: async (user: any, account: any, profile: any) => {
      //console.log(user, account, profile);
      return Promise.resolve(user);
    },
    jwt: async (token: any, user: any) => {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      user && (token.user = user);
      return Promise.resolve(token); // ...here
    },
    session: async (session: any, user: any) => {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/account/create',
  },
  /* secret: process.env.AUTH_SECRET, */
  /* jwt: { */
  /*   secret: process.env.AUTH_SECRET, */
  /* }, */
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
