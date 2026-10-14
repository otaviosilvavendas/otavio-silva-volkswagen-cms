import type { Metadata } from "next";
import "./globals.css";
const siteUrl="https://comprevolks.com.br";
export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  title:{default:"CompreVolks com Otávio Silva | Volkswagen",template:"%s | CompreVolks"},
  description:"Encontre seu próximo Volkswagen com Otávio Silva. Consulte modelos, ofertas e solicite sua proposta com atendimento personalizado.",
  keywords:["Otávio Silva Volkswagen","Volkswagen São Paulo","CompreVolks","Volkswagen São Paulo","Jetta GLI","Tiguan","Taos","T-Cross","Nivus","Polo","Tera"],
  alternates:{canonical:"/"},
  openGraph:{type:"website",locale:"pt_BR",url:siteUrl,siteName:"CompreVolks com Otávio Silva",title:"CompreVolks com Otávio Silva | Volkswagen",description:"Encontre seu próximo Volkswagen com atendimento personalizado.",images:[{url:"/og-image.svg",width:1200,height:630,alt:"CompreVolks com Otávio Silva"}]},
  twitter:{card:"summary_large_image",title:"CompreVolks com Otávio Silva",description:"Encontre seu próximo Volkswagen com atendimento personalizado.",images:["/og-image.svg"]},
  robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}){
 const schema={"@context":"https://schema.org","@type":"Person",name:"Otávio Silva",jobTitle:"Consultor de vendas Volkswagen",url:siteUrl,telephone:"+55 11 94785-8479",worksFor:{"@type":"Organization",name:"CompreVolks"}};
 return <html lang="pt-BR"><head><link rel="manifest" href="/manifest.webmanifest" /></head><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>;
}
