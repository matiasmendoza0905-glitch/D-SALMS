DS.initNavigation=function(){
  const toggle=document.querySelector('.nav-toggle'),nav=document.querySelector('.nav');
  if(!toggle||!nav)return;
  toggle.addEventListener('click',()=>{const o=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',o)});
  nav.querySelectorAll('li > button').forEach(b=>{
    b.addEventListener('click',e=>{
      const li=b.parentElement,o=!li.classList.contains('open');
      nav.querySelectorAll('li.open').forEach(x=>{x.classList.remove('open');x.firstElementChild.setAttribute('aria-expanded','false')});
      li.classList.toggle('open',o);b.setAttribute('aria-expanded',o);e.stopPropagation();
    });
  });
  const closeAll=()=>nav.querySelectorAll('li.open').forEach(x=>{x.classList.remove('open');x.firstElementChild.setAttribute('aria-expanded','false')});
  document.addEventListener('click',closeAll);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAll();nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
}
