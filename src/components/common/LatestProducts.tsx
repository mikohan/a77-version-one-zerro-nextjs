import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import { IProduct } from '~/interfaces';
import { Paper, Box } from '@material-ui/core';
import { imageServerUrl } from '~/config';
import Link from 'next/link';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    blockTitle: {
      paddingBottom: theme.spacing(2),
    },
    item: {
      minWidth: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(2),
    },
    imageBox: {
      minWidth: 120,
      height: '100%',
    },
    content: {
      minHeight: '6rem',
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      '& > div': {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
      },
    },
    title: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    date: {
      color: theme.palette.text.secondary,
    },
  })
);

interface IProps {
  products: IProduct[];
}

export default function LatestPosts({ products }: IProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.blockTitle} variant="h6">
        Последние поступления
      </Typography>
      {products.map((product: IProduct) => (
        <Link key={product.slug} href={url.product(product.slug)}>
          <a>
            <Box className={classes.item}>
              <Box className={classes.imageBox}>
                <Image
                  src={`${product.images[0].img150}`}
                  layout="intrinsic"
                  width={120}
                  height={100}
                />
              </Box>
              <Box className={classes.content}>
                <Typography
                  className={classes.title}
                  variant="body2"
                  component="div"
                >
                  {product.name}
                </Typography>
                <Typography
                  className={classes.date}
                  variant="body2"
                  component="div"
                >
                  {product.stocks[0].price}
                </Typography>
              </Box>
            </Box>
          </a>
        </Link>
      ))}
    </Paper>
  );
}
