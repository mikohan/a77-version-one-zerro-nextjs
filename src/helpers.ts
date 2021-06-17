import { ICar } from '~/interfaces/ICar';
import cookie from 'cookie';
import { IMake } from './interfaces/IMake';
import { imageServerUrl } from '~/config';
// Comment for gh

export function asString(query: string | string[] | undefined): string {
  if (Array.isArray(query)) {
    return query[0];
  }
  if (typeof query === 'undefined') {
    return '';
  }
  return query;
}

// Url builder for filters
export const urlBuilder = (
  query: string | string[],
  event: React.ChangeEvent<HTMLInputElement>
): string[] => {
  let brands: string[] = [];
  if (Array.isArray(query)) {
    brands = [...query];
  } else if (query) {
    brands.push(query);
  }

  if (event.target.checked) {
    brands.push(event.target.value);
  }
  if (event.target.checked === false) {
    brands = brands.filter((val: any) => {
      return val !== event.target.value;
    });
  }

  return brands;
};

export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

export function toLoverSpace(string: string): string {
  return string.replace(' ', '').toLowerCase();
}

// Makes distinct array of makes from all vehicles
export const buildMakes = (array: ICar[]): IMake[] => {
  return Array.from(new Set(array.map((item: ICar) => item.make)));
};
// Another variant for upper function
export function extractor(vehicles: ICar[]): IMake[] {
  let makes: IMake[] = [];
  try {
    for (let i = 0; i < vehicles.length; i++) {
      if (!makes.includes(vehicles[i].make)) {
        makes.push(vehicles[i].make);
      }
    }
  } catch (e) {
    console.log('Error while extractin makes from vehicles in helpers.ts');
  }
  return makes;
}

export function booleanToRus(name: string): string {
  if (name === '1') {
    name = 'Есть';
  } else {
    name = 'Нет';
  }
  return name;
}

export function conditionToRus(name: string): string {
  if (name.toLowerCase() === 'new') {
    name = 'Новый';
  } else if (name.toLowerCase() === 'secondgand') {
    name = 'б/у';
  }
  return name;
}

export function addMainUrlInPostImage(postText: string): string {
  const regex = /src="(.+?)"/;
  const match = postText.match(regex);
  if (match) {
    const finStr = postText.replace(
      regex,
      `src="${imageServerUrl}${match![1]}"`
    );
    return finStr;
  }
  return postText;
}
// Calculate reading Time
export function readingTime(text: string): number {
  const readingSpeed = 225;
  const arr = text.split(' ');
  return Math.ceil(arr.length / readingSpeed);
}
