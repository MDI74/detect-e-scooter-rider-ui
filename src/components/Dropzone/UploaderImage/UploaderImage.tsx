import { ChangeEvent } from 'react';

export function UploaderImage({
  isProcessDetection,
  detectImage,
}: {
  isProcessDetection: boolean
  detectImage: (files:File[]) => void
}) {
  return (
    <label
      className="uploader-image"
    >
      <input
        className="uploader-image__input"
        onChange={handleChange}
        disabled={isProcessDetection}
        type="file"
        value=""
        multiple
        accept=".png, .jpg"
      />
      <span
        className="uploader-image__text"
      >
        Выбрать изображения
      </span>
    </label>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files: File[] = Object.values(event.target.files!);
    detectImage(files);
  }
}
