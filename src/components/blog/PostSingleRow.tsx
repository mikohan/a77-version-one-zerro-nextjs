import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

import { IBlogCategory, ICar, IPost } from '~/interfaces';
import { imageServerUrl, BLOG_DATA, durationPage } from '~/config';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(4),
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
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
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
    readMore: {
      marginLeft: theme.spacing(4),
      marginBottom: theme.spacing(3),
    },
    partsCategory: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingLeft: theme.spacing(4),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    cars: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingLeft: theme.spacing(4),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },

    chip: {
      marginRight: theme.spacing(1),
      cursor: 'pointer',
    },
  })
);

interface IPaperProps {
  post: IPost;
}

export default function BlogPaper({ post }: IPaperProps) {
  const classes = useStyles();
  const router = useRouter();
  const img = post.image
    ? `${imageServerUrl}${post.image}`
    : BLOG_DATA.DEFAULT_BLOG_IMAGE;

  function handleReadMore() {
    router.push({
      pathname: url.post(post.slug),
    });
  }

  return (
    <Paper className={classes.paper}>
      <Link href={url.post(post.slug)}>
        <a className={classes.a}>
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: durationPage }}
            layoutId="blogPostsImage"
          >
            <Image
              className={classes.image}
              layout="responsive"
              src={img}
              width={900}
              height={600}
            />
          </motion.div>
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
      {post.car.length ? (
        <Box className={classes.cars}>
          {post.car.map((car: ICar) => (
            <Link key={car.slug} href={url.model(car.make.slug, car.slug)}>
              <a>
                <Chip className={classes.chip} size="small" label={car.model} />
              </a>
            </Link>
          ))}
        </Box>
      ) : (
        ''
      )}
      {post.category.length ? (
        <Box className={classes.cars}>
          {post.category.map((cat: IBlogCategory, i: number) => (
            <Link key={i} href={url.blogCategory(cat.slug, 1)}>
              <a>
                <Chip className={classes.chip} size="small" label={cat.name} />
              </a>
            </Link>
          ))}
        </Box>
      ) : (
        ''
      )}
      {post.tags.length ? (
        <Box className={classes.cars}>
          {post.tags.map((tag: string, i: number) => (
            <Link key={i} href={url.blogSearch(tag, 1)}>
              <a>
                <Chip className={classes.chip} size="small" label={tag} />
              </a>
            </Link>
          ))}
        </Box>
      ) : (
        ''
      )}
      <Typography className={classes.excerpt} variant="body1">
        {post.excerpt}
      </Typography>
      <Button
        className={classes.readMore}
        variant="contained"
        size="small"
        onClick={handleReadMore}
      >
        Читать далее
      </Button>
    </Paper>
  );
}
