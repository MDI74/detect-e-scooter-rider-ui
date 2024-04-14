import { zipDownload } from '@/utils/zip-download';
import { Button } from '../Button/Button';

export function ActionBar({
  disabled,
  openDropZone,
  isDetect = true,
  handleChangeStateDropZone,
}: {
  disabled: boolean;
  openDropZone: boolean;
  isDetect?: boolean;
  handleChangeStateDropZone: () => void;
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
                disabled={disabled}
              >
                Вернуться назад
              </Button>
            )
            : (
              <Button
                className="action-bar__add-button"
                disabled={disabled}
                onClick={() => handleChangeStateDropZone()}
              >
                {isDetect ? 'Добавить изображения' : 'Загрузить видео'}
              </Button>
            )}
          <Button
            disabled={disabled}
            onClick={() => zipDownload({
              apiUrl: isDetect
                ? 'images/download-zip'
                : 'video/download-zip',
            })}
          >
            Скачать
          </Button>
        </div>
      </div>
    </section>
  );
}
