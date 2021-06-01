import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Box, Typography } from '@material-ui/core';
import { IPost } from '~/interfaces';
import Link from 'next/link';
import url from '~/services/url';
import { imageServerUrl } from '~/config';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: `repeat(6, minmax(15%, 1fr))`,
      gridGap: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    item: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: theme.spacing(35),
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      textOverflow: 'ellipsis',
      fontWeight: 500,
    },
    date: {
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      color: theme.palette.text.disabled,
    },
  })
);

interface IProps {
  posts: IPost[];
}

export default function DenseTable({ posts }: IProps) {
  const classes = useStyles();

  return (
    <Box>
      {posts && (
        <Box className={classes.container}>
          {posts.map((post: IPost) => {
            return (
              <Paper>
                <Link key={post.slug} href={url.post(post.slug)}>
                  <a className={classes.item}>
                    <Image
                      src={`${imageServerUrl}${post.image}`}
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
                    <Box className={classes.date}>{post.date}</Box>
                  </a>
                </Link>
              </Paper>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
