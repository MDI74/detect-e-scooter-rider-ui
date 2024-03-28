import Head from 'next/head';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header/Header';
import { Layout } from '@/components/Layout/Layout';
import { ImageList } from '@/components/ImageList/ImageList';

export default function HomePage() {
  const [file, setFile] = useState<File[]>();
  const [dataImage, setDataImage] = useState<string[]>([]);

  async function getData() {
    const formData = new FormData();
    formData.append('file', file![0]);
    const { data } = await axios.post('http://localhost:8000/detect-image', formData);

    setDataImage([...dataImage, data]);
  }

  return (
    <>
      <Head>
        <title>E-SCOOTER RIDER DETECTOR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <input
        onChange={handleChange}
        type="file"
        multiple
      />
      <button type="button" onClick={() => getData()}>Detect</button>
      <Layout>
        { dataImage && <ImageList dataImageList={dataImage} />}
      </Layout>
    </>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList: File[] = Object.values(event.target.files!);
    setFile(fileList);
  }
}
