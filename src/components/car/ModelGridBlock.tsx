import React from 'react';
import { ICar, IMake } from '~/interfaces/ICar';
import { IBread } from '~/interfaces/IBread';
import { capitalize } from '~/utils';
import { Box, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap',
    },
    item: {
      border: '1px solid blue',
    },
  })
);
interface ICarProps {
  models: ICar[];
}

export default function ModelBlockGrid(props: ICarProps) {
  const classes = useStyles();
  const { models } = props;
  const make: IMake = models[0].make;

  const breads: IBread[] = [
    { name: 'Ангара77', path: '/' },
    { name: 'Name', path: `/car/${models[0].make.slug}` },
  ];

  return (
    <React.Fragment>
      <Box className={classes.container}>
        {models &&
          models.map((model: ICar) => (
            <Link href={url.model(make.slug, model.slug)} key={model.slug}>
              <a className={classes.item}>
                <Typography variant="h6">{model.model}</Typography>
              </a>
            </Link>
          ))}
      </Box>
    </React.Fragment>
  );
}
