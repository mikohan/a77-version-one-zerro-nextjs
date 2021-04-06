import { ITransFilter } from '~/interfaces';
export * from '~/data/shopData';

export const imageServerUrl = 'http://localhost:8000';

export const apiUrl = 'http://localhost:8000/testcategory/';
export const elasticApiUrl = 'http://localhost:8000/api/product/jsontest';
// export const elasticApiUrl = 'http://192.168.0.109:8000/api/product/jsontest';

export const vehiclesUrl = `${apiUrl}testproducts/vehicles/`;
// export const vehiclesUrl = `http://localhost:8000/api/product/getcarmodelsiteall/`;

export const productUrl = `http://localhost:8000/testcategory/testproducts/testproducts/`;

// This url getting all categories from API in flat fashon only one level of parent present
// Then category by slug will be taken from that url
// export const categoriesUrl = `http://localhost:8000/testcategory/testcategories/`;
export const categoriesUrl = 'http://localhost:8000/api/product/a77categories/';
export const getModelsByMakeUrl =
  'http://localhost:8000/testcategory/testmodels/';

export const makesUrl = 'http://localhost:8000/testcategory/testmakes/';

export const cagegoriesUrl =
  'http://localhost:8000/testcategory/categories-for-testes/';

// export const getCategoryBySlugUrl =
//  'http://localhost:8000/testcategory/testcategory/';

export const getCategoryBySlugUrl =
  'http://localhost:8000/api/product/a77category/';

export const REVALIDATE: number = 20; // Revalidate time for all pages in seconds

export const durationPage: number = 0.5; // Animation between pages

export const cookiesAge = {
  cookieCurrentCarMaxAge: 3600000000,
  cookierUserMaxAge: 3600000000,
};

export const firstSlug = 'car';

export const SITE_DOMAIN = 'ANGARA77.COM';
export const SITE_DOMAIN_FULL = 'https://angara77.com';
// Changes product card size in the products grid
export const prodCardSize = 225;
export const defaultShopPageLayout = 'grid';
export const pageSize = 20;
export const popularProductsQuantity = 10;
export const containerMaxWidth = 'xl';

// Define order of rendering filters on page
export const filtersConf = [
  'category',
  'price',
  'brand',
  'engine',
  'has_photo',
  'condition',
  'bages',
];

export const transFilter: ITransFilter = {
  category: 'Категории',
  engine: 'Двигатель',
  brand: 'Бренд',
  price: 'Цена',
  bages: 'Теги',
  has_photo: 'Фото',
  condition: 'Состояние',
};

// If priority high and higer show car model homepage if not shop product grid
export const carHomePagePriority = 4;
