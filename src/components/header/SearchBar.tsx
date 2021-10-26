import React from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useRouter } from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { autocompleteUrls } from '~/config';
import {
  Box,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      background: theme.palette.background.paper,
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    autocomlete: {
      width: '100%',
    },
    clearIcon: {
      color: theme.palette.text.disabled,
      fontSize: '90%',
      cursor: 'pointer',
    },
    input: {
      fontSize: '1.1rem',
      /* color: theme.palette.text.secondary, */
      '&::placeholder': {
        fontSize: '1rem',
      },
    },
    listbox: {
      color: theme.palette.text.secondary,
      fontSize: '1rem',
    },
  })
);

interface CountryType {
  name: string;
}

export default function SearchBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<CountryType[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const router = useRouter();
  const strip = (value: string) => value.replace(/[^a-zA-ZА-Яа-я\s0-9]/g, '');

  React.useEffect(() => {
    async function callApi(url: string) {
      const prom = await axios(url);
      const opts: CountryType[] = prom.data.hits.hits.map((item: any) => {
        return {
          name: item._source.name.toLowerCase(),
        };
      });
      const uniqueValsOpts = [
        ...new Set(opts.map((item: CountryType) => item.name.toLowerCase())),
      ];

      const finalOpts = uniqueValsOpts.map((item: string) => ({
        name: item,
      }));

      setOptions([...new Set(finalOpts)]);
      return prom.data;
    }
    let url = '';
    if (/^\d+/.test(inputValue)) {
      url = `${autocompleteUrls.number}?q=${inputValue}`;
    } else {
      url = `${autocompleteUrls.string}?q=${inputValue}`;
    }
    callApi(url);
  }, [inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  function handleSubmit() {
    if (inputValue !== '') {
      router.push({
        pathname: '/search',
        query: {
          search: inputValue,
        },
      });
    } else {
      /* setError(true); */
      /* setHelper('Поле не может быть пустым'); */
    }
  }

  function handleEnter(event: React.KeyboardEvent<{}>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      setInputValue(strip(inputValue));
      handleSubmit();
    }
  }

  return (
    <React.Fragment>
      <Box className={classes.container}>
        <Autocomplete
          freeSolo
          onKeyDown={handleEnter}
          onInputChange={(e, value) => {
            setInputValue(strip(value));
          }}
          inputValue={inputValue}
          id="autocomplete"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={handleSubmit}
          fullWidth
          size="small"
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name || ''}
          options={options}
          filterOptions={(options, state) => options}
          classes={{ listbox: classes.listbox }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <Typography variant="body2">
                  По номеру или по Названию
                </Typography>
              }
              variant="outlined"
              placeholder="Номер или название"
            />
          )}
        />
        <IconButton id="search" onClick={handleSubmit} aria-label="Search">
          <SearchIcon />
        </IconButton>
      </Box>
    </React.Fragment>
  );
}
