import { ChangeEvent } from 'react';

export function Uploader({
  disabled,
  multiple = true,
  accept,
  text,
  onChange,
}: {
  disabled: boolean;
  multiple?: boolean;
  accept: string;
  text: string;
  onChange: (files:File[]) => void;
}) {
  return (
    <label
      className="uploader"
    >
      <input
        className="uploader__input"
        onChange={handleChange}
        disabled={disabled}
        type="file"
        value=""
        multiple={multiple}
        accept={accept}
      />
      <span
        className="uploader__text"
      >
        {text}
      </span>
    </label>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files: File[] = Object.values(event.target.files!);
    onChange(files);
  }
}
