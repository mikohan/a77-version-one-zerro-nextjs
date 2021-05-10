import NextAuth from 'next-auth';

import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.GitHub({
      clientId: '',
      clientSecret: '',
    }),
    Providers.Email({
      server: {
        host: '',
        port: 0,
        auth: {
          user: '',
          pass: '',
        },
      },
      from: '',
    }),
  ],
};
