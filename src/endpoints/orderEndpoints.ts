import axios from 'axios';
import { IOrder } from '~/interfaces';
import { backServerUrl } from '~/config';

export async function sendOrder(order: IOrder): Promise<any> {
  const urlAxios = `${backServerUrl}/orders/`;
  console.log(JSON.stringify(order));
  const response = await axios.post(urlAxios, order);
  return response;
}

