import React from 'react';
import { ICategory } from '~/interfaces';
import { Paper, Typography, Grid } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import url from '~/services/url';
import Image from 'next/image';
import { banner64 } from '~/services/base64';
import { capitalize } from '~/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      /* display: 'grid', */
      /* gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`, */
      /* gridGap: theme.spacing(1), */
    },
    item: {
      marginBottom: theme.spacing(2),
    },
    paper: {
      width: '100%',
      borderRadius: theme.spacing(1),
    },
    img: {
      borderRadius: theme.spacing(1),
    },
    title: {
      paddingBottom: theme.spacing(1),
    },
  })
);
interface IOil {
  categories: ICategory[];
}

const srcArray: { [key: string]: string } = {
  maslo: '/images/local/banners/oil_banner.jpg',
  autotuning: '/images/local/banners/tuning2.jpg',
  aksessuary: '/images/local/banners/accessories.jpg',
  zapchasti: '/images/local/banners/zapchasti.jpg',
};

const blurDataURL = banner64;

export default function Oil(props: IOil) {
  const classes = useStyles();
  const { categories } = props;

  const cats = categories.map((cat: ICategory) => {
    let image = '/images/local/banners/zapchasti.jpg';
    if (cat.id == 4) {
      image = '/images/local/banners/accessories.jpg';
    }
    if (cat.id == 3) {
      image = '/images/local/banners/tuning2.jpg';
    }
    if (cat.id == 2) {
      image = '/images/local/banners/oil_banner.jpg';
    }
    if (cat.id == 1) {
      image = '/images/local/banners/zapchasti.jpg';
    }

    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      image: image,
      weight: cat.weight,
    };
  });

  // Helper for compare by id functions
  function compare(a: any, b: any) {
    if (a.weight < b.weight) {
      return 1;
    }
    if (a.weight > b.weight) {
      return -1;
    }
    return 0;
  }
  const sortedCats = cats.sort(compare);

  return (
    <React.Fragment>
      <Grid container item xs={12}>
        {categories &&
          sortedCats.map((cat: ICategory) => {
            return (
              <React.Fragment key={cat.slug}>
                <Typography className={classes.title} variant="body1">
                  {capitalize(cat.name)}
                </Typography>
                <Grid container item xs={12} className={classes.item}>
                  <Paper className={classes.paper} elevation={4}>
                    <Link href={url.autogoodsCategory(cat.slug)}>
                      <a>
                        <Image
                          src={cat.image!}
                          layout="responsive"
                          width={760}
                          height={145}
                          blurDataURL={blurDataURL}
                          placeholder="blur"
                          className={classes.img}
                        />
                      </a>
                    </Link>
                  </Paper>
                </Grid>
              </React.Fragment>
            );
          })}
      </Grid>
    </React.Fragment>
  );
}
