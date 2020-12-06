import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MainLayout from '~/layouts/Main';
import { useState } from 'react';
import { asString } from '~/helpers';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Redirect({ to }: any) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);
  return null;
}

export default function TestPage() {
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { query } = router;
  const count: number = parseInt(asString(query?.count || 1), 10);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, event.target.checked);
  };
  console.log(query);

  if (count === 5) {
    return <Redirect to={'/'} />;
  }
  return (
    <div>
      <MainLayout>
        <h1> Test Page</h1>
        <Box>
          <Link href="/">To home</Link>
        </Box>
        <Box>
          <Checkbox
            onChange={handleChange}
            defaultChecked={false}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            value="pmc"
          />
          <Checkbox
            onChange={handleChange}
            defaultChecked={false}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            value="mobis"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChange} value="checkedH" />}
            label="Custom icon"
          />
        </Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            router.push(`/testpage?count=${count + 1}`, undefined, {
              shallow: true,
            });
          }}
        >
          {' '}
          Increment {count}{' '}
        </Button>
      </MainLayout>
    </div>
  );
}
