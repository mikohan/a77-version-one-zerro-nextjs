import { ITransFilter, IFilter } from '~/interfaces';

import {
  backServerUrl,
  imageServerUrl,
  SITE_DOMAIN_FULL,
  YANDEX_CREDENTIALS,
} from '~/config_local';
export {
  backServerUrl,
  imageServerUrl,
  SITE_DOMAIN_FULL,
  YANDEX_CREDENTIALS,
};

// Edn of server conf
export const backServerUrlRest = backServerUrl; // url for elastic search

export const autocompleteUrls = {
  number: `${backServerUrl}/api/product/findnumber`,
  string: `${backServerUrl}/api/product/autocomplete`,
};

export const apiUrl = `{backServerUrl}/testcategory/`;
export const elasticApiUrl = `${backServerUrl}/api/product/jsontest`;
export const elasticApiSearchUrl = `${backServerUrl}/api/product/searchapi`;
// export const elasticApiUrl = 'http://192.168.0.109:8000/api/product/jsontest';

export const vehiclesUrl = `${apiUrl}testproducts/vehicles/`;
// export const vehiclesUrl = `{backServerUrl}/api/product/getcarmodelsiteall/`;

export const productUrl = `{backServerUrl}/testcategory/testproducts/testproducts/`;

// This url getting all categories from API in flat fashon only one level of parent present
// Then category by slug will be taken from that url
// export const categoriesUrl = `{backServerUrl}/testcategory/testcategories/`;
export const categoriesUrl = `{backServerUrl}/api/product/a77categories/`;
export const getModelsByMakeUrl = `{backServerUrl}/testcategory/testmodels/`;

export const makesUrl = `{backServerUrl}/testcategory/testmakes/`;

export const cagegoriesUrl =
  `{backServerUrl}/testcategory/categories-for-testes/`;

// export const getCategoryBySlugUrl =
//  '{backServerUrl}/testcategory/testcategory/';
//Here starts account endpoints

export const userAddressesListUrl = `${backServerUrlRest}/api/user/addresses/`;
export const userRegisterUrl = `${backServerUrlRest}/api/rest-auth/registration/`;

export const getCategoryBySlugUrl =
  `{backServerUrl}/api/product/a77category/`;

export const REVALIDATE: number = 20; // Revalidate time for all pages in seconds

export const durationPage: number = 0.5; // Animation between pages

export const cookiesAge = {
  cookieCurrentCarMaxAge: 3600000000,
  cookierUserMaxAge: 3600000000,
};

export const firstSlug = 'car';

export const SITE_DOMAIN = 'ANGARA77.COM';
// Changes product card size in the products grid
export const prodCardSize = 225;
export const defaultShopPageLayout = 'grid';
export const pageSize = 20;
export const popularProductsQuantity = 20;
export const containerMaxWidth = 'xl';

// Define order of rendering filters on page

// Defines which filters will be on specific page
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
  autogoods: [
    'car_models',
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

export const filterPossibleValues: string[] = [
  'search',
  'category',
  'car_models',
  'engine',
  'brand',
  'price',
  'bages',
  'has_photo',
  'condition',
  'page_size',
  'page_from',
  'page',
  'filters_chk',
  'sort_price',
];

// If priority high and higer show car model homepage if not shop product grid
export const carHomePagePriority = 4;
// Threshold when cars becoms ours or not
export const MODEL_PRIORITY = 3;
// Show car Home treshold weight (range 0-99)
export const carShowText = 90;

export const COMPANY_INFORMATION = {
  COMPANY_NAME: 'Партс Хаб',
  COMPANY_WEBSITE: 'partshub.ru',
  COMPANY_NAME_ENG: 'PartsHub',
  COMPANY_NAME_LOGO: 'PARTSHUB',
  SHOP_PHONE: '+7 (495) 777-93-75',
  SHOP_PHONE_TWO: '+7 (495) 777-93-75',
  SHOP_PHONE_THREE: '+7 (926) 515-38-74',
  SHOP_ADDRESS: 'г. Москва, Соловьиная Роща дoм 8 корпус 2',
  SHOP_EMAIL: 'angara77@gmail.com',
  SHOP_WORKING_HOURS: 'Ежедневно c 09:00 до 19:00',
  SHOP_WORKING_HOURS_FROM: '09:00',
  SHOP_WORKING_HOURS_TO: '19:00',
  SHOP_CONTACT_TEXT:
    'Мы всегда открыты для сотрудничества и критики, Свяжитесь любым удобным способом.',
  RECVIZITY: {
    NAME: 'ИП Востриков В.В.',
    INN: '032500305250',
    KPP: null,
    BANK: 'ПАО СБЕРБАНК',
    BIK: '044525225',
    OGRN: 319774600171846,
    ACC: '40802810038000147463',
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
