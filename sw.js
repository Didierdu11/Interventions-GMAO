const C='maint-v2',SHELL=['./','index.html','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  const u=new URL(e.request.url);u.search='';
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){const k=u.href,x=r.clone();caches.open(C).then(c=>c.put(k,x))}return r})
    .catch(()=>caches.match(u.href)));
});
