import { IBlogCategory } from './category';

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
}
