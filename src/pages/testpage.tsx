import Link from 'next/link';
import MainLayout from '~/layouts/Main';

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
