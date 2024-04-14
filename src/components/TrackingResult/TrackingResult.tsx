export function Video({
  videoSrc,
}: {
  videoSrc: string;
}) {
  return (
    <section className="tracking-result">
      <div className="tracking-result__wrapper">
        <div
          className="tracking-result__video"
        >
          <video
            height="100%"
            width="100%"
            controls
            playsInline
            preload="auto"
            muted
            src={videoSrc}
          />
        </div>
      </div>
    </section>

  );
}
