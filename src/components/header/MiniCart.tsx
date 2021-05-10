import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link';
import {
  Popover,
  Typography,
  Box,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import url from '~/services/url';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    buttonBox: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(1),
    },
  })
);

interface IProps {
  anchorEl: HTMLElement | null;
  setAnchorEl(anchor: HTMLElement | null): void;
  /* handleClick(event: React.MouseEvent<HTMLButtonElement>): void; */
}
export default function SimpleMenu({ anchorEl, setAnchorEl }: IProps) {
  const classes = useStyles();
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Popover
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box className={classes.root}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>lddll</TableCell>
                  <TableCell>lddll</TableCell>
                  <TableCell>lddll</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>lddll</TableCell>
                  <TableCell>lddll</TableCell>
                  <TableCell>lddll</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={classes.buttonBox}>
            <Link href={url.cart()}>
              <a>
                <Button variant="contained">Go To Cart</Button>
              </a>
            </Link>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
