import React from 'react';
import Link from 'next/link';
import { IPost } from '~/interfaces';
import { imageServerUrl, BLOG_DATA } from '~/config';
import url from '~/services/url';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(2),
    },
    itemContainer: {
      padding: theme.spacing(2),
    },
    a: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: 'center',
      fontWeight: 600,
    },
    image: {
      objectFit: 'cover',
    },
    author: {
      color: theme.palette.text.secondary,
      paddingLeft: theme.spacing(5),
      paddingBottom: theme.spacing(2),
    },
    date: {
      paddingLeft: theme.spacing(2),
      fontWeight: 500,
      color: theme.palette.primary.main,
    },
    excerpt: {
      lineHeight: 1.75,
      textIndent: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
);

interface IPaperProps {
  post: IPost;
}

export default function BlogPaper({ post }: IPaperProps) {
  const classes = useStyles();
  const img = post.image
    ? `${imageServerUrl}${post.image}`
    : BLOG_DATA.DEFAULT_BLOG_IMAGE;
  return (
    <Paper className={classes.paper}>
      <Link href={url.post(post.slug)}>
        <a className={classes.a}>
          <div>
            <Image
              className={classes.image}
              layout="responsive"
              src={img}
              width={900}
              height={600}
            />
          </div>
          <Typography className={classes.title} variant="h4">
            {post.title}
          </Typography>
        </a>
      </Link>
      <Typography className={classes.author} variant="body2">
        ---- {post.author}
        <Typography className={classes.date} variant="body2" component="span">
          {post.date}
        </Typography>
      </Typography>
      <Typography className={classes.excerpt} variant="body1">
        {post.excerpt}
      </Typography>
    </Paper>
  );
}
