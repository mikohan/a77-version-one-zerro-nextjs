export const apiUrl = 'http://localhost:8000/testcategory/';

export const vehiclesUrl = `${apiUrl}testproducts/vehicles/`;

export const productUrl = `http://localhost:8000/testcategory/testproducts/testproducts/`;

// This url getting all categories from API in flat fashon only one level of parent present
// Then category by slug will be taken from that url
export const categoriesUrl = `http://localhost:8000/testcategory/testcategories/`;

export const getModelsByMakeUrl =
  'http://localhost:8000/testcategory/testmodels/';

export const makesUrl = 'http://localhost:8000/testcategory/testmakes/';

export const cagegoriesUrl =
  'http://localhost:8000/testcategory/categories-for-testes/';

export const getCategoryBySlugUrl =
  'http://localhost:8000/testcategory/testcategory/';

export const REVALIDATE: number = 20; // Revalidate time for all pages in seconds

export const durationPage: number = 0.5; // Animation between pages

export const cookiesAge = {
  cookieCurrentCarMaxAge: 3600000000,
  cookierUserMaxAge: 3600000000,
};
