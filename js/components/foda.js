/* Componente FODA reutilizable. Lee window.DSALMS.foda (generado desde data/foda.json). Se monta en cualquier [data-foda]. */
DS.initFoda=function(){
  var mounts=document.querySelectorAll('[data-foda]');if(!mounts.length||!window.DSALMS)return;
  var cuad=DSALMS.foda.cuadrantes;
  mounts.forEach(function(m){
    var h='<div class="foda-axis foda-axis-top"><span>Favorable</span><span>Desfavorable</span></div><div class="foda-grid" role="list">';
    // orden visual: F D / O A  → filas = origen (interno/externo), columnas = signo
    ['F','D','O','A'].forEach(function(id){
      var c=cuad.filter(function(x){return x.id===id})[0];
      h+='<button type="button" class="fq fq-'+id+'" role="listitem" aria-pressed="false" data-q="'+id+'"><span class="fq-h"><span class="fq-l">'+id+'</span><span class="fq-n">'+c.nombre+'</span></span><span class="fq-tag">Factor '+c.origen.toLowerCase()+' · '+c.signo.toLowerCase()+'</span><ul>'+c.items.map(function(t){return '<li>'+DS.esc(t)+'</li>'}).join('')+'</ul></button>';
    });
    h+='</div><div class="foda-axis foda-axis-side"><span>Interno</span><span>Externo</span></div>';
    m.innerHTML=h;
    m.querySelectorAll('.fq').forEach(function(b){b.addEventListener('click',function(){
      var on=b.getAttribute('aria-pressed')!=='true';
      m.querySelectorAll('.fq').forEach(function(x){x.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed',on);m.classList.toggle('has-sel',on);
    })});
  });
};
