import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Hidden, Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Box, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { IProduct } from '~/interfaces';
import { imageServerUrl } from '~/config';
import Link from 'next/link';
import url from '~/services/url';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      media: {
        padding: theme.spacing(1),
      },
    },
    [theme.breakpoints.up('lg')]: {
      media: {
        padding: theme.spacing(1),
      },
    },
    [theme.breakpoints.up('xxl')]: {
      media: {
        padding: theme.spacing(1),
      },
    },
    buttonLearnPrice: {
      padding: theme.spacing(1),
    },
  })
);

interface IProps {
  product: IProduct;
}

export default function MediaCard({ product }: IProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link href={url.product(product.slug)}>
        <a>
          <CardActionArea>
            <Box className={classes.media} title="Contemplative Reptile">
              <Image
                src={`${imageServerUrl}${product.images[0].img245}`}
                width={245}
                height={245}
              />
            </Box>
            <Hidden mdDown>
              <CardContent>
                <Typography gutterBottom variant="body2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.stocks.length
                    ? product.stocks[0].price
                    : 'Call Manager for price'}
                </Typography>
              </CardContent>
            </Hidden>
          </CardActionArea>
          <CardActions>
            <Button className={classes.buttonLearnPrice} size="small">
              <Typography variant="body2">Узнать Цену...</Typography>
            </Button>
          </CardActions>
        </a>
      </Link>
    </Card>
  );
}
