import Head from 'next/head';
import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { ImageSlider } from '@/components/ImageSlider/ImageSlider';
import { ActionBar } from '@/components/ActionBar/ActionBar';
import { Dropzone } from '@/components/Dropzone/Dropzone';
import Preloader from '@/components/Preloader/Preloader';
import { ErrorDialogProvider } from '@/components/ErrorDialog/ErrorDialogProvider';

export default function DetectPage() {
  const [dataImage] = useState<string[]>([]);
  const [openDropZone, setOpenDropZone] = useState(true);
  const [isProcessDetection, setIsProcessDetection] = useState(false);

  return (
    <>
      <Head>
        <title>E-SCOOTER RIDER DETECTOR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ErrorDialogProvider>
          {!openDropZone && (
            <ActionBar
              isProcessDetection={isProcessDetection}
              openDropZone={openDropZone}
              handleChangeStateDropZone={handleChangeStateDropZone}
            />
          )}
          {openDropZone && (
            <Dropzone
              isProcessDetection={isProcessDetection}
              openDropZone={openDropZone}
              dataImage={dataImage}
              handleChangeStateDropZone={handleChangeStateDropZone}
              handleSetIsProcessDetection={handleSetIsProcessDetection}
            />
          )}
          { !openDropZone && dataImage.length !== 0 && <ImageSlider dataImageSrcList={dataImage} />}
        </ErrorDialogProvider>
      </Layout>
      {isProcessDetection && <Preloader />}
    </>
  );

  function handleChangeStateDropZone() {
    setOpenDropZone(!openDropZone);
  }

  function handleSetIsProcessDetection(isProcessStarted: boolean) {
    setIsProcessDetection(isProcessStarted);
  }
}
