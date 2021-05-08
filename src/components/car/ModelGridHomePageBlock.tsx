import React from 'react';
import { ICar, IMake } from '~/interfaces';
import { capitalize } from '~/utils';
import { Box, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import url from '~/services/url';
import Image from 'next/image';
import { imageServerUrl } from '~/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    item: {
      border: '1px solid',
      borderColor: theme.palette.action.hover,
      margin: theme.spacing(1),
      minHeight: theme.spacing(20),
      minWidth: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
    },
    image: {},
    model: {
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      fontWeight: 500,
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
          models.map((model: ICar) => {
            return (
              <Link href={url.model(make.slug, model.slug)} key={model.slug}>
                <a className={classes.item}>
                  <Image
                    className={classes.image}
                    src={
                      model && model.image
                        ? `${imageServerUrl}${model.image}`
                        : `/images/local/carsAvatar/generic.png`
                    }
                    width={250}
                    height={250}
                  />
                  <Typography className={classes.model} variant="body1">
                    {`${capitalize(model.make.name)} ${capitalize(
                      model.model
                    )}`}
                  </Typography>
                </a>
              </Link>
            );
          })}
      </Box>
    </React.Fragment>
  );
}
