import { ICar, ICategory } from '~/interfaces';
import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Chip } from '@material-ui/core';

import Link from 'next/link';
import url from '~/services/url';

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
      borderTop: '1px solid',
      borderColor: theme.palette.action.selected,
    },
    catTitle: {
      minWidth: '100%',
      textAlign: 'center',
      paddingBottom: theme.spacing(1),
      fontWeight: 500,
    },
    chip: {
      marginBottom: theme.spacing(0.3),
      marginRight: theme.spacing(1),
      fontSize: '0.7rem',
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
function handleDelete() {}

const CatBox = ({ categories, catName, model, catSlug }: IPropsBox) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Link href={url.category(model.make.slug, model.slug, catSlug)}>
        <a className={classes.catTitle}>
          <Typography variant="subtitle1" component="div">
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
