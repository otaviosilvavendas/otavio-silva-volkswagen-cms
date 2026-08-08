import type { Metadata } from "next";
import "./globals.css";
const siteUrl="https://www.otaviosilva.com.br";
export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  title:{default:"Otávio Silva | Volkswagen",template:"%s | Otávio Silva Volkswagen"},
  description:"Otávio Silva — 14 anos de experiência comercializando automóveis. Atendimento especializado Volkswagen em São Paulo.",
  keywords:["Otávio Silva Volkswagen","Volkswagen São Paulo","Volkswagen Jardins","Volkswagen Caraigá","Jetta GLI","Tiguan","Taos","T-Cross","Nivus","Polo","Tera"],
  alternates:{canonical:"/"},
  openGraph:{type:"website",locale:"pt_BR",url:siteUrl,siteName:"Otávio Silva | Volkswagen",title:"Otávio Silva | Volkswagen",description:"Atendimento especializado Volkswagen. 14 anos de experiência comercializando automóveis.",images:[{url:"/og-image.svg",width:1200,height:630,alt:"Otávio Silva Volkswagen"}]},
  twitter:{card:"summary_large_image",title:"Otávio Silva | Volkswagen",description:"14 anos de experiência comercializando automóveis.",images:["/og-image.svg"]},
  robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}){
 const schema={"@context":"https://schema.org","@type":"Person",name:"Otávio Silva",jobTitle:"Consultor de vendas Volkswagen",url:siteUrl,telephone:"+55 11 94785-8479",worksFor:{"@type":"Organization",name:"Volkswagen Caraigá"}};
 return <html lang="pt-BR"><head><link rel="manifest" href="/manifest.webmanifest" /></head><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>;
}
