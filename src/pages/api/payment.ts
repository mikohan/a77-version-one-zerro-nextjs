// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { YANDEX_CREDENTIALS } from '~/config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const auth = {
      username: YANDEX_CREDENTIALS.username,
      password: YANDEX_CREDENTIALS.password,
    };
    const headers = {
      'Idempotence-Key': uuidv4(),
    };
    const data = req.body;

    try {
      const response = await axios.post(
        'https://api.yookassa.ru/v3/payments',
        data,
        {
          auth: auth,
          headers: headers,
        }
      );
      res.statusCode = 201;
      res.json(response.data);
    } catch (error) {
      res.statusCode = 500;
      console.log(error);
      res.send({});
    }
  } else {
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
  }
};
