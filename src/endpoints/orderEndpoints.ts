import axios from 'axios';
import { IOrder } from '~/interfaces';
import { backServerUrlRest } from '~/config';

export async function sendOrder(order: IOrder): Promise<any> {
  const urlAxios = `${backServerUrlRest}/orders/`;
  const response = await axios.post(urlAxios, order);
  console.log(response);
  return response;
}
