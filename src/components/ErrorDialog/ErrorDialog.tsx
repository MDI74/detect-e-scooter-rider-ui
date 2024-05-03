import { useState } from 'react';

export function ErrorDialog({
  message,
}: {
  message: string | null;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(message);

  return errorMessage ? (
    <div className="error-dialog">
      <div className="error-dialog__wrapper">
        <div className="error-dialog__header">
          <h2 className="error-dialog__title">Ошибка</h2>
        </div>
        <div className="error-dialog__inner">
          <p className="error-dialog__message">{errorMessage}</p>
          <div className="error-dialog__buttons-panel">
            <button
              type="button"
              className="button error-dialog__button"
              onClick={() => setErrorMessage(null)}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : '';
}
