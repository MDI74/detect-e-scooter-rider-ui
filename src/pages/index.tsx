import Head from 'next/head';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header/Header';
import { Layout } from '@/components/Layout/Layout';

export default function HomePage() {
  const [file, setFile] = useState<File[]>();
  const [image, setImage] = useState<string>();

  async function getData() {
    const formData = new FormData();
    formData.append('file', file![0]);
    const { data } = await axios.post('http://localhost:8000/detect-image', formData);

    setImage(`data:image/jpg;base64,${data}`);
  }

  return (
    <>
      <Head>
        <title>E-SCOOTER RIDER DETECTER</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout />
      <main>
        <input
          onChange={handleChange}
          type="file"
          multiple
        />
        <button type="button" onClick={async () => getData()}>Detect</button>
        <div>
          {image && <Image src={image} alt="Detected image" width={400} height={400} />}
        </div>
      </main>
    </>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList: File[] = Object.values(event.target.files!);
    setFile(fileList);
  }
}
