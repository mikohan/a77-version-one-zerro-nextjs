import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IProps {
  openDelete: boolean;
  setOpenDelete(d: boolean): void;
  setConfirm(d: number): void;
  id: number;
}

export default function AlertDialog({
  openDelete,
  setOpenDelete,
  setConfirm,
  id,
}: IProps) {
  const handleClose = () => {
    setOpenDelete(false);
  };
  function handleConfirm(id: number) {
    setConfirm(id);
    setOpenDelete(false);
  }

  return (
    <div>
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={() => handleConfirm(id)} color="primary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
