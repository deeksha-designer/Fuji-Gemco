import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root=process.cwd(), port=4173;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json'};
createServer(async(req,res)=>{try{const raw=decodeURIComponent((req.url||'/').split('?')[0]);let path=normalize(join(root,raw==='/'?'index.html':raw));if(!path.startsWith(root))throw new Error('blocked');if((await stat(path)).isDirectory())path=join(path,'index.html');const data=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}}).listen(port,'127.0.0.1',()=>console.log(`Fuji Gemco preview: http://127.0.0.1:${port}`));
