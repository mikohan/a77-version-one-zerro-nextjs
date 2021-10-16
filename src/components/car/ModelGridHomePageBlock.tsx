import React from 'react';
import Link from 'next/link';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { ICar, IMake } from '~/interfaces';
import { capitalize } from '~/utils';
import url from '~/services/url';
import Image from 'next/image';
import { imageServerUrl } from '~/config';
import { part64 } from '~/services/base64';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      /* display: 'grid', */
      /* gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`, */
      /* gridGap: theme.spacing(1), */
    },
    item: {
      border: '1px solid',
      borderColor: theme.palette.action.hover,
      margin: theme.spacing(0.5),
      /* minHeight: theme.spacing(6), */
      /* minWidth: theme.spacing(6), */
      maxWidth: theme.spacing(12),
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
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
      <Grid container item xs={12} className={classes.container}>
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
                    width={75}
                    height={75}
                    blurDataURL={part64}
                    placeholder="blur"
                  />
                  <Typography className={classes.model} variant="body2">
                    {`${capitalize(model.make.name)} ${capitalize(
                      model.model
                    )}`}
                  </Typography>
                </a>
              </Link>
            );
          })}
      </Grid>
    </React.Fragment>
  );
}
