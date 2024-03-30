import axios from 'axios';
import ReactDropZone from 'react-dropzone';
import clsx from 'clsx';

export function Dropzone(
  {
    dataImage,
    setDataImage,
    handleChangeStateDropZone,
  }: {
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
                <button
                  type="button"
                  className="dropzone__close-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChangeStateDropZone();
                  }}
                >
                  Вернуться назад
                </button>
              )}
              <button
                type="button"
                className="dropzone__open-button"
              >
                Выбрать изображения
              </button>
              <p>Перетащите изображения cюда</p>
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
