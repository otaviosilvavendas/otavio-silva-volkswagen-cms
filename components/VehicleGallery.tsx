export default function VehicleGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <span>Galeria</span>
          <h2>Conheça o Jetta GLI</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {images.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={`Jetta GLI - foto ${index + 1}`}
              style={{
                width: "100%",
                aspectRatio: "16 / 10",
                objectFit: "cover",
                borderRadius: "16px",
                display: "block",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}