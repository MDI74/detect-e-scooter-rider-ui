export function ActionBar({
  handleChangeStateDropZone,
}: {
  handleChangeStateDropZone: () => void
}) {
  return (
    <div className="action-bar">
      <div className="container action-bar__wrapper">
        <div className="action-bar__inner">
          <button
            type="button"
            onClick={() => handleChangeStateDropZone()}
          >
            Добавить изображения
          </button>
        </div>
      </div>
    </div>
  );
}
