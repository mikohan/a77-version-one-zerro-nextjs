// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const auth = {
      username: '831231',
      password: 'live_SNCQBi_CAyv6nkWaSAiGXscKUBuoI9POx9lilgV92jI',
    };
    const headers = {
      'Idempotence-Key': uuidv4(),
    };
    const data = req.body;

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
  } else {
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
  }
};
