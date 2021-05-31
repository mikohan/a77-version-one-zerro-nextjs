import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import { IPost } from '~/interfaces';
import { Box, Grid } from '@material-ui/core';
import { imageServerUrl } from '~/config';
import Link from 'next/link';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
      paddingBottom: theme.spacing(2),
    },
    content: {
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(1),
      },
    },
    date: {
      color: theme.palette.text.secondary,
    },
  })
);

interface IProps {
  posts: IPost[];
}

export default function LatestPosts({ posts }: IProps) {
  const classes = useStyles();
  if (!posts) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <Grid className={classes.root}>
      <Typography className={classes.blockTitle} variant="h6">
        Последние публикации
      </Typography>
      {posts.map((post: IPost) => (
        <Link key={post.slug} href={url.post(post.slug)}>
          <a>
            <Grid container className={classes.item}>
              <Grid item md={12} lg={6} xl={4}>
                <Image
                  src={`${imageServerUrl}${post.image}`}
                  layout="intrinsic"
                  width={120}
                  height={100}
                />
              </Grid>
              <Grid item md={12} lg={6} xl={8} className={classes.content}>
                <Typography variant="body2" component="div">
                  {post.title}
                </Typography>
                <Typography
                  className={classes.date}
                  variant="body2"
                  component="div"
                >
                  {post.date}
                </Typography>
              </Grid>
            </Grid>
          </a>
        </Link>
      ))}
    </Grid>
  );
}
