import ReactDropZone from 'react-dropzone';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

export function Dropzone(
  {
    onDrop,
    disabled,
    description,
    uploadButton,
  }: {
    onDrop: (filse: File[]) => void;
    disabled: boolean;
    description: string;
    uploadButton: ReactNode
  },
) {
  return (
    <ReactDropZone
      noClick
      disabled={disabled}
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
              <p className="dropzone__drop-text">или перетащите их cюда</p>
            </div>

          </div>
        </section>
      )}
    </ReactDropZone>
  );
}
