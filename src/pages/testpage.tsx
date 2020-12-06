import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MainLayout from '~/layouts/Main';

function Redirect({ to: string }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);
}

export default function TestPage() {
  return (
    <div>
      <MainLayout>
        <h1> Test Page</h1>
        <Link href="/">To home</Link>
      </MainLayout>
    </div>
  );
}
