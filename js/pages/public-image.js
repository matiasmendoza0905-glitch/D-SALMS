/* Página Imagen Pública: todo se calcula desde DSALMS.publicImage.respuestas (una sola base). */
DS.initPublicImage=function(){
  var root=document.querySelector('[data-page="imagen-publica"]');if(!root||!window.DSALMS)return;
  var D=DSALMS.publicImage,Q=D.preguntas,R=D.respuestas,N=R.length,fmt=DS.fmt,esc=DS.esc;
  var TITLES=['Impresión general de la marca','Diseño del logotipo','Colores corporativos','Tipografía de la marca','Diseño de las prendas','Mensajes de fe en las prendas','Coherencia de la identidad','Criterio para elegir una prenda','Canal preferido para novedades','Aspecto principal a mejorar'];
  var TYPES={pie:'Circular',donut:'Dona',barV:'Barras verticales',barH:'Barras horizontales',col:'Columnas',pareto:'Pareto'};
  var freq=Q.map(function(q,i){return q.opciones.map(function(o){return R.filter(function(r){return r[i]===o}).length})});
  var sum=function(a){return a.reduce(function(x,y){return x+y},0)};
  var fav=function(i){return (freq[i][0]+freq[i][1])/N*100};
  /* contadores del hero */
  root.querySelectorAll('[data-count]').forEach(function(e){
    var to=+e.dataset.count;if(DS.reduced()){e.textContent=to;return}
    var t0=performance.now();(function f(n){var p=Math.min(1,(n-t0)/1200);e.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0);
  });
  /* preguntas del instrumento */
  var qh='';Q.forEach(function(q,i){qh+='<details class="qd"><summary><b>P'+(i+1)+'</b><span>'+esc(q.texto)+'</span></summary><ol>'+q.opciones.map(function(o){return '<li>'+esc(o)+'</li>'}).join('')+'</ol><p class="qd-g">Gráfico asignado: '+TYPES[q.grafico]+'</p></details>'});
  document.getElementById('preguntas-mount').innerHTML=qh;
  /* base de datos */
  var th='<tr><th scope="col" class="sticky">Registro</th>'+Q.map(function(q,i){return '<th scope="col" title="'+esc(q.texto)+'">P'+(i+1)+'</th>'}).join('')+'</tr>';
  var tb=R.map(function(r,ri){return '<tr><th scope="row" class="sticky">'+D.participantes[ri]+'</th>'+r.map(function(v,i){var c=Q[i].opciones.indexOf(v)+1;return '<td data-code="'+c+'" data-v="'+(i<7?c:0)+'"><span class="t-txt">'+esc(v)+'</span><span class="t-cod">'+c+'</span></td>'}).join('')+'</tr>'}).join('');
  var tf='<tr class="tfoot"><th scope="row" class="sticky">Predomina</th>'+Q.map(function(q,i){var m=Math.max.apply(null,freq[i]);return '<td>'+freq[i].map(function(x,j){return x===m?esc(q.opciones[j]):null}).filter(Boolean).join(' / ')+'</td>'}).join('')+'</tr>';
  var tbl=document.getElementById('db-table');tbl.innerHTML='<thead>'+th+'</thead><tbody>'+tb+'</tbody><tfoot>'+tf+'</tfoot>';
  document.querySelectorAll('[data-db-view]').forEach(function(b){b.addEventListener('click',function(){
    document.querySelectorAll('[data-db-view]').forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');
    tbl.classList.toggle('codes',b.dataset.dbView==='cod')})});
  /* control de totales (calculado en vivo) */
  var allOk=freq.every(function(f){return sum(f)===N}),total=sum(freq.map(sum));
  document.getElementById('control-mount').innerHTML='<li class="ok"><b>'+N+'</b> registros × <b>'+Q.length+'</b> preguntas = <b>'+(N*Q.length)+'</b> respuestas esperadas</li><li class="'+(total===150?'ok':'bad')+'">Suma de todas las frecuencias: <b>'+total+'</b></li><li class="'+(allOk?'ok':'bad')+'">Cada pregunta suma <b>'+N+'</b> (100,0 %): '+(allOk?'verificado':'revisar')+'</li>';
  /* tarjetas de resultados */
  document.getElementById('cards-mount').innerHTML=Q.map(function(q,i){var m=Math.max.apply(null,freq[i]),lead=q.opciones.filter(function(o,j){return freq[i][j]===m});
    return '<a class="rcard reveal" href="#g'+(i+1)+'"><span class="rc-q">P'+(i+1)+'</span><span class="rc-t">'+TITLES[i]+'</span><span class="rc-v">'+esc(lead.join(' · '))+'</span><span class="rc-n">'+m+' de '+N+' · '+fmt(m/N*100)+'</span></a>'}).join('');
  /* diez gráficos */
  var base=document.querySelector('.brand').getAttribute('href').replace('index.html',''),MEDIA=DSALMS.media||{};
  var gi=function(slug,grp,cap){var m=MEDIA[slug];if(!m)return '';return '<a class="gi '+m.k+'" href="'+base+'assets/img/banco/'+m.k+'/'+slug+'.jpg" data-lb="'+grp+'" data-cap="'+esc(cap||m.alt)+'" style="aspect-ratio:'+m.w+'/'+m.h+'"><img src="'+base+'assets/img/banco/'+m.k+'/'+slug+'-t.jpg" alt="'+esc(m.alt)+'" loading="lazy" width="'+m.w+'" height="'+m.h+'"></a>'};
  var REL=['vida-escalera','logos-fondos','paleta-colores','kalnia','prod-pedestal','fe-filipenses','moodboard-editorial','prod-collage','dig-perfil','dig-redes'];
  var RELC=['Jóvenes con prendas D’Salms','El símbolo DS sobre distintos fondos','Paleta oficial de la marca','Tipografía Kalnia','Prendas D’Salms','Hoodie con mensaje de fe','Moodboard editorial','Productos de la marca','Perfil de Instagram de D’Salms','Publicaciones de la marca en redes'];
  var PAUSAS={2:{c:'',t:'Del resultado a la imagen: el identificador',s:'Después de valorar el logotipo (P2): el símbolo DS, su retícula y las propuestas que llevaron al diseño seleccionado.',g:['identificador-analisis','iconografia-construccion','propuestas-logo'],id:'ident'},
   4:{c:'pausa--m',t:'Del resultado a la imagen: paleta y tipografía',s:'Después de colores y tipografía (P3–P4): la paleta oficial, el análisis del logotipo y las combinaciones cromáticas permitidas.',g:['paleta-oficial','tipografia-logotipo','combinaciones-cromaticas'],id:'paleta'},
   6:{c:'',t:'Del resultado a la imagen: prendas con mensajes de fe',s:'Después de valorar las prendas y los mensajes de fe (P5–P6): referencias bíblicas aplicadas a polos, hoodies y camisas.',g:['fe-salmos231','fe-viva','fe-bordado','fe-camisa'],cls:'g4',id:'fe'},
   8:{c:'pausa--n',t:'Del resultado a la imagen: los productos',s:'Después del criterio de elección (P8), donde el diseño y la originalidad lideran: familias de prendas y empaques de la marca.',g:['prod-polos','prod-buzos','prod-bolsas','imagologia-prendas'],cls:'g4',id:'prod'},
   10:{c:'pausa--m',t:'Del resultado a la imagen: comunicación y presencia digital',s:'Después del canal preferido y el aspecto a mejorar (P9–P10): perfil, página y compra desde el teléfono.',g:['dig-perfil2','dig-facebook','dig-compra'],id:'digital'}};
  var mount=document.getElementById('charts-mount'),h='';
  Q.forEach(function(q,i){
    var rows=q.opciones.map(function(o,j){return '<tr data-row="'+j+'"><th scope="row"><i class="sw" style="background:'+DS.COL[j%5]+'"></i>'+esc(o)+'</th><td>'+freq[i][j]+'</td><td>'+fmt(freq[i][j]/N*100)+'</td></tr>'}).join('');
    var ex='';
    if(q.grafico==='pareto'){var idx=freq[i].map(function(v,j){return j}).sort(function(a,b){return freq[i][b]-freq[i][a]||a-b}),c=0;
      rows=idx.map(function(j){c+=freq[i][j];return '<tr data-row="'+j+'"><th scope="row"><i class="sw" style="background:#4B1B6B"></i>'+esc(q.opciones[j])+'</th><td>'+freq[i][j]+'</td><td>'+fmt(freq[i][j]/N*100)+'</td><td>'+fmt(c/N*100)+'</td></tr>'}).join('');
      ex='<th scope="col">% acum.</th>'}
    h+='<section class="chart-block '+(i%2?'alt':'')+'" id="g'+(i+1)+'" aria-labelledby="gt'+(i+1)+'"><div class="wrap">'+
      '<header class="cb-top"><div class="cb-id"><span class="cb-n">P'+(i+1)+'</span><span class="chip">'+TYPES[q.grafico]+'</span></div><div class="cb-tt"><h3 id="gt'+(i+1)+'">'+TITLES[i]+'</h3><p class="cb-q">'+esc(q.texto)+'</p></div><div class="cb-ph">'+gi(REL[i],'ip-q',RELC[i]+' · recurso relacionado con P'+(i+1))+'</div></header>'+
      '<div class="cb-main"><figure class="chart" id="ch'+(i+1)+'" data-title="'+esc(TITLES[i])+'"><div class="chart-stage"><div class="chart-tip" hidden></div></div><figcaption class="sr">'+esc(q.texto)+'</figcaption></figure>'+
      '<div class="cb-side"><table class="ftab"><caption class="sr">Tabla de frecuencias P'+(i+1)+'</caption><thead><tr><th scope="col">Alternativa</th><th scope="col">N</th><th scope="col">%</th>'+ex+'</tr></thead><tbody>'+rows+'</tbody><tfoot><tr><th scope="row">Total</th><td>'+sum(freq[i])+'</td><td>100,0 %</td>'+(ex?'<td></td>':'')+'</tr></tfoot></table>'+
      '<p class="cb-read"><b>Lectura.</b> '+esc(q.lectura)+'</p></div></div></div></section>';
    var P=PAUSAS[i+1];
    if(P)h+='<section class="pausa '+P.c+'" aria-label="Pausa editorial: '+esc(P.t)+'"><div class="wrap"><p class="pz-t">'+esc(P.t)+'</p><p class="pz-s">'+esc(P.s)+'</p><div class="gal pz-g '+(P.cls||'')+'">'+P.g.map(function(g){return gi(g,'ip-p'+(i+1))}).join('')+'</div></div></section>';
  });
  mount.innerHTML=h;
  Q.forEach(function(q,i){DS.chart(document.getElementById('ch'+(i+1)),q.grafico,{labels:q.opciones,values:freq[i],total:N})});
  /* diagnóstico: valoración favorable P1–P7 */
  var meter=function(l,v,cls){return '<div class="meter '+(cls||'')+'"><span class="m-l">'+l+'</span><span class="m-b"><i style="--w:'+v.toFixed(1)+'%"></i></span><span class="m-v">'+fmt(v)+'</span></div>'};
  var favs=[0,1,2,3,4,5,6].map(function(i){return {i:i,v:fav(i)}}),ord=favs.slice().sort(function(a,b){return b.v-a.v});
  document.getElementById('fav-mount').innerHTML=favs.map(function(f){return meter('P'+(f.i+1)+' · '+TITLES[f.i],f.v,f.v<75?'warn':'')}).join('');
  var hi=favs.filter(function(f){return f.v===ord[0].v}).map(function(f){return TITLES[f.i].toLowerCase()}),lo=favs.filter(function(f){return f.v===ord[6].v}).map(function(f){return TITLES[f.i].toLowerCase()});
  var avgFav=sum(favs.map(function(f){return f.v}))/7;
  document.getElementById('diag-text').innerHTML='<p>En las siete preguntas de valoración (P1–P7) el promedio de respuestas favorables es <b>'+fmt(avgFav)+'</b>. Ninguna pregunta registra las dos opciones desfavorables.</p><p>Lo mejor valorado: <b>'+hi.join(' y ')+'</b> ('+fmt(ord[0].v)+'). Lo que más margen tiene: <b>'+lo.join(' y ')+'</b> ('+fmt(ord[6].v)+'), donde 4 de 15 registros eligen «Regular».</p>';
  var topPref=function(i){var m=Math.max.apply(null,freq[i]);return Q[i].opciones.filter(function(o,j){return freq[i][j]===m}).join(' / ')+' · '+fmt(m/N*100)};
  document.getElementById('finds-mount').innerHTML='<article class="find"><small>Mejor valorado</small><b>'+hi.join(' y ')+'</b><span>'+fmt(ord[0].v)+' de respuestas favorables</span></article><article class="find"><small>Más margen de mejora</small><b>'+lo.join(' y ')+'</b><span>'+fmt(ord[6].v)+' favorables; 4 de 15 eligen «Regular»</span></article><article class="find"><small>Criterio de elección</small><b>'+esc(topPref(7))+'</b><span>P8 · opción más frecuente</span></article><article class="find"><small>Canal preferido</small><b>'+esc(topPref(8))+'</b><span>P9 · «Página web» no recibe elecciones</span></article>';
  /* componentes de percepción */
  var avg=function(a){return sum(a.map(fav))/a.length};
  var lead=function(i){var m=Math.max.apply(null,freq[i]);return Q[i].opciones.filter(function(o,j){return freq[i][j]===m}).join(' / ')+' ('+fmt(m/N*100)+')'};
  document.getElementById('perc-mount').innerHTML=
   '<article class="pc pc-c reveal"><h3>Cognitiva</h3><p class="pc-d">Cómo se reconoce y se entiende la identidad.</p><p class="pc-q">P2 logotipo · P4 tipografía · P7 coherencia</p>'+meter('Valoración favorable promedio',avg([1,3,6]))+'</article>'+
   '<article class="pc pc-a reveal"><h3>Afectiva</h3><p class="pc-d">Qué impresión y qué agrado produce.</p><p class="pc-q">P1 impresión · P3 colores · P5 prendas · P6 mensajes de fe</p>'+meter('Valoración favorable promedio',avg([0,2,4,5]))+'</article>'+
   '<article class="pc pc-b reveal"><h3>Conductual</h3><p class="pc-d">Qué prefieren y qué pedirían mejorar.</p><ul class="pc-l"><li><b>Elegiría por:</b> '+esc(lead(7))+'</li><li><b>Canal:</b> '+esc(lead(8))+'</li><li><b>A mejorar:</b> '+esc(lead(9))+'</li></ul></article>';
  /* comunicación digital */
  document.getElementById('canal-mount').innerHTML=Q[8].opciones.map(function(o,j){return meter(esc(o),freq[8][j]/N*100,freq[8][j]===0?'zero':'')}).join('');
  document.getElementById('mejora-mount').innerHTML=Q[9].opciones.map(function(o,j){return meter(esc(o),freq[9][j]/N*100)}).join('');
  /* subnav: scrollspy */
  var links=[].slice.call(document.querySelectorAll('.subnav a[href^="#"]')),map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.removeAttribute('aria-current')});var a=map[e.target.id];if(a){a.setAttribute('aria-current','true');a.scrollIntoView({block:'nearest',inline:'center'})}}})},{rootMargin:'-30% 0px -60% 0px'});
  Object.keys(map).forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s)});
  /* revelar tarjetas añadidas dinámicamente */
  if(DS.initReveal)DS.initReveal();
};
