import axios from 'axios';
import ReactDropZone from 'react-dropzone';
import clsx from 'clsx';
import { ActionBar } from '../ActionBar/ActionBar';

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
    <ReactDropZone disabled={isProcessDetection} onDrop={(files) => detect({ files })}>
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
              <button
                type="button"
                className="button dropzone__choice-button"
                disabled={isProcessDetection}
              >
                Выбрать изображения
              </button>
              <p className="dropzone__description">или перетащите изображения cюда</p>
            </div>

          </div>
        </section>
      )}
    </ReactDropZone>
  );

  async function detect({
    files,
  }: {
    files:File[]
  }) {
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
