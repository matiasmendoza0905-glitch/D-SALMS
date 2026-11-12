/* Modo presentación: contenido visible sin esperar animaciones, textos algo más grandes. */
DS.initPresentation=function(){
  var btns=document.querySelectorAll('[data-presentation-toggle]');
  var set=function(on){
    document.body.classList.toggle('presentation',on);
    btns.forEach(function(b){b.setAttribute('aria-pressed',on);b.textContent=on?'Modo presentación: activo':'Modo presentación'});
    document.querySelectorAll('.reveal').forEach(function(e){if(on)e.classList.add('in')});
    document.querySelectorAll('.chart').forEach(function(e){if(on)e.classList.add('in')});
    document.dispatchEvent(new CustomEvent('ds:presentation',{detail:on}));
  };
  var saved=false;try{saved=sessionStorage.getItem('ds-presentation')==='1'}catch(e){}
  btns.forEach(function(b){b.addEventListener('click',function(){var on=!document.body.classList.contains('presentation');try{sessionStorage.setItem('ds-presentation',on?'1':'0')}catch(e){}set(on)})});
  if(saved)set(true);
};
