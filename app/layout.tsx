import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cemcc-csrad-goma.sites.openai.com"),
  title: { default: "CEMCC ASBL / CSRAD — Recherche & analyse des données", template: "%s | CEMCC / CSRAD" },
  description: "Recherche scientifique, analyse de données, collecte terrain et formations à Goma, en RDC et à distance.",
  keywords: ["CSRAD Goma","analyse de données Goma","SPSS Goma","formation SPSS RDC","CEMCC ASBL"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: { title:"CEMCC ASBL / CSRAD", description:"Transformez vos données en décisions. Transformez votre recherche en impact.", type:"website", locale:"fr_CD" },
};

export default function RootLayout({children}:{children:React.ReactNode}){
  const jsonLd={"@context":"https://schema.org","@type":"Organization",name:"CEMCC ASBL / CSRAD",address:{"@type":"PostalAddress",addressLocality:"Goma",addressRegion:"Nord-Kivu",addressCountry:"CD"},email:"cemcc1207@mail.com",telephone:"+243975121886"};
  return <html lang="fr"><body><a href="#contenu" className="skip-link">Aller au contenu</a><div id="contenu">{children}</div><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/></body></html>
}
