"use client";

import Link from "next/link";
import { ArrowRight, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [["Accueil","/"],["CEMCC","/cemcc"],["Services","/services"],["Formations","/formations"],["Projets","/realisations"],["Ressources","/ressources"],["Contact","/contact"]];
const wa = "https://wa.me/243975121886?text=Bonjour%20CSRAD%2FCEMCC%2C%20je%20souhaite%20obtenir%20des%20informations%20concernant%20vos%20services.";

export function Brand(){return <Link href="/" className="flex items-center gap-3" aria-label="Accueil CEMCC CSRAD"><span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan to-blue-600 text-sm font-black text-white shadow-lg shadow-cyan/20">C·C</span><span className="leading-tight"><strong className="block text-[15px] tracking-tight">CEMCC <b className="text-cyan">/ CSRAD</b></strong><small className="block text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">Science au service de l’impact</small></span></Link>}

export function SiteShell({children}:{children:React.ReactNode}){
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(scrollY>16);h();addEventListener("scroll",h,{passive:true});return()=>removeEventListener("scroll",h)},[]);
  return <div className="min-h-screen bg-white text-navy">
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled?"border-b border-white/10 bg-[#06172a]/95 shadow-xl backdrop-blur-xl":"bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 text-white lg:px-10"><Brand/><nav className="hidden items-center gap-6 xl:flex" aria-label="Navigation principale">{nav.map(([n,h])=><Link className="nav-link" href={h} key={h}>{n}</Link>)}</nav><div className="hidden items-center gap-3 md:flex"><a className="button button-whatsapp !px-4 !py-3" href={wa} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4"/> WhatsApp</a><Link className="button button-primary !px-4 !py-3" href="/demande-service">Demander un service</Link></div><button className="rounded-xl border border-white/20 p-2.5 xl:hidden" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Ouvrir le menu">{open?<X/>:<Menu/>}</button></div>
      {open&&<div className="border-t border-white/10 bg-[#06172a] px-5 pb-6 text-white xl:hidden"><nav className="grid py-4">{nav.map(([n,h])=><Link onClick={()=>setOpen(false)} className="border-b border-white/10 py-3" href={h} key={h}>{n}</Link>)}</nav><div className="grid gap-2 sm:grid-cols-2"><a className="button button-whatsapp" href={wa}><MessageCircle className="h-4 w-4"/> WhatsApp</a><Link className="button button-primary" href="/demande-service">Demander un service</Link></div></div>}
    </header>
    {children}
    <footer className="bg-[#06172a] pb-24 pt-16 text-slate-300 md:pb-10"><div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-10"><div><Brand/><p className="mt-5 text-sm leading-6">Collège d’Étudiants et Médecins Chrétiens Chercheurs et Centre de Services en Recherche et Analyse des Données.</p></div><div><h3 className="footer-title">Services CSRAD</h3>{["Recherche scientifique","Analyse de données","Collecte terrain","Formations"].map(x=><Link key={x} href="/services">{x}</Link>)}</div><div><h3 className="footer-title">Ressources</h3><Link href="/ressources">Guides gratuits</Link><Link href="/realisations">Réalisations</Link><Link href="/paiement">Paiement Airtel Money</Link><Link href="/admin">Espace administration</Link></div><div><h3 className="footer-title">Contact</h3><p>Goma, Nord-Kivu<br/>République Démocratique du Congo</p><a href={wa}>WhatsApp : +243 975 121 886</a><a href="mailto:cemcc1207@mail.com">cemcc1207@mail.com</a></div></div><div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 pt-6 text-xs text-slate-500 md:flex-row md:justify-between lg:px-10"><p>© CEMCC ASBL / CSRAD. Tous droits réservés.</p><div className="flex gap-4"><Link href="/confidentialite">Confidentialité</Link><Link href="/mentions-legales">Mentions légales</Link></div></div></footer>
    <a className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#20b858] text-white shadow-2xl transition-transform hover:-translate-y-1 md:bottom-6" href={wa} target="_blank" rel="noreferrer" aria-label="Contacter CSRAD sur WhatsApp"><MessageCircle/></a>
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(0,0,0,.08)] backdrop-blur md:hidden"><a className="button button-whatsapp !py-3" href={wa}><MessageCircle className="h-4 w-4"/> WhatsApp</a><Link className="button button-primary !py-3" href="/demande-service">Demander <ArrowRight className="h-4 w-4"/></Link></div>
  </div>
}
