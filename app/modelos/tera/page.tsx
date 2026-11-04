import type { Metadata } from "next";
import VehicleHero from "@/components/VehicleHero";
import FeatureGrid from "@/components/FeatureGrid";
import SpecificationTable from "@/components/SpecificationTable";
import ContactCTA from "@/components/ContactCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import {getVehicle} from "@/lib/vehicles";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
 title: "Volkswagen Tera MY27: versões, cores e equipamentos",
 description: "Conheça as versões Tera MPI, TSI, Comfort 200 TSI e High 200 TSI. Compare motorização, transmissão, equipamentos e cores do Volkswagen Tera MY27.",
 alternates: { canonical: "/modelos/tera" },
 openGraph: { title: "Volkswagen Tera MY27 | CompreVolks", description: "Compare as versões e equipamentos do Volkswagen Tera MY27.", url: "https://comprevolks.com.br/modelos/tera", type: "website" },
 robots: { index: true, follow: true }
};

const teraVersions = [
 {name:"Tera MPI", engine:"1.0 MPI · 84 cv", transmission:"Manual de 5 velocidades", highlights:"6 airbags, AEB, painel digital de 8 polegadas e VW Play de 10,1 polegadas com App-Connect."},
 {name:"Tera TSI", engine:"1.0 TSI · 116 cv", transmission:"Manual de 5 velocidades", highlights:"Câmera traseira, Kessy, painel digital de 8 polegadas e VW Play de 10,1 polegadas com App-Connect."},
 {name:"Tera Comfort 200 TSI", engine:"200 TSI · 128 cv", transmission:"Automática de 8 velocidades", highlights:"ACC, câmera traseira, VW Play Connect e rodas de liga leve aro 16 polegadas."},
 {name:"Tera High 200 TSI", engine:"200 TSI · 128 cv", transmission:"Automática de 8 velocidades", highlights:"Climatronic Touch, carregamento por indução, painel digital de 10,25 polegadas e rodas de liga leve aro 17 polegadas."}
];

export default async function ModelPage(){
 const vehicle=await getVehicle("tera");
 if(!vehicle)return <main className="section"><div className="container section-heading"><h1>Modelo não encontrado.</h1></div></main>;
 const schema={"@context":"https://schema.org","@type":"Product","name":"Volkswagen Tera MY27","brand":{"@type":"Brand","name":"Volkswagen"},"description":"SUV Volkswagen Tera MY27. Consulte versões, equipamentos, cores e condições com Otávio Silva.","url":"https://comprevolks.com.br/modelos/tera"};
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  <Breadcrumbs current={vehicle.title}/>
  <VehicleHero title="Volkswagen Tera MY27" subtitle="Design, tecnologia e segurança para acompanhar sua rotina." image={vehicle.hero_image} price={vehicle.price} availability={vehicle.availability}/>
  <section className="section"><div className="container"><div className="section-heading"><span>Conheça</span><h2>Volkswagen Tera MY27</h2><p>Compare as quatro configurações apresentadas no diagrama de produto MY27 e encontre a versão que combina com você.</p></div></div></section>
  <section className="section"><div className="container"><div className="section-heading"><span>VERSÕES E MOTORIZAÇÕES</span><h2>Escolha seu Tera</h2></div><div className="tera-seo-grid">{teraVersions.map(v=><article className="tera-seo-card" key={v.name}><h3>{v.name}</h3><strong>{v.engine}</strong><p><b>Transmissão:</b> {v.transmission}</p><p>{v.highlights}</p><a href="https://wa.me/5511947858479?text=Ol%C3%A1%20Ot%C3%A1vio%21%20Quero%20uma%20proposta%20do%20Volkswagen%20Tera%20MY27." target="_blank" rel="noopener noreferrer">Solicitar proposta ↗</a></article>)}</div><p className="tera-seo-note">Equipamentos e opcionais variam conforme a versão. Consulte disponibilidade e configuração no momento da proposta.</p></div></section>
  <FeatureGrid title="Destaques do modelo" items={vehicle.features}/>
  <SpecificationTable items={vehicle.specs}/>
  <ContactCTA/><LeadForm/>
 </>;
}
