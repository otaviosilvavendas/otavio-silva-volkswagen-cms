import Link from "next/link";
import { getVehicles } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

export default async function Modelos() {
  const models = await getVehicles();

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow" style={{ color: "#bcd4ee" }}>Volkswagen</span>
            <h1>Escolha o seu próximo Volkswagen.</h1>
            <p>Conheça os modelos e fale diretamente comigo para receber uma proposta personalizada.</p>
          </div>
          <div className="hero-visual">
            <div className="car-shape" />
          </div>
        </div>
      </section>

      <section className="section vehicles">
        <div className="container">
          <div className="section-heading">
            <span>Modelos</span>
            <h2>Linha Volkswagen.</h2>
          </div>

          <div className="vehicle-grid">
            {models.map((model) => (
              <article className="vehicle-card" key={model.slug}>
                <div
                  className="vehicle-art"
                  style={
                    model.hero_image
                      ? {
                          backgroundImage: `url(${model.hero_image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                />
                <div className="vehicle-info">
                  <h3>{model.title}</h3>
                  <p>{model.subtitle}</p>
                  {model.price ? (
                    <strong className="vehicle-price">{model.price}</strong>
                  ) : null}
                  <Link className="text-link" href={`/modelos/${model.slug}`}>
                    Conhecer modelo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
