import Image from 'next/image';
import React from 'react';
import preloader from '../../../public/preloader.svg';

export default function Preloader() {
  return (
    <div className="preloader">
      <Image src={preloader} alt="Preloader" />
      <span className="preloader__text">Идет обработка...</span>
    </div>
  );
}
