import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {},
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
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Товар добавлен в корзину"
        action={
          <React.Fragment>
            <Box className={classes.box}>
              <Button color="secondary" size="small" onClick={handleClose}>
                Закрыть
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </React.Fragment>
        }
      />
    </div>
  );
}
