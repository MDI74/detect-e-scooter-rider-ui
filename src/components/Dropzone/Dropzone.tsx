import axios from 'axios';
import ReactDropZone from 'react-dropzone';
import clsx from 'clsx';
import { ActionBar } from '../ActionBar/ActionBar';

export function Dropzone(
  {
    openDropZone,
    dataImage,
    setDataImage,
    handleChangeStateDropZone,
  }: {
    openDropZone: boolean;
    dataImage: string[]
    setDataImage: (data: string[]) => void
    handleChangeStateDropZone: () => void
  },
) {
  return (
    <ReactDropZone onDrop={(files) => detect({ files })}>
      {({
        getRootProps, getInputProps, isDragAccept, isFocused,
      }) => (
        <section>
          <div {...getRootProps({
            className: clsx('dropzone', {
              'dropzone--drop': isDragAccept,
              'dropzone--focused': isFocused,
            }),
          })}
          >
            <input {...getInputProps()} />
            <div className="dropzone__inner">
              {dataImage.length !== 0 && (
                <ActionBar
                  openDropZone={openDropZone}
                  handleChangeStateDropZone={handleChangeStateDropZone}
                />
              )}
              <button
                type="button"
                className="button dropzone__choice-button"
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
    formData.append('file', files![0]);
    const { data } = await axios.post('http://localhost:8000/detect-image', formData);

    setDataImage([...dataImage, `data:image/jpg;base64,${data}`]);

    handleChangeStateDropZone();
  }
}
