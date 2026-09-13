import { createRequire } from 'node:module';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

// Run once with the path to a locally installed sharp module. The published app
// uses the checked-in images; it never needs the source photo paths or sharp.
const sharp = createRequire(import.meta.url)(process.argv[2] || 'sharp');
const photos = [
  ['D:/Nouveau dossier/STATUT CEMCC/CONFERENCE 16 MARS/CEMMC Richard/IMG_15.jpg','cemcc/events/cemcc-rencontre-participants'],
  ['D:/Nouveau dossier/STATUT CEMCC/CONFERENCE 16 MARS/CEMMC Richard/IMG_53.jpg','cemcc/events/cemcc-intervention-conference'],
  ['D:/Nouveau dossier/STATUT CEMCC/FORMATION BIOSTATISTIQUE APPLIQUEE A LA MEDECINE/FINAL/LOGIK PICTURE(121).jpg','csrad/trainings/biostatistique-groupe'],
  ['D:/Nouveau dossier/STATUT CEMCC/FORMATION BIOSTATISTIQUE APPLIQUEE A LA MEDECINE/FINAL/LOGIK PICTURE(13).jpg','csrad/trainings/biostatistique-atelier'],
  ['D:/Nouveau dossier/STATUT CEMCC/HEALTHY HEART PROGRAM/IMAGES HH/IMG-32.jpg','cemcc/activities/healthy-heart-rencontre'],
];
for(const [source,name] of photos){
  const base=path.join('public/images',name);
  await mkdir(path.dirname(base),{recursive:true});
  for(const width of [640,1280,1920]){
    const info=await sharp(source).rotate().resize({width,withoutEnlargement:true}).webp({quality:84,effort:5}).toFile(`${base}-${width}.webp`);
    console.log(`${name}-${width}.webp ${info.width}x${info.height} ${info.size} bytes`);
  }
}
const logo='C:/Users/RICHARD/Downloads/WhatsApp Image 2026-09-12 at 23.53.47.jpeg';
await mkdir('public/images/cemcc/logo',{recursive:true});
await copyFile(logo,'public/images/cemcc/logo/cemcc-logo-officiel.jpeg');
await sharp(logo).trim({threshold:12}).extend({top:16,bottom:16,left:16,right:16,background:'#ffffff'}).resize({height:320}).webp({lossless:true}).toFile('public/images/cemcc/logo/cemcc-logo-compact.webp');
await sharp(logo).resize(96,96).png().toFile('public/images/cemcc/logo/cemcc-favicon.png');
