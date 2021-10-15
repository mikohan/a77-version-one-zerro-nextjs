import React from 'react';
import { ICategory } from '~/interfaces';
import { Paper, Typography, Grid } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import url from '~/services/url';
import Image from 'next/image';
import { banner64 } from '~/services/base64';

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
const src = `/images/local/banners/oil_banner.jpg`;

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
  console.log(srcArray['avtotjuning']);

  return (
    <React.Fragment>
      <Grid container item xs={12}>
        {categories && (
          <React.Fragment>
            <Typography className={classes.title} variant="body1">
              Масло и Смазки
            </Typography>
            <Grid container item xs={12} className={classes.item}>
              <Paper className={classes.paper} elevation={4}>
                <Link href={url.model('some', 'stuff')}>
                  <a>
                    <Image
                      src={srcArray['maslo']}
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
        )}

        {categories && (
          <React.Fragment>
            <Typography className={classes.title} variant="body1">
              Запчасти
            </Typography>
            <Grid container item xs={12} className={classes.item}>
              <Paper className={classes.paper} elevation={4}>
                <Link href={url.search()}>
                  <a>
                    <Image
                      src={srcArray['zapchasti']}
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
        )}
        {categories && (
          <React.Fragment>
            <Typography className={classes.title} variant="body1">
              Запчасти
            </Typography>
            <Grid container item xs={12} className={classes.item}>
              <Paper className={classes.paper} elevation={4}>
                <Link href={url.search()}>
                  <a>
                    <Image
                      src={srcArray['aksessuary']}
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
        )}
        {categories && (
          <React.Fragment>
            <Typography className={classes.title} variant="body1">
              Тюнинг
            </Typography>
            <Grid container item xs={12} className={classes.item}>
              <Paper className={classes.paper} elevation={4}>
                <Link href={url.search()}>
                  <a>
                    <Image
                      src={srcArray['autotuning']}
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
        )}
      </Grid>
    </React.Fragment>
  );
}
