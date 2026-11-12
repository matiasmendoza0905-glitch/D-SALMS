const CH='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
DS.initScramble=function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-scramble]').forEach(el=>{
    const final=el.dataset.scramble;let raf;
    el.setAttribute('aria-label',final);
    const run=()=>{
      if(reduce){el.textContent=final;return}
      cancelAnimationFrame(raf);const t0=performance.now(),dur=1100;
      const tick=now=>{
        const p=Math.min(1,(now-t0)/dur),n=Math.floor(p*final.length);
        el.textContent=final.split('').map((c,i)=>c===' '||i<n?c:CH[Math.random()*CH.length|0]).join('');
        if(p<1)raf=requestAnimationFrame(tick);else el.textContent=final;
      };raf=requestAnimationFrame(tick);
    };
    el.setAttribute('role','button');el.tabIndex=0;
    ['mouseenter','focus','click','touchstart'].forEach(ev=>el.addEventListener(ev,run,{passive:true}));
    new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){run();o.disconnect()}}).observe(el);
  });
}
