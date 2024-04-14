import { zipDownload } from '@/utils/zip-download';
import { Button } from '../Button/Button';

export function ActionBar({
  disabled,
  openDropZone,
  handleChangeStateDropZone,
}: {
  disabled: boolean
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
                Добавить изображения
              </Button>
            )}
          <Button
            disabled={disabled}
            onClick={() => zipDownload({ apiUrl: 'image/download-zip' })}
          >
            Скачать
          </Button>
        </div>
      </div>
    </section>
  );
}
