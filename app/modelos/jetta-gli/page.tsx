import VehicleHero from "@/components/VehicleHero";
import FeatureGrid from "@/components/FeatureGrid";
import SpecificationTable from "@/components/SpecificationTable";
import ContactCTA from "@/components/ContactCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import VehicleGallery from "@/components/VehicleGallery";
import { getVehicle } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

export default async function ModelPage() {
  const vehicle = await getVehicle("jetta-gli");

  if (!vehicle)
    return (
      <main className="section">
        <div className="container section-heading">
          <h1>Modelo não encontrado.</h1>
        </div>
      </main>
    );

  return (
    <>
      <Breadcrumbs current={vehicle.title} />

      <VehicleHero
        title={vehicle.title}
        subtitle={vehicle.subtitle}
        image={vehicle.hero_image}
        price={vehicle.price}
        availability={vehicle.availability}
      />

      <VehicleGallery images={vehicle.gallery} />

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span>Conheça</span>
            <h2>{vehicle.title}</h2>
            <p>{vehicle.intro}</p>
          </div>
        </div>
      </section>

      <FeatureGrid
        title="Destaques do modelo"
        items={vehicle.features}
      />

      <SpecificationTable items={vehicle.specs} />

      <ContactCTA />
      <LeadForm />
    </>
  );
}