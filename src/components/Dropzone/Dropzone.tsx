import ReactDropZone from 'react-dropzone';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

export function Dropzone(
  {
    onDrop,
    disabled,
    description,
    dropText,
    multiple = true,
    uploadButton,
  }: {
    onDrop: (filse: File[]) => void;
    disabled: boolean;
    multiple?: boolean;
    description: string;
    dropText: string;
    uploadButton: ReactNode;
  },
) {
  return (
    <ReactDropZone
      noClick
      disabled={disabled}
      multiple={multiple}
      onDrop={(files) => onDrop(files)}
    >
      {({
        getRootProps, getInputProps, isDragAccept,
      }) => (
        <section>
          <div {...getRootProps({
            className: clsx('dropzone', {
              'dropzone--drop': isDragAccept,
            }),
          })}
          >
            <input {...getInputProps()} />
            <div className="dropzone__inner">
              <h2 className="dropzone__description">{description}</h2>
              {uploadButton}
              <p className="dropzone__drop-text">{dropText}</p>
            </div>
          </div>
        </section>
      )}
    </ReactDropZone>
  );
}
