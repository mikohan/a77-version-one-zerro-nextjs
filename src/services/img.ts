import { imageServerUrl } from '~/config';

export default function imgUrlrebuilder(img: string): string {
  const regex = /(http|https)/;
  let image = '/images/local/defaultParts245.jpg';
  if (regex.test(img as string)) {
    image = img as string;
  } else {
    image = `${imageServerUrl}${img}`;
  }
  return image;
}
