import Head from 'next/head';
import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { ActionBar } from '@/components/ActionBar/ActionBar';
import { Dropzone } from '@/components/Dropzone/Dropzone';
import { Preloader } from '@/components/Preloader/Preloader';
import { Uploader } from '@/components/Uploader/Uploader';
import axios from 'axios';
import { useErrorDialogContext } from '@/components/ErrorDialog/ErrorDialogProvider';
import { Video } from '@/components/TrackingResult/TrackingResult';

export default function TrackingPage() {
  const [videoSrc, setVideoSrc] = useState('1');
  const [openDropZone, setOpenDropZone] = useState(true);
  const [isProcessTracking, setIsProcessTracking] = useState(false);
  const { setErrorMessage } = useErrorDialogContext();

  return (
    <>
      <Head>
        <title>E-SCOOTER RIDER DETECTOR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {videoSrc && (
          <ActionBar
            isDetect={false}
            disabled={isProcessTracking}
            openDropZone={openDropZone}
            handleChangeStateDropZone={handleChangeStateDropZone}
          />
        )}
        {openDropZone && (
          <Dropzone
            onDrop={track}
            multiple={false}
            dropText="или перетащите его cюда"
            disabled={isProcessTracking}
            description="Выберите файл для обработки в формате MP3 или MP4"
            uploadButton={(
              <Uploader
                onChange={track}
                text="Выбрать видео"
                disabled={isProcessTracking}
                multiple={false}
                accept=".mp4, .mp3"
              />
            )}
          />
        )}
        { !openDropZone && videoSrc && (
          <div>
            <Video videoSrc={videoSrc} />
          </div>
        )}
      </Layout>
      {isProcessTracking && <Preloader />}
    </>
  );

  async function track(file: File[]) {
    const formData = new FormData();

    formData.append('file', file[0]);

    setIsProcessTracking(true);

    try {
      const { data } = await axios.post<string>('http://localhost:8000/video/track', formData);
      setVideoSrc(`data:video/mp4;base64,${data}`);

      handleChangeStateDropZone();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.detail);
      }
    } finally {
      setIsProcessTracking(false);
    }
  }

  function handleChangeStateDropZone() {
    setOpenDropZone(!openDropZone);
  }
}
