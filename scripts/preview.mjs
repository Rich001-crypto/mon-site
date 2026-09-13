import http from "node:http";
import { stat } from 'node:fs/promises';

const result = (rows=[]) => ({ results: rows });
const db = {
  prepare(sql) {
    const statement = {
      bind(){ return statement; },
      async run(){ return result(); },
      async all(){ return result(); }
    };
    return statement;
  },
  async batch(statements){ return statements.map((_,i)=>result(i<4?[{c:0}]:[])); }
};
const bucket = { async put(){ return {}; } };
const server = http.createServer(async (req,res)=>{
  const chunks=[]; for await (const chunk of req) chunks.push(chunk);
  const body=Buffer.concat(chunks);
  const request=new Request(`http://127.0.0.1:8787${req.url}`,{method:req.method,headers:req.headers,body:["GET","HEAD"].includes(req.method)?undefined:body});
  const version=(await stat(new URL('../dist/server/index.js',import.meta.url))).mtimeMs;
  const {default:worker}=await import(`../dist/server/index.js?version=${version}`);
  const response=req.url.startsWith('/api/') ? new Response(JSON.stringify({error:'La prévisualisation locale ne conserve pas les demandes. Utilisez la plateforme publiée.'}),{status:503,headers:{'content-type':'application/json'}}) : await worker.fetch(request,{DB:db,BUCKET:bucket,ADMIN_EMAILS:""},{});
  res.statusCode=response.status; response.headers.forEach((v,k)=>res.setHeader(k,v)); res.end(Buffer.from(await response.arrayBuffer()));
});
server.listen(8787,"127.0.0.1",()=>console.log("Local: http://127.0.0.1:8787"));
