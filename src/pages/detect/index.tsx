import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { ImageSlider } from '@/components/ImageSlider/ImageSlider';
import { ActionBar } from '@/components/ActionBar/ActionBar';
import { Dropzone } from '@/components/Dropzone/Dropzone';
import { Preloader } from '@/components/Preloader/Preloader';
import { useErrorDialogContext } from '@/components/ErrorDialog/ErrorDialogProvider';
import { Uploader } from '@/components/Dropzone/Uploader/Uploader';

export default function DetectPage() {
  const [dataImage] = useState<string[]>([]);
  const [openDropZone, setOpenDropZone] = useState(true);
  const [isProcessDetection, setIsProcessDetection] = useState(false);
  const { setErrorMessage } = useErrorDialogContext();

  return (
    <>
      <Head>
        <title>E-SCOOTER RIDER DETECTOR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {dataImage.length !== 0 && (
          <ActionBar
            disabled={isProcessDetection}
            openDropZone={openDropZone}
            handleChangeStateDropZone={handleChangeStateDropZone}
          />
        )}
        {openDropZone && (
          <Dropzone
            onDrop={detectImage}
            disabled={isProcessDetection}
            description="Выберите файлы для обработки в формате PNG или JPG"
            uploadButton={(
              <Uploader
                onChange={detectImage}
                disabled={isProcessDetection}
                accept=".png, .jpg"
              />
            )}
          />
        )}
        { !openDropZone && dataImage.length !== 0 && <ImageSlider dataImageSrcList={dataImage} />}
      </Layout>
      {isProcessDetection && <Preloader />}
    </>
  );

  async function detectImage(files:File[]) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    setIsProcessDetection(true);

    try {
      const { data } = await axios.post<string[]>('http://localhost:8000/image/detect', formData);
      data.map((bytes) => dataImage.push(`data:image/jpg;base64,${bytes}`));

      handleChangeStateDropZone();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.detail);
      }
    } finally {
      setIsProcessDetection(false);
    }
  }

  function handleChangeStateDropZone() {
    setOpenDropZone(!openDropZone);
  }
}
