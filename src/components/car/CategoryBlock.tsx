import React from 'react';
import Link from 'next/link';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import url from '~/services/url';
import { ICar, ICategory } from '~/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 240,
      flexGrow: 1,
      maxWidth: 400,
    },
    item: {
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    catTitle: {
      minWidth: '100%',
      textAlign: 'center',
      paddingBottom: theme.spacing(1),
      fontWeight: 500,
      [theme.breakpoints.up('xl')]: {
        fontSize: '1rem',
      },
    },
    chip: {
      marginBottom: theme.spacing(0.5),
      marginRight: theme.spacing(1),
      fontSize: '0.75rem',
      [theme.breakpoints.up('xl')]: {
        fontSize: '0.9rem',
      },
    },
  })
);

interface IProps {
  categories?: ICategory[];
  model: ICar;
}

interface IPropsBox extends IProps {
  catName: string;
  catSlug: string;
}

const CatBox = ({ categories, catName, model, catSlug }: IPropsBox) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Link href={url.category(model.make.slug, model.slug, catSlug)}>
        <a>
          <Typography
            className={classes.catTitle}
            variant="subtitle1"
            component="div"
          >
            {catName}
          </Typography>
        </a>
      </Link>
      {categories?.map((item: ICategory) => (
        <Link
          key={item.id}
          href={url.category(model.make.slug, model.slug, item.slug)}
        >
          <a>
            <Chip
              className={classes.chip}
              variant="outlined"
              size="small"
              label={item.name}
              clickable
            />
          </a>
        </Link>
      ))}
    </React.Fragment>
  );
};

export default function ModelCategoryBlock(props: IProps) {
  const { categories, model } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item container xs={12}>
        {categories?.map((item: ICategory) => (
          <Grid item xs={12} key={item.id} className={classes.item}>
            <CatBox
              catName={item.name}
              catSlug={item.slug}
              categories={item.children}
              model={model}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
