import React from 'react';
import Image from 'next/image';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

interface IProps {
  image: string;
  props?: any;
}

export default function ImageAvatars({ image, ...props }: IProps) {
  const classes = useStyles();
  const src = image ? image : '/images/local/A100.png';

  return (
    <div className={classes.root}>
      <Avatar alt="Remy Sharp" {...props}>
        <Image src={src} width={100} height={100} />
      </Avatar>
    </div>
  );
}
