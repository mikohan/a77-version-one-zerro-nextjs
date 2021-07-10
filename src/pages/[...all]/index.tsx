import React from 'react';
import { GetServerSideProps } from 'next';
import url from '~/services/url';
import { getVehicle } from '~/endpoints/carsEndpoint';
import { getProductByOneC } from '~/endpoints/productEndpoint';
import {
  cars,
  ang_subcategories,
  big_cats,
  car_links,
} from '~/data/redirectData';
import { parts_uniq } from '~/data/parts_uniq_link_one';

function Make() {
  return <React.Fragment></React.Fragment>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let str = context.params;
  let params: string[] = [];
  if (str) {
    const arr: string[] = str.all as any;
    if (arr) {
      params = arr[0].split('-');
    }
  }

  // old category and subcat redirect
  if (params[0] === 'category') {
    const car_slug: string = cars[params[1]];
    const car = await getVehicle(car_slug);
    const category_slug: string = big_cats[params[2]];
    return {
      redirect: {
        permanent: true,
        destination: url.category(car.make.slug, car.slug, category_slug),
      },
    };
  } else if (params[0] === 'subcat') {
    const car_slug: string = cars[params[1]];
    const car = await getVehicle(car_slug);
    const category_slug: string = ang_subcategories[params[2]];
    return {
      redirect: {
        permanent: true,
        destination: url.category(car.make.slug, car.slug, category_slug),
      },
    };
  }

  // Porter old parts redirect
  if (params[0] === 'porter') {
    try {
      const onec = parseInt(params[2]);
      const prom = await getProductByOneC(onec);
      return {
        redirect: {
          permanent: true,
          destination: url.product(prom.slug),
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }

  // New cars part redirect
  if (params[0] === 'part') {
    const arr: string[] = str?.all as any;
    const link: string = arr[2];

    try {
      const onec = parseInt(parts_uniq[link]);
      const prom = await getProductByOneC(onec);
      return {
        redirect: {
          permanent: true,
          destination: url.product(prom.slug),
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
    //do stuff
  }

  console.log(car_links[params[1]]);
  if (params[0] === 'zapchasti') {
    return {
      redirect: {
        permanent: true,
        destination: car_links[params[1]],
      },
    };
  }

  return {
    props: {},
  };
};

export default Make;
