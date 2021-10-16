import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);
interface IProps {
  handleSearch(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSubmit(): void;
  handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void;
}

export default function CustomizedInputBase({
  handleSearch,
  handleSubmit,
  handleKeyPress,
}: IProps) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        onChange={handleSearch}
        className={classes.input}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
        onKeyPress={handleKeyPress}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="search"
        onClick={handleSubmit}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
