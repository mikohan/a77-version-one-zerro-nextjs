// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, Grid } from '@material-ui/core';

interface CountryType {
  name: string;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<CountryType[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const loading = open && options.length === 0;
  const router = useRouter();
  const strip = (value: string) => value.replace(/[^a-zA-Z\s0-9]/g, '');

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
      url = `http://localhost:8000/api/product/findnumber?q=${inputValue}`;
    } else {
      url = `http://localhost:8000/api/product/autocomplete?q=${inputValue}`;
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
      console.log(strip(inputValue));
      /*   router.push({ */
      /*     pathname: '/search', */
      /*     query: { */
      /*       search: inputValue, */
      /*     }, */
      /*   }); */
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
      <div>{inputValue}</div>
      <Grid container>
        <Grid item xs={8}>
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
            fullWidth
            size="small"
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name || ''}
            options={options}
            filterOptions={(options, state) => options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Поиск по номеру или названию"
                variant="outlined"
                placeholder="Номер или название"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={handleSubmit}>
            Button
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
