import { ITransFilter, IFilter } from '~/interfaces';

import { backServerUrl, imageServerUrl } from '~/config_local';
export { backServerUrl, imageServerUrl };

// Edn of server conf
export const backServerUrlRest = backServerUrl; // url for elastic search

export const autocompleteUrls = {
  number: `${backServerUrl}/api/product/findnumber`,
  string: `${backServerUrl}/api/product/autocomplete`,
};

export const apiUrl = 'http://localhost:8000/testcategory/';
export const elasticApiUrl = `${backServerUrl}/api/product/jsontest`;
export const elasticApiSearchUrl = `${backServerUrl}/api/product/searchapi`;
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
//Here starts account endpoints

export const userAddressesListUrl = `${backServerUrlRest}/api/user/addresses/`;
export const userRegisterUrl = `${backServerUrlRest}/api/rest-auth/registration/`;

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
export const popularProductsQuantity = 20;
export const containerMaxWidth = 'xl';

// Define order of rendering filters on page

export const pageSpecificFilters: { [key: string]: string[] } = {
  search: [
    'car_models',
    'price',
    'brands',
    'engines',
    'has_photo',
    'condition',
    'bages',
  ],
  category: [
    'category',
    'price',
    'brands',
    'engines',
    'has_photo',
    'condition',
    'bages',
  ],
};

//  Order of filter display on page
export const filtersConf = [
  'category',
  'car_models',
  'price',
  'brand',
  'engine',
  'has_photo',
  'condition',
  'bages',
];

export const transFilter: ITransFilter = {
  search: 'Поиск',
  category: 'Категории',
  car_models: 'Модель',
  engine: 'Двигатель',
  brand: 'Бренд',
  price: 'Цена',
  bages: 'Теги',
  has_photo: 'Фото',
  condition: 'Состояние',
};

// If priority high and higer show car model homepage if not shop product grid
export const carHomePagePriority = 4;
// Threshold when cars becoms ours or not
export const MODEL_PRIORITY = 3;
// Show car Home treshold weight (range 0-99)
export const carShowText = 90;

export const COMPANY_INFORMATION = {
  COMPANY_NAME: 'Ангара Запчасти',
  SHOP_PHONE: '+7 (495) 646-99-53',
  SHOP_PHONE_TWO: '8 (800) 299-99-53',
  SHOP_PHONE_THREE: '+7 (926) 515-38-74',
  SHOP_ADDRESS: 'г. Москва, Соловьиная Роща дoм 8 корпус 2',
  SHOP_EMAIL: 'angara77@gmail.com',
  SHOP_WORKING_HOURS: 'Ежедневно c 09:00 до 19:00',
  SHOP_CONTACT_TEXT:
    'Мы всегда открыты для сотрудничества и критики, Свяжитесь любым удобным способом.',
  RECVIZITY: {
    INN: 7733607590,
    KPP: 773301001,
    BIK: '044525555',
    OGRN: 5077746795418,
    ACC: '40702810170030424301',
  },
  FREE_SHIPPING_FROM: 8000,
  DELIVERY_COST_FROM: 290,
  POPULARITY_MAKE: 2,
  POPULARITY_MODEL: 3,
};
export const DIVIER_HEIGTH = '5rem';

export const BLOG_DATA = {
  DEFAULT_BLOG_IMAGE: '/images/local/defaultParts500.jpg',
  postsPerPage: 2,
};
export const footerData = COMPANY_INFORMATION;
// If product does not have description just show some dummy description
export const DEFAULT_EXCERPT = `
<div>
<p>В нашем интернет магазине всегда оригинальные запчасти и качественные аналоги.</p>
<p>Если у Вас есть вопросы по запчасти или по её качеству - звоните нашим менеджерам.</p>
<p>тел: ${COMPANY_INFORMATION.SHOP_PHONE}</p>
</div>
`;
