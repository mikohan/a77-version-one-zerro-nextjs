import axios from 'axios';

export async function getProductsByCar(slug: string): Promise<any> {
  const prom = await axios(
    `http://localhost:8000/api/product/jsontest?q=${slug}`
  );
  return prom.data;
}
