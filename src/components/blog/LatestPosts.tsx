import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import { IPost } from '~/interfaces';
import { Paper, Box } from '@material-ui/core';
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
  posts: IPost[];
}

export default function LatestPosts({ posts }: IProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.blockTitle} variant="h6">
        Последние публикации
      </Typography>
      {posts.map((post: IPost) => (
        <Link href={url.post(post.slug)}>
          <a>
            <Box key={post.slug} className={classes.item}>
              <Box className={classes.imageBox}>
                <Image
                  src={`${imageServerUrl}${post.image}`}
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
                  {post.title}
                </Typography>
                <Typography
                  className={classes.date}
                  variant="body2"
                  component="div"
                >
                  {post.date}
                </Typography>
              </Box>
            </Box>
          </a>
        </Link>
      ))}
    </Paper>
  );
}
