DS.initLogoSelector=function(){
  const root=document.querySelector('[data-logo-selector]');if(!root)return;
  const img=root.querySelector('img'),label=root.querySelector('[data-logo-label]');
  root.querySelectorAll('button[data-src]').forEach(b=>b.addEventListener('click',()=>{
    root.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));
    b.setAttribute('aria-pressed','true');img.src=b.dataset.src;img.alt='Símbolo DS de D’Salms, versión '+b.dataset.name;label.textContent=b.dataset.name;
  }));
}
