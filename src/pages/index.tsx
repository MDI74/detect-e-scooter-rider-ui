import Head from 'next/head';
import { Layout } from '@/components/Layout/Layout';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>E-SCOOTER RIDER DETECTOR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </>
  );
}
