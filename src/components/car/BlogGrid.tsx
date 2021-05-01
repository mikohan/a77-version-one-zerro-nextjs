import { IPost } from '~/interfaces';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import Image from 'next/image';
import { imageServerUrl } from '~/config';
import Link from 'next/link';
import url from '~/services/url';
// Git comment
// Git another commit

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: theme.spacing(25),
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
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
  return (
    <React.Fragment>
      <Box className={classes.container}>
        {posts.map((post: IPost) => (
          <Link key={post.slug} href={url.post(post.slug)}>
            <a>
              <Paper key={post.slug} className={classes.item}>
                <Image
                  src={`${imageServerUrl}${post.image}`}
                  layout="intrinsic"
                  width={200}
                  height={160}
                />
                <Typography
                  className={classes.title}
                  variant="subtitle2"
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
