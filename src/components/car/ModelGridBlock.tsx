import React from 'react';
import { ICar, IMake } from '~/interfaces';
import { capitalize } from '~/utils';
import { Box, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import url from '~/services/url';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap',
    },
    item: {
      display: 'flex',
      minWidth: theme.spacing(20),
      alignItems: 'center',
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

  return (
    <React.Fragment>
      <Box className={classes.container}>
        {models &&
          models.map((model: ICar) => (
            <Link href={url.model(make.slug, model.slug)} key={model.slug}>
              <a className={classes.item}>
                <Image src={``} width={50} height={30} />
                <Typography variant="h6">{model.model}</Typography>
              </a>
            </Link>
          ))}
      </Box>
    </React.Fragment>
  );
}
