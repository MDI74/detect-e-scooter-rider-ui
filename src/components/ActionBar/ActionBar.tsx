export function ActionBar({
  openDropZone,
  handleChangeStateDropZone,
}: {
  openDropZone: boolean
  handleChangeStateDropZone: () => void
}) {
  return (
    <div className="action-bar">
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
              >
                Вернуться назад
              </button>
            )
            : (
              <button
                type="button"
                className="button action-bar__add-button"
                onClick={() => handleChangeStateDropZone()}
              >
                Добавить изображения
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
