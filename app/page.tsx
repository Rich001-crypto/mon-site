import Link from "next/link";
import { ArrowRight, BarChart3, BookOpenCheck, Database, GraduationCap, Microscope, ShieldCheck, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

const services = [
  { icon: Microscope, title: "Recherche scientifique", text: "Un accompagnement méthodologique rigoureux, de la problématique à la soutenance.", href: "/services#recherche" },
  { icon: BarChart3, title: "Analyse de données", text: "Des analyses claires et défendables avec SPSS, R, Excel et XLSTAT.", href: "/services#analyse" },
  { icon: Database, title: "Collecte terrain", text: "Questionnaires, KoboToolbox, ODK, contrôle qualité et bases structurées.", href: "/services#collecte" },
  { icon: GraduationCap, title: "Formations pratiques", text: "Des compétences immédiatement applicables en recherche, data et visualisation.", href: "/formations" },
];

export default function Home() {
  return <SiteShell><main>
    <section className="hero-grid relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(0,201,226,.16),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(218,178,89,.08),transparent_32%)]" />
      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-16 px-5 pb-20 pt-28 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pt-24">
        <div className="max-w-3xl animate-enter">
          <div className="eyebrow mb-7"><span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_18px_#19d8eb]" /> Recherche • Données • Santé • Impact</div>
          <h1 className="max-w-4xl text-[clamp(3rem,7vw,6.6rem)] font-extrabold leading-[.93] tracking-[-.055em]">Transformez vos données en <span className="text-gradient">décisions.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">Le CSRAD accompagne étudiants, chercheurs, professionnels et organisations dans la recherche scientifique, la collecte, l’analyse et la valorisation des données.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link className="button button-primary group" href="/services">Découvrir nos services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link><Link className="button button-ghost" href="/demande-service">Demander un devis</Link></div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Accompagnement éthique</span><span>Goma — RDC</span><span>Services à distance</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[580px] animate-enter-delay" aria-label="Aperçu d’un tableau de bord d’analyse">
          <div className="absolute -inset-8 rounded-full bg-cyan/10 blur-3xl" />
          <div className="dashboard-card relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0b2342]/85 p-4 shadow-[0_38px_100px_rgba(0,0,0,.38)] backdrop-blur-xl sm:p-6">
            <div className="mb-7 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-cyan">Intelligence des données</p><p className="mt-2 text-lg font-semibold">Vue d’analyse</p></div><div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-gold"/><span className="h-2 w-2 rounded-full bg-cyan"/><span className="h-2 w-2 rounded-full bg-white/30"/></div></div>
            <div className="grid grid-cols-2 gap-3"><div className="metric-card"><span>Qualité des données</span><strong>Données vérifiées</strong><small>Contrôles documentés</small></div><div className="metric-card"><span>Analyse</span><strong>Résultats lisibles</strong><small>Tableaux & graphiques</small></div></div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[.045] p-5"><div className="mb-5 flex items-center justify-between"><div><span className="text-xs text-slate-400">Parcours analytique</span><p className="font-semibold">De la collecte à la décision</p></div><Sparkles className="h-5 w-5 text-gold" /></div><div className="chart flex h-44 items-end gap-2" aria-hidden="true">{[32,46,41,62,55,76,68,88,81,96].map((h,i)=><span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-cyan" style={{height:`${h}%`,animationDelay:`${i*80}ms`}} />)}</div><div className="mt-4 flex items-center justify-between text-xs text-slate-400"><span>Collecter</span><span>Analyser</span><span>Comprendre</span><span>Décider</span></div></div>
          </div>
          <div className="float-card absolute -bottom-7 -left-4 hidden items-center gap-3 rounded-2xl border border-white/15 bg-white p-4 text-navy shadow-2xl sm:flex"><div className="rounded-xl bg-cyan/15 p-3"><BookOpenCheck className="h-5 w-5 text-blue-700" /></div><div><strong className="block text-sm">Méthode solide</strong><span className="text-xs text-slate-500">Conseils pédagogiques</span></div></div>
        </div>
      </div>
    </section>
    <section className="section bg-white"><div className="mx-auto max-w-7xl px-5 lg:px-10"><div className="section-heading"><div><span className="kicker">Expertises CSRAD</span><h2>Un appui scientifique qui fait avancer votre projet.</h2></div><p>Choisissez votre point de départ. Notre équipe vous aide à clarifier le besoin et à construire la bonne intervention.</p></div><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{services.map(({icon:Icon,...service})=><Link href={service.href} key={service.title} className="service-card group"><div className="icon-box"><Icon className="h-6 w-6"/></div><h3>{service.title}</h3><p>{service.text}</p><span>En savoir plus <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></span></Link>)}</div><div className="mt-16 grid overflow-hidden rounded-[2rem] bg-[#07182d] text-white lg:grid-cols-[1fr_1.15fr]"><div className="p-8 sm:p-12"><span className="kicker text-cyan">Pour les organisations</span><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Des données fiables pour de meilleures décisions.</h2><p className="mt-5 text-slate-300">Études, collecte terrain, suivi-évaluation, dashboards et renforcement des capacités adaptés aux ONG et institutions.</p><Link className="button button-primary mt-8" href="/organisations">Parler à un expert <ArrowRight className="h-4 w-4"/></Link></div><div className="org-panel grid gap-3 p-8 sm:grid-cols-2 sm:p-12">{["Collecte terrain","Études & évaluations","Dashboards Power BI","Formation des équipes"].map((x,i)=><div className="rounded-2xl border border-white/10 bg-white/[.055] p-5" key={x}><span className="text-xs font-bold text-gold">0{i+1}</span><p className="mt-4 font-semibold">{x}</p></div>)}</div></div></div></section>
  </main></SiteShell>;
}
