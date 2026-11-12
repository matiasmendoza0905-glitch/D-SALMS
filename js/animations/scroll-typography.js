DS.initScrollTypography=function(){
  const sec=document.querySelector('[data-scroll-type]');
  if(!sec)return;
  const track=sec.querySelector('.st-track');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){sec.classList.add('static');return}
  let vis=false,ticking=false;
  const update=()=>{
    ticking=false;
    const r=sec.getBoundingClientRect(),total=sec.offsetHeight-innerHeight;
    const p=Math.min(1,Math.max(0,-r.top/total));
    const dist=track.scrollWidth-innerWidth;
    track.style.transform=`translate3d(${-p*dist}px,0,0)`;
  };
  const req=()=>{if(!ticking&&vis){ticking=true;requestAnimationFrame(update)}};
  new IntersectionObserver(e=>{vis=e[0].isIntersecting;req()}).observe(sec);
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req);
}
