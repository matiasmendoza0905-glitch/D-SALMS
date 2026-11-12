/* Ficha Técnica de Identidad de Marca: interacciones. */
DS.initBrandSheet=function(){
  var root=document.querySelector('[data-page="ficha-tecnica"]');if(!root)return;
  var $=function(s,c){return (c||root).querySelector(s)},$$=function(s,c){return [].slice.call((c||root).querySelectorAll(s))};
  var base=document.querySelector('.brand img').getAttribute('src').replace('assets/img/logos/ds-crema.jpg','');
  var logo=function(v,big){return base+'assets/img/logos/ds-'+v+(big?'-1600':'')+'.jpg'};
  /* 1. atributos de personalidad */
  var ATTR=[['Moderna','Composición editorial y tipografía Kalnia de alto contraste.'],['Juvenil','Colores vivos como el turquesa y el rojo en una paleta de cinco tonos.'],['Creativa','Símbolo DS personalizado y combinaciones cromáticas propias.'],['Cercana','Tono de voz cordial y mensajes claros.'],['Auténtica','Mensajes de fe propios y coherencia entre prendas y comunicación.'],['Inspiradora','El eslogan «Viste tu esencia» y los mensajes de inspiración.']];
  var setAttr=function(i){$$('[data-attr]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.attr==i)});$('#attr-panel').innerHTML='<b>'+ATTR[i][0]+'</b>Cómo se refleja: '+DS.esc(ATTR[i][1])};
  $$('[data-attr]').forEach(function(b){b.addEventListener('click',function(){setAttr(b.dataset.attr)})});setAttr(0);
  /* 2. iconología: acercamientos */
  var Z=[{s:1,o:'50% 50%',c:[50,50,0],t:'Símbolo DS oficial, sin alteraciones.'},{s:2.6,o:'66% 28%',c:[64,27,13],t:'Terminal superior curvo: observación gráfica de la forma.'},{s:2.2,o:'56% 55%',c:[57,54,14],t:'Curvas centrales entrelazadas: observación gráfica de la forma.'},{s:2.4,o:'30% 50%',c:[31,50,13],t:'Tronco vertical de la D: observación gráfica de la forma.'}];
  var setZ=function(i){var z=Z[i];$('#z-in').style.transform='scale('+z.s+')';$('#z-in').style.transformOrigin=z.o;var r=$('#z-ring');r.setAttribute('cx',z.c[0]);r.setAttribute('cy',z.c[1]);r.setAttribute('r',z.c[2]);$('#z-note').textContent=z.t;$$('[data-z]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.z==i)})};
  $$('[data-z]').forEach(function(b){b.addEventListener('click',function(){setZ(b.dataset.z)})});
  /* 3. iconología: elementos */
  var EL=[{n:'DS',m:'Identificación del nombre Design Salms.',v:'turquesa',k:'logo'},{n:'Kalnia',m:'Personalidad editorial y elegancia.',k:'font'},{n:'Turquesa',m:'Frescura y dinamismo.',v:'turquesa',h:'#2DB7C7',tc:'#000',k:'sw'},{n:'Crema',m:'Calidez y equilibrio.',v:'crema',h:'#F8F6EF',tc:'#000',k:'sw'},{n:'Negro',m:'Sofisticación y contraste.',v:'negro',h:'#000000',tc:'#fff',k:'sw'},{n:'Rojo',m:'Fuerza y expresividad.',v:'rojo',h:'#B22222',tc:'#fff',k:'sw'},{n:'Morado',m:'Profundidad y personalidad.',v:'morado',h:'#4B1B6B',tc:'#fff',k:'sw'},{n:'Fotografía editorial',m:'Presentación contemporánea.',k:'photo'},{n:'Mensajes de fe',m:'Inspiración conceptual.',k:'msg'}];
  var bh='';EL.forEach(function(e,i){bh+='<button type="button" aria-pressed="'+(i===0)+'" data-e="'+i+'">'+e.n+'</button>'});$('#el-btns').innerHTML=bh;
  var setEl=function(i){var e=EL[i],vis='';
    if(e.k==='logo')vis='<div class="el-vis" style="background:#F8F5EE"><img src="'+logo('turquesa')+'" alt="" width="150" height="150"></div>';
    else if(e.k==='font')vis='<div class="el-vis" style="background:#F8F6EF;color:#000;font:700 3rem Kalnia,serif">Aa</div>';
    else if(e.k==='sw')vis='<div class="el-vis" style="background:'+e.h+';color:'+e.tc+';border:1px solid #888;font-size:.95rem">'+e.h+'</div>';
    else if(e.k==='photo')vis='<div class="el-vis" style="background-image:url('+base+'assets/img/hero/portada-y-principal-900.jpg)"></div>';
    else vis='<div class="el-vis" style="background:#4B1B6B;color:#fff;font:700 1.15rem Kalnia,serif;text-align:center;padding:.6rem">Viste tu esencia</div>';
    $('#el-panel').innerHTML=vis+'<div><h4>'+e.n+'</h4><p><b>Significado visual:</b> '+DS.esc(e.m)+'</p><p style="opacity:.8;font-size:.95rem">Interpretación gráfica del proyecto.</p></div>';
    $$('[data-e]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.e==i)});
    if(e.v){var img=$('#z-img');img.src=logo(e.v,true);img.alt='Símbolo DS oficial, versión '+e.v}};
  $$('[data-e]').forEach(function(b){b.addEventListener('click',function(){setEl(+b.dataset.e)})});setEl(0);setZ(0);
  $('#int-table tbody').innerHTML=EL.map(function(e){return '<tr><th scope="row">'+DS.esc(e.n)+'</th><td>'+DS.esc(e.m)+'</td></tr>'}).join('');
  /* 4. imagen verbal: Así habla D’Salms */
  var CH=[{t:'Consulta de una prenda',m:[['u','Hola, quisiera ver polos con un mensaje de fe.'],['d','¡Hola! Gracias por escribirnos a D’Salms. Cuéntanos qué estilo te gusta y te mostramos los diseños de nuestra colección.'],['u','Busco algo sencillo para el día a día.'],['d','Perfecto. Un diseño sencillo con un mensaje que te inspire puede ser ideal. ¿Qué color prefieres?']]},
   {t:'Saludo inicial',m:[['d','¡Bienvenido a D’Salms! Moda contemporánea inspirada en la fe y la identidad. ¿En qué podemos ayudarte hoy?']]},
   {t:'Mensaje de inspiración',m:[['d','Tu estilo habla de quién eres. Hoy, viste lo que crees.']]},
   {t:'Cierre de atención',m:[['u','Gracias, lo voy a pensar.'],['d','Con gusto. Estamos atentos a lo que necesites. D’Salms, viste tu esencia.']]}];
  var timers=[],setChat=function(i){timers.forEach(clearTimeout);timers=[];var c=$('#chat');c.innerHTML='';
    $$('[data-ch]').forEach(function(b){b.setAttribute('aria-selected',b.dataset.ch==i)});
    CH[i].m.forEach(function(m,k){var add=function(){var d=document.createElement('div');d.className='bub '+m[0];d.innerHTML='<small>'+(m[0]==='u'?'Cliente':'D’Salms')+'</small>'+DS.esc(m[1]);c.appendChild(d)};
      if(DS.reduced())add();else timers.push(setTimeout(add,k*900))})};
  $('#chat-tabs').innerHTML=CH.map(function(c,i){return '<button type="button" role="tab" aria-selected="'+(i===0)+'" data-ch="'+i+'">'+c.t+'</button>'}).join('');
  $$('[data-ch]').forEach(function(b){b.addEventListener('click',function(){setChat(+b.dataset.ch)})});setChat(0);
  /* 5. ejercicio */
  $$('[data-step]').forEach(function(b){b.addEventListener('click',function(){$$('[data-step]').forEach(function(x){x.setAttribute('aria-selected',x===b)});$$('.ex-p').forEach(function(p){p.hidden=p.dataset.p!==b.dataset.step})})});
  var line=$('#phrase-line');$$('.words button').forEach(function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')!=='true';$$('.words button').forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed',on);line.classList.toggle('has-w',on);$$('span',line).forEach(function(s){s.classList.toggle('on',on&&s.dataset.w===b.dataset.w)})})});
  /* 6. cuadro comparativo */
  var Q=['¿Cómo se percibe D’Salms ante sus públicos?','¿Qué significan sus símbolos y elementos gráficos?','¿Cómo habla D’Salms y qué dice de sí misma?'];
  var setC=function(i){$$('#cmp tbody tr').forEach(function(r){r.setAttribute('aria-selected',r.dataset.c==i)});$$('.tn').forEach(function(g){g.classList.toggle('on',g.dataset.c==i)});$('#tri').classList.add('sel');$('#cmp-q').innerHTML='<b>Pregunta que responde:</b> '+Q[i]};
  $$('#cmp tbody tr,.tn').forEach(function(n){n.addEventListener('click',function(){setC(n.dataset.c)});n.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();setC(n.dataset.c)}})});
  /* subnav con resaltado de sección */
  var links=$$('.subnav a[href^="#"]',document),map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.removeAttribute('aria-current')});var a=map[e.target.id];if(a){a.setAttribute('aria-current','true');a.scrollIntoView({block:'nearest',inline:'center'})}}})},{rootMargin:'-30% 0px -60% 0px'});
  Object.keys(map).forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s)});
};
