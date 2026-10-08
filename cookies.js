/* Contrallum · gestor de consentiment de cookies (RGPD / LSSI-CE)
   - Cap script no necessari s'executa abans del consentiment.
   - Rebutjar és tan fàcil com acceptar (mateix nivell i mateix pes visual).
   - Preferències granulars, guardades a localStorage i modificables des del peu de pàgina.
   Ús a les pàgines:  <script type="text/plain" data-cookie="analytics"> ...codi... </script>
                      <iframe data-cookie="marketing" data-src="https://..."></iframe>
   Enllaç per reobrir el panell:  <a href="#" data-ck-open>Cookies</a> */
(()=>{
const KEY='contrallum_cookies',VER=1,d=document;
const CATS=[
 {id:'necessary',name:'Necessàries',desc:'Imprescindibles per al funcionament de la web, com recordar aquesta mateixa elecció. No es poden desactivar.',locked:true},
 {id:'analytics',name:'Analítiques',desc:'Ens ajuden a entendre com s’usa la web, de forma agregada, per millorar-la.'},
 {id:'marketing',name:'Màrqueting',desc:'Permeten mostrar continguts o anuncis més rellevants, dins i fora de la web.'}];
const get=()=>{try{const v=JSON.parse(localStorage.getItem(KEY));return v&&v.v===VER?v.c:null}catch(e){return null}};
const save=c=>{const prev=get()||{},val={analytics:!!c.analytics,marketing:!!c.marketing};
 try{localStorage.setItem(KEY,JSON.stringify({v:VER,t:new Date().toISOString(),c:val}))}catch(e){}
 return{prev,val}};
function run(c){if(!c)return;
 d.querySelectorAll('script[type="text/plain"][data-cookie]').forEach(s=>{const cat=s.dataset.cookie;if(!c[cat])return;
  const n=d.createElement('script');for(const a of s.attributes){if(a.name!=='type'&&a.name!=='data-cookie')n.setAttribute(a.name,a.value)}
  n.text=s.textContent;s.replaceWith(n)});
 d.querySelectorAll('iframe[data-cookie][data-src]').forEach(f=>{if(c[f.dataset.cookie]&&!f.getAttribute('src'))f.setAttribute('src',f.dataset.src)})}
let el=null,promptTimer=null;
function ui(){if(el)return el;
 el=d.createElement('section');el.id='ck';el.className='ck';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-labelledby','ck-t');
 el.innerHTML=`<div class="ck-in">
 <div class="ck-view" data-view="main">
  <p class="ck-eyebrow">Cookies</p><h2 id="ck-t" class="ck-title">La teva privacitat, en les teves mans</h2>
  <p class="ck-text">Fem servir cookies necessàries per al funcionament de la web. Amb el teu permís, també usarem cookies analítiques i de màrqueting. Pots canviar la teva elecció quan vulguis. <a href="politica-privacitat.html#cookies">Més informació</a></p>
  <div class="ck-btns"><button type="button" class="ck-b" data-act="reject">Rebutjar tot</button><button type="button" class="ck-b" data-act="accept">Acceptar tot</button><button type="button" class="ck-b ghost" data-act="config">Configurar</button></div>
 </div>
 <div class="ck-view" data-view="config" hidden>
  <p class="ck-eyebrow">Preferències</p><h2 class="ck-title">Tria què acceptes</h2>
  <ul class="ck-cats">${CATS.map(c=>`<li><div><strong>${c.name}</strong><span>${c.desc}</span></div>${c.locked?'<span class="ck-always">Sempre actives</span>':`<label class="ck-sw"><input type="checkbox" role="switch" data-cat="${c.id}" aria-label="${c.name}"><i aria-hidden="true"></i></label>`}</li>`).join('')}</ul>
  <div class="ck-btns"><button type="button" class="ck-b ghost" data-act="back">Enrere</button><button type="button" class="ck-b" data-act="reject">Rebutjar tot</button><button type="button" class="ck-b" data-act="save">Desar preferències</button></div>
 </div></div>`;
 d.body.append(el);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;
  if(a==='config'){show('config');el.querySelector('[data-view=config] [data-act=save]').focus();return}
  if(a==='back'){show('main');return}
  const c=a==='accept'?{analytics:true,marketing:true}:a==='reject'?{analytics:false,marketing:false}:
   {analytics:el.querySelector('[data-cat=analytics]').checked,marketing:el.querySelector('[data-cat=marketing]').checked};
  decide(c)});
 el.addEventListener('keydown',e=>{if(e.key==='Escape'&&get())hide()});
 return el}
function show(v){el.querySelectorAll('[data-view]').forEach(x=>x.hidden=x.dataset.view!==v)}
function open(v){clearTimeout(promptTimer);promptTimer=null;ui();const c=get()||{};el.querySelectorAll('[data-cat]').forEach(i=>i.checked=!!c[i.dataset.cat]);show(v);el.hidden=false;
 const f=el.querySelector(`[data-view=${v}] [data-act]`);f&&f.focus({preventScroll:true})}
function hide(){if(el)el.hidden=true}
function decide(c){const {prev,val}=save(c);hide();
 if(Object.keys(val).some(k=>prev[k]===true&&!val[k])){location.reload();return}
 run(val);d.dispatchEvent(new CustomEvent('cookiechange',{detail:val}))}
d.addEventListener('click',e=>{const t=e.target.closest('[data-ck-open]');if(t){e.preventDefault();open('config')}});
window.ContrallumCookies={open:()=>open('config'),get,reset(){try{localStorage.removeItem(KEY)}catch(e){}location.reload()}};
function schedule(){const c=get();if(c){run(c);return}promptTimer=setTimeout(()=>{promptTimer=null;const saved=get();if(saved)run(saved);else open('main')},3000)}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
})();
