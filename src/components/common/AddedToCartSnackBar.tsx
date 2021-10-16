import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      background: theme.palette.success.main,
    },
    text: {
      color: '#fff',
    },
  })
);

interface IProps {
  open: boolean;
  handleClose(event: React.SyntheticEvent | React.MouseEvent): void;
}

export default function SimpleSnackbar({ open, handleClose }: IProps) {
  const classes = useStyles();
  return (
    <div>
      <Snackbar
        ContentProps={{
          classes: {
            root: classes.box,
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          <Typography className={classes.text} variant="body2">
            Товар добален в корзину
          </Typography>
        }
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon className={classes.text} fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
