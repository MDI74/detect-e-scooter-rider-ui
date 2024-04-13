import axios from 'axios';

export function ActionBar({
  isProcessDetection,
  openDropZone,
  handleChangeStateDropZone,
}: {
  isProcessDetection: boolean
  openDropZone: boolean
  handleChangeStateDropZone: () => void
}) {
  return (
    <section className="action-bar">
      <div className="container action-bar__wrapper">
        <div className="action-bar__inner">
          {openDropZone
            ? (
              <button
                type="button"
                className="button dropzone__close-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChangeStateDropZone();
                }}
                disabled={isProcessDetection}
              >
                Вернуться назад
              </button>
            )
            : (
              <button
                type="button"
                className="button action-bar__add-button"
                disabled={isProcessDetection}
                onClick={() => handleChangeStateDropZone()}
              >
                Добавить изображения
              </button>
            )}
          <button
            type="button"
            className="button"
            disabled={isProcessDetection}
            onClick={downloadZip}
          >
            Скачать
          </button>
        </div>
      </div>
    </section>
  );

  async function downloadZip() {
    const data = await axios.get('http://localhost:8000/image/download-zip', { responseType: 'blob' });

    const url = window.URL.createObjectURL(new Blob([data.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'detect-image.zip';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
