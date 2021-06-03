/* import React from 'react'; */
/* import MainLayout from '~/layouts/Main'; */
/* import { Typography, Grid, Box, ListItem, List } from '@material-ui/core'; */
/* import FilterWidget from '~/components/main/FilterWidget'; */
/* import LeftSideBar from '~/components/main/LeftSideBar'; */
/* import { GetStaticPaths, GetStaticProps } from 'next'; */
/* import axios from 'axios'; */
/* import { categoriesUrl, productUrl, REVALIDATE, vehiclesUrl } from '~/config'; */
/* import { asString } from '~/helpers'; */
/* import { IProduct } from '~/interfaces/product'; */
/* import { getCategoryBySlug } from '~/endpoints/categories'; */
/* import { IShopCategory } from '~/interfaces/category'; */
/* import { IFilter } from '~/interfaces/filters'; */
/* import { useRouter } from 'next/router'; */
/* import { motion } from 'framer-motion'; */
/* import { durationPage } from '~/config'; */

/* interface IProps { */
/*   products: IProduct[]; */
/*   categories: IShopCategory; */
/* } */

/* export default function Products({ products, categories }: IProps) { */
/*   const items: IShopCategory[] = []; */
/*   const router = useRouter(); */
/*   const { make, model, category } = router.query; */

/*   items.push(categories); */

/*   const filterCategory: IFilter = { */
/*     type: 'category', */
/*     name: 'category', */
/*     slug: 'category', */
/*     value: 'golovka', */
/*     items: items, */
/*   }; */

/*   const filters = []; */
/*   filters.push(filterCategory); */
/*   return ( */
/*     <motion.div */
/*       exit={{ opacity: 0 }} */
/*       animate={{ opacity: 1 }} */
/*       initial={{ opacity: 0 }} */
/*       transition={{ duration: durationPage }} */
/*     > */
/*       <MainLayout> */
/*         <Grid item xs={12} sm={3} style={{ border: '1px solid grey' }}> */
/*           <LeftSideBar> */
/*             <FilterWidget filters={filters} /> */
/*           </LeftSideBar> */
/*         </Grid> */
/*         <Grid item xs={12} sm={9}> */
/*           <Grid item xs={6}> */
/*             <Typography variant="h1">{`${category} for ${make} ${model}`}</Typography> */
/*             <List> */
/*               {products.map((product: IProduct) => ( */
/*                 <ListItem key={product.id}> */
/*                   <Typography variant="h6">{product.name}</Typography> */
/*                 </ListItem> */
/*               ))} */
/*             </List> */
/*           </Grid> */
/*           <Grid item xs={6}></Grid> */
/*         </Grid> */
/*       </MainLayout> */
/*     </motion.div> */
/*   ); */
/* } */

/* export const getStaticProps: GetStaticProps = async (context) => { */
/*   const categorySlug = asString(context?.params?.category as string); */
/*   const url = `${productUrl}?category=${categorySlug}`; */
/*   const res = await axios.get(url); */
/*   const categories = await getCategoryBySlug(categorySlug); */

/*   return { */
/*     revalidate: REVALIDATE, */
/*     props: { */
/*       products: res.data, */
/*       categories, */
/*     }, */
/*   }; */
/* }; */

/* export const getStaticPaths: GetStaticPaths = async () => { */
/*   /1* const res = await axios.get(a); *1/ */
/*   const makeRes = await axios.get(vehiclesUrl); */
/*   const catRes = await axios.get(categoriesUrl); */

/*   const paths = []; */
/*   for (let vehicle of makeRes.data) { */
/*     for (let cat of catRes.data) { */
/*       if (cat.count > 0) { */
/*         paths.push({ */
/*           params: { */
/*             make: vehicle.make, */
/*             model: vehicle.slug, */
/*             category: cat.slug, */
/*           }, */
/*         }); */
/*       } */
/*     } */
/*   } */

/*   return { */
/*     fallback: false, */
/*     paths: paths, */
/*   }; */
/* }; */
export default function Page() {
  return <h1>Some products</h1>;
}
