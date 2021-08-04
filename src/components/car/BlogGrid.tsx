import { IPost } from '~/interfaces';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import Image from 'next/image';
import { imageServerUrl } from '~/config';
import Link from 'next/link';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
      gridGap: theme.spacing(3.5),
      marginBottom: theme.spacing(2),
    },
    image: {
      objectFit: 'cover',
    },
    item: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      flexGrow: 1,
      overflowWrap: 'break-word',
      fontWeight: 500,
      padding: theme.spacing(1),
    },
    date: {
      paddingTop: theme.spacing(0.3),
      paddingBottom: theme.spacing(0.3),
      paddingLeft: theme.spacing(1),
      color: theme.palette.text.secondary,
      fontWeight: 500,
    },
  })
);

interface IProps {
  posts: IPost[];
}
export default function ModelShopList(props: IProps) {
  const { posts } = props;
  const classes = useStyles();
  const showPosts = posts.slice(0, 8);
  return (
    <React.Fragment>
      <Box className={classes.container}>
        {showPosts.map((post: IPost) => (
          <Link key={post.slug} href={url.post(post.slug)}>
            <a>
              <Paper key={post.slug} className={classes.item}>
                <Image
                  className={classes.image}
                  src={`${imageServerUrl}${post.image}`}
                  layout="responsive"
                  width={200}
                  height={160}
                />
                <Typography
                  className={classes.title}
                  variant="body2"
                  component="div"
                >
                  {post.title}
                </Typography>
                <Typography
                  className={classes.date}
                  variant="subtitle2"
                  component="div"
                >
                  {post.date}
                </Typography>
              </Paper>
            </a>
          </Link>
        ))}
      </Box>
    </React.Fragment>
  );
}
