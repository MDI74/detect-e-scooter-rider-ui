import Image from 'next/image';

export function ImageList({
  dataImageList,
}: {
  dataImageList: string[]
}) {
  return (
    <section className="image-list">
      <div className="container image-list__wrapper">
        <ul className="image-list__list">
          {dataImageList.map((dataImage) => (
            <li
              key={dataImage}
              className="image-list__item"
            >
              <span className="image-list__image">
                <Image
                  src={`data:image/jpg;base64,${dataImage}`}
                  fill
                  alt="Загруженное изображение"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
