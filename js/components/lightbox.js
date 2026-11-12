/* Lightbox accesible: cualquier <a data-lb="grupo" href="imagen-grande"> abre el visor. Sin JS, el enlace abre la imagen. */
DS.initLightbox=function(){
  var box=document.createElement('div');box.className='lb';box.hidden=true;box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label','Imagen ampliada');
  box.innerHTML='<span class="lb-c"></span><button type="button" class="lb-x" aria-label="Cerrar">×</button><button type="button" class="lb-p" aria-label="Anterior">‹</button><img alt=""><p class="lb-cap"></p><button type="button" class="lb-n" aria-label="Siguiente">›</button>';
  document.body.appendChild(box);
  var img=box.querySelector('img'),cap=box.querySelector('.lb-cap'),cnt=box.querySelector('.lb-c'),grp=[],i=0,last=null;
  var show=function(k){i=(k+grp.length)%grp.length;var a=grp[i],t=a.querySelector('img');img.src=a.getAttribute('href');img.alt=t?t.alt:'';cap.textContent=a.getAttribute('data-cap')||(t?t.alt:'');cnt.textContent=(i+1)+' / '+grp.length;box.querySelector('.lb-p').style.display=box.querySelector('.lb-n').style.display=grp.length>1?'':'none'};
  var close=function(){box.hidden=true;document.body.style.overflow='';img.src='';if(last)last.focus()};
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-lb]');if(!a)return;e.preventDefault();last=a;
    grp=[].slice.call(document.querySelectorAll('a[data-lb="'+a.getAttribute('data-lb')+'"]'));show(grp.indexOf(a));box.hidden=false;document.body.style.overflow='hidden';box.querySelector('.lb-x').focus();
  });
  box.querySelector('.lb-x').addEventListener('click',close);box.querySelector('.lb-p').addEventListener('click',function(){show(i-1)});box.querySelector('.lb-n').addEventListener('click',function(){show(i+1)});
  box.addEventListener('click',function(e){if(e.target===box)close()});
  document.addEventListener('keydown',function(e){if(box.hidden)return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(i-1);else if(e.key==='ArrowRight')show(i+1)});
};
DS.initCarousels=function(){
  document.querySelectorAll('[data-carousel]').forEach(function(c){
    var tr=c.querySelector('.car-track');var step=function(d){tr.scrollBy({left:d*tr.clientWidth*.9,behavior:DS.reduced()?'auto':'smooth'})};
    c.querySelector('.car-p').addEventListener('click',function(){step(-1)});c.querySelector('.car-n').addEventListener('click',function(){step(1)});
  });
};
