import Head from 'next/head';
import { useState } from 'react';
import { Header } from '@/components/Header/Header';
import { Layout } from '@/components/Layout/Layout';
import { ImageSlider } from '@/components/ImageSlider/ImageSlider';
import { ActionBar } from '@/components/ActionBar/ActionBar';
import { Dropzone } from '@/components/Dropzone/Dropzone';

export default function HomePage() {
  const [dataImage, setDataImage] = useState<string[]>([]);
  const [openDropZone, setOpenDropZone] = useState(true);

  return (
    <>
      <Head>
        <title>E-SCOOTER RIDER DETECTOR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        {!openDropZone && (
          <ActionBar
            openDropZone={openDropZone}
            handleChangeStateDropZone={handleChangeStateDropZone}
          />
        )}
        {openDropZone && (
          <Dropzone
            openDropZone={openDropZone}
            dataImage={dataImage}
            setDataImage={setDataImage}
            handleChangeStateDropZone={handleChangeStateDropZone}
          />
        )}
        { !openDropZone && dataImage.length !== 0 && <ImageSlider dataImageSrcList={dataImage} />}
      </Layout>
    </>
  );

  function handleChangeStateDropZone() {
    setOpenDropZone(!openDropZone);
  }
}
