import axios from 'axios';
import { zipDownload } from '@/utils/zip-download';
import { Button } from '../Button/Button';

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
              <Button
                className="dropzone__close-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChangeStateDropZone();
                }}
                disabled={isProcessDetection}
              >
                Вернуться назад
              </Button>
            )
            : (
              <Button
                className="action-bar__add-button"
                disabled={isProcessDetection}
                onClick={() => handleChangeStateDropZone()}
              >
                Добавить изображения
              </Button>
            )}
          <Button
            disabled={isProcessDetection}
            onClick={() => zipDownload({ apiUrl: 'image/download-zip' })}
          >
            Скачать
          </Button>
        </div>
      </div>
    </section>
  );
}
