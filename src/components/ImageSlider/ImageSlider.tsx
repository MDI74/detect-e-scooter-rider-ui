import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export function ImageSlider({
  dataImageSrcList,
}: {
  dataImageSrcList: string[]
}) {
  const imageList: ReactImageGalleryItem[] = dataImageSrcList.map((imageSrc) => ({
    original: imageSrc,
    thumbnail: imageSrc,
    originalClass: 'image-slider__original',
    thumbnailClass: 'image-slider__thumbnail',
  }));

  if (imageList.length < 1) {
    return null;
  }

  return (
    <section className="image-slider">
      <div className="container image-slider__wrapper">
        <div className="image-slider__inner">
          <ImageGallery
            items={imageList}
            showPlayButton={false}
            showThumbnails
            showIndex
            showFullscreenButton={false}
            disableThumbnailScroll
          />
        </div>
      </div>
    </section>
  );
}
