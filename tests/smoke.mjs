import assert from "node:assert/strict";
import worker from "../worker/index.js";

const calls=[];
const statement = sql => ({sql,args:[],bind(...args){this.args=args;return this},async run(){calls.push({sql,args:this.args});return {results:[]}}});
const env={DB:{prepare:statement,async batch(items){return items.map((_,i)=>({results:i<4?[{c:0}]:[]}))}},BUCKET:{async put(){}}};
const ctx={};
for(const path of ["/","/cemcc","/services","/formations","/organisations","/realisations","/ressources","/demande-service","/paiement","/contact","/admin","/confidentialite","/mentions-legales","/robots.txt","/sitemap.xml"]){
  const response=await worker.fetch(new Request(`https://example.test${path}`),env,ctx);
  assert.equal(response.status,200,path);
  assert.ok((await response.text()).length>20,path);
}
const invalid=await worker.fetch(new Request("https://example.test/api/request",{method:"POST",headers:{"content-type":"application/json","origin":"https://example.test"},body:JSON.stringify({name:"A"})}),env,ctx);
assert.equal(invalid.status,400);
const valid=await worker.fetch(new Request("https://example.test/api/request",{method:"POST",headers:{"content-type":"application/json","origin":"https://example.test"},body:JSON.stringify({name:"Jean Test",email:"jean@example.test",whatsapp:"+243000000000",profile:"Chercheur",service:"Analyse de données",description:"Analyse scientifique complète pour un jeu de données de recherche."})}),env,ctx);
assert.equal(valid.status,201);
assert.match((await valid.json()).reference,/^CSRAD-\d{4}-[A-F0-9]{6}$/);
assert.ok(calls.length>=2);
console.log("Smoke tests: OK");
