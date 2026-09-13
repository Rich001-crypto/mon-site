import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const assets={};
async function collect(dir){
  for(const entry of await readdir(dir,{withFileTypes:true})){
    const file=path.join(dir,entry.name);
    if(entry.isDirectory()){await collect(file);continue;}
    if(!/\.(webp|png|jpeg)$/.test(file))continue;
    const key='/'+path.relative(path.join(root,'public'),file).split(path.sep).join('/');
    assets[key]={type:file.endsWith('.webp')?'image/webp':file.endsWith('.png')?'image/png':'image/jpeg',data:(await readFile(file)).toString('base64')};
  }
}
await collect(path.join(root,'public/images'));
const styles=await readFile(path.join(root,'worker/editorial.css'),'utf8');
const editorial=(await readFile(path.join(root,'worker/editorial.mjs'),'utf8')).replaceAll('export function ','function ');
let source=await readFile(path.join(root,'worker/index.js'),'utf8');
source=source.replace("import { editorialPages, editorialInteractions } from './editorial.mjs';",editorial);
source=source.replace('/* CSS_BUNDLE */ ""',()=>JSON.stringify(styles));
source=source.replace('/* IMAGE_BUNDLE */ {}',()=>JSON.stringify(assets));
await mkdir(path.join(root,'dist/server'),{recursive:true});
await mkdir(path.join(root,'dist/.openai/drizzle'),{recursive:true});
await writeFile(path.join(root,'dist/server/index.js'),source);
await copyFile(path.join(root,'.openai/hosting.json'),path.join(root,'dist/.openai/hosting.json'));
// Preserve the exact migration already deployed; this is an asset-only update.
await copyFile(path.join(root,'drizzle/0000_cemcc.sql'),path.join(root,'dist/.openai/drizzle/0000_cemcc.sql'));
console.log(`Build ready: ${Object.keys(assets).length} image files, ${Buffer.byteLength(source)} bytes; no external dependencies.`);
