import axios from 'axios';
import ReactDropZone from 'react-dropzone';
import clsx from 'clsx';
import React from 'react';
import { ActionBar } from '../ActionBar/ActionBar';
import { UploaderImage } from './UploaderImage/UploaderImage';

export function Dropzone(
  {
    isProcessDetection,
    openDropZone,
    dataImage,
    handleChangeStateDropZone,
    handleSetIsProcessDetection,
  }: {
    isProcessDetection: boolean
    openDropZone: boolean;
    dataImage: string[]
    handleChangeStateDropZone: () => void
    handleSetIsProcessDetection: (isProcessStarted: boolean) => void
  },
) {
  return (
    <ReactDropZone
      noClick
      disabled={isProcessDetection}
      onDrop={(files) => detectImage(files)}
    >
      {({
        getRootProps, getInputProps, isDragAccept,
      }) => (
        <section>
          <div {...getRootProps({
            className: clsx('dropzone', {
              'dropzone--drop': isDragAccept,
            }),
          })}
          >
            <input {...getInputProps()} />
            {dataImage.length !== 0 && (
              <ActionBar
                isProcessDetection={isProcessDetection}
                openDropZone={openDropZone}
                handleChangeStateDropZone={handleChangeStateDropZone}
              />
            )}
            <div className="dropzone__inner">
              <h2 className="dropzone__description">Выберите файлы для обработки в формате PNG или JPG</h2>
              <UploaderImage
                detectImage={detectImage}
                isProcessDetection={isProcessDetection}
              />
              <p className="dropzone__drop-text">или перетащите их cюда</p>
            </div>

          </div>
        </section>
      )}
    </ReactDropZone>
  );

  async function detectImage(files:File[]) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    handleSetIsProcessDetection(true);

    try {
      const { data } = await axios.post<string[]>('http://localhost:8000/image/detect', formData);
      data.map((bytes) => dataImage.push(`data:image/jpg;base64,${bytes}`));

      handleChangeStateDropZone();
    } catch {
      console.log('Не удалось загузить файлы изображения');
    } finally {
      handleSetIsProcessDetection(false);
    }
  }
}
