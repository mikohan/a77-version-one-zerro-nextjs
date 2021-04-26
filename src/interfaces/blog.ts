import { IBlogCategory } from './category';
import { ICar } from '~/interfaces';

export interface IPage {
  slug: string;
  title: string;
  textHTML: string;
  text: string;
}

export interface IPost {
  slug: string;
  title: string;
  excerpt: string;
  text: string;
  image: string;
  partsCategory: IBlogCategory[];
  category: IBlogCategory[];
  author: string;
  date: Date;
  car: ICar[];
  totalCount?: number;
  count?: number;
  tags: string[];
}
