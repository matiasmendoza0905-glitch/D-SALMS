/* Motor de gráficos SVG propio. Tipos: pie, donut, barV, barH, col, pareto. Todos reciben {labels, values, total} calculados desde la misma base. */
(function(){
  var NS='http://www.w3.org/2000/svg';
  var COL=['#2DB7C7','#4B1B6B','#B22222','#1F1F1F','#8FD3DC'];
  var TXT=['#000','#fff','#fff','#fff','#000'];
  function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a||{})e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
  function pct(v,t){return v/t*100}
  function tip(fig){var t=fig.querySelector('.chart-tip');return t}
  function wire(fig,node,i,d){
    node.setAttribute('tabindex','0');node.setAttribute('data-i',i);node.classList.add('dp');
    node.setAttribute('aria-label',d.labels[i]+': '+d.values[i]+' de '+d.total+', '+DS.fmt(pct(d.values[i],d.total)));
    var show=function(ev){
      fig.classList.add('hl');fig.setAttribute('data-hl',i);
      var t=tip(fig),r=fig.querySelector('.chart-stage').getBoundingClientRect(),b=node.getBoundingClientRect();
      t.innerHTML='<strong>'+DS.esc(d.labels[i])+'</strong><br>'+d.values[i]+' de '+d.total+' · '+DS.fmt(pct(d.values[i],d.total));
      t.style.left=Math.min(Math.max(b.left+b.width/2-r.left,70),r.width-70)+'px';t.style.top=(b.top-r.top)+'px';t.hidden=false;
    };
    var hide=function(){fig.classList.remove('hl');tip(fig).hidden=true};
    node.addEventListener('pointerenter',show);node.addEventListener('focus',show);
    node.addEventListener('pointerleave',hide);node.addEventListener('blur',hide);
    node.addEventListener('click',function(){var on=fig.getAttribute('data-pin')==i;fig.setAttribute('data-pin',on?'':i);fig.classList.toggle('pinned',!on)});
  }
  function arcs(svg,fig,d,donut){
    var cx=150,cy=150,R=donut?96:70,sw=donut?44:140,circ=2*Math.PI*R,acc=0;
    var g=el('g',{transform:'rotate(-90 150 150)'},svg);
    d.values.forEach(function(v,i){
      if(!v)return;var len=v/d.total*circ;
      var c=el('circle',{cx:cx,cy:cy,r:R,fill:'none',stroke:COL[i%5],'stroke-width':sw,'class':'arc'},g);
      c.style.setProperty('--len',len);c.style.setProperty('--circ',circ);c.style.strokeDashoffset=-acc;c.style.transitionDelay=(i*.12)+'s';
      c.setAttribute('stroke-linecap','butt');wire(fig,c,i,d);acc+=len;
    });
    // etiquetas de porcentaje sobre cada porción
    var a0=0;d.values.forEach(function(v,i){
      if(!v){return}var a=v/d.total*2*Math.PI,m=a0+a/2-Math.PI/2;a0+=a;
      if(v/d.total<.08)return;var rr=donut?R:R+0;
      var t=el('text',{x:cx+Math.cos(m)*rr,y:cy+Math.sin(m)*rr+5,'text-anchor':'middle','class':donut?'slice-t sm':'slice-t',fill:TXT[i%5]},svg);t.textContent=DS.fmt(pct(v,d.total)).replace(' %','%');
    });
    if(donut){var c1=el('text',{x:cx,y:cy-2,'text-anchor':'middle','class':'ctr-n'},svg);c1.textContent='n = '+d.total;var c2=el('text',{x:cx,y:cy+20,'text-anchor':'middle','class':'ctr-s'},svg);c2.textContent='registros'}
  }
  function bars(svg,fig,d,horiz,col){
    var max=Math.max.apply(null,d.values),top=Math.max(max,Math.ceil(max/2)*2);
    if(horiz){
      var W=560,L=190,rowH=48,H=rowH*d.values.length+30;svg.setAttribute('viewBox','0 0 '+W+' '+H);
      for(var k=0;k<=top;k+=2){var x=L+(W-L-120)*k/top;el('line',{x1:x,x2:x,y1:6,y2:H-24,'class':'grid'},svg);var tt=el('text',{x:x,y:H-6,'text-anchor':'middle','class':'axis-t'},svg);tt.textContent=k}
      d.values.forEach(function(v,i){
        var y=10+i*rowH,w=(W-L-120)*v/top;
        var lb=el('text',{x:L-10,y:y+rowH/2-4,'text-anchor':'end','class':'cat-t'},svg);lb.textContent=d.labels[i];
        var r=el('rect',{x:L,y:y+4,width:Math.max(w,2),height:rowH-18,rx:4,fill:COL[i%5],'class':'bar bar-h'},svg);r.style.transitionDelay=(i*.1)+'s';wire(fig,r,i,d);
        var vt=el('text',{x:L+w+8,y:y+rowH/2-4,'class':'val-t'},svg);vt.textContent=v+' · '+DS.fmt(pct(v,d.total));
      });
    } else {
      var n=d.values.length,W=560,H=330,L=44,B=64,T=34,cw=(W-L-10)/n,bw=col?cw*.74:cw*.46;svg.setAttribute('viewBox','0 0 '+W+' '+H);
      for(var k=0;k<=top;k+=2){var y=H-B-(H-B-T)*k/top;el('line',{x1:L,x2:W-10,y1:y,y2:y,'class':'grid'},svg);var tt=el('text',{x:L-8,y:y+4,'text-anchor':'end','class':'axis-t'},svg);tt.textContent=k}
      d.values.forEach(function(v,i){
        var h=(H-B-T)*v/top,x=L+i*cw+(cw-bw)/2,y=H-B-h;
        var fill=col?'url(#gcol)':COL[i%5];
        var r=el('rect',{x:x,y:y,width:bw,height:Math.max(h,2),rx:col?2:bw/2.4,fill:fill,'class':'bar bar-v'},svg);r.style.transitionDelay=(i*.1)+'s';wire(fig,r,i,d);
        var vt=el('text',{x:x+bw/2,y:y-8,'text-anchor':'middle','class':'val-t'},svg);vt.textContent=v+' · '+DS.fmt(pct(v,d.total)).replace(' %','%');
        var lb=el('text',{x:x+bw/2,y:H-B+18,'text-anchor':'middle','class':'cat-t cat-s'},svg),words=d.labels[i].split(' '),half=Math.ceil(words.length/2);
        var s1=el('tspan',{x:x+bw/2,dy:0},lb);s1.textContent=words.slice(0,half).join(' ');
        if(words.length>1){var s2=el('tspan',{x:x+bw/2,dy:15},lb);s2.textContent=words.slice(half).join(' ')}
      });
    }
  }
  function pareto(svg,fig,d){
    var idx=d.values.map(function(v,i){return i}).sort(function(a,b){return d.values[b]-d.values[a]||a-b});
    var L=d.labels.length,labels=idx.map(function(i){return d.labels[i]}),vals=idx.map(function(i){return d.values[i]});
    var W=640,H=380,Lm=48,Rm=56,T=30,B=84,cw=(W-Lm-Rm)/L,bw=cw*.6,top=Math.ceil(Math.max.apply(null,vals)/5)*5||5,top=Math.max(top,d.total);
    svg.setAttribute('viewBox','0 0 '+W+' '+H);
    var ch=H-T-B;
    for(var k=0;k<=5;k++){var y=H-B-ch*k/5;el('line',{x1:Lm,x2:W-Rm,y1:y,y2:y,'class':'grid'},svg);
      var a=el('text',{x:Lm-8,y:y+4,'text-anchor':'end','class':'axis-t'},svg);a.textContent=Math.round(top*k/5);
      var b=el('text',{x:W-Rm+8,y:y+4,'class':'axis-t'},svg);b.textContent=(k*20)+'%'}
    var y80=H-B-ch*.8;el('line',{x1:Lm,x2:W-Rm,y1:y80,y2:y80,'class':'ref'},svg);var r8=el('text',{x:W-Rm-4,y:y80-6,'text-anchor':'end','class':'ref-t'},svg);r8.textContent='80 %';
    var cum=0,pts=[],cums=[];
    vals.forEach(function(v,i){
      var h=ch*v/top,x=Lm+i*cw+(cw-bw)/2,y=H-B-h;
      var r=el('rect',{x:x,y:y,width:bw,height:h,rx:3,fill:COL[idx[i]%5]==='#1F1F1F'?'#4B1B6B':'#4B1B6B','class':'bar bar-v'},svg);r.style.transitionDelay=(i*.1)+'s';wire(fig,r,idx[i],d);
      var vt=el('text',{x:x+bw/2,y:y+20,'text-anchor':'middle','class':'val-t',fill:'#fff'},svg);vt.textContent=v;
      cum+=v;cums.push(cum/d.total*100);pts.push([Lm+i*cw+cw/2,H-B-ch*cum/d.total]);
      var lb=el('text',{x:x+bw/2,y:H-B+16,'text-anchor':'middle','class':'cat-t cat-s'},svg),words=labels[i].split(' '),half=Math.ceil(words.length/2);
      var s1=el('tspan',{x:x+bw/2,dy:0},lb);s1.textContent=words.slice(0,half).join(' ');
      if(words.length>1){var s2=el('tspan',{x:x+bw/2,dy:14},lb);s2.textContent=words.slice(half).join(' ')}
    });
    var path=el('path',{d:'M'+pts.map(function(p){return p[0]+' '+p[1]}).join(' L'),fill:'none',stroke:'#B22222','stroke-width':3.5,'class':'pline',pathLength:1},svg);
    pts.forEach(function(p,i){el('circle',{cx:p[0],cy:p[1],r:6,fill:'#B22222',stroke:'#fff','stroke-width':2,'class':'pdot'},svg);
      var t=el('text',{x:p[0],y:p[1]-12,'text-anchor':'middle','class':'cum-t'},svg);t.textContent=DS.fmt(cums[i]).replace(' %','%')});
    fig._cums=cums;fig._order=idx;
  }
  DS.chart=function(fig,type,d){
    var stage=fig.querySelector('.chart-stage'),svg=el('svg',{viewBox:'0 0 300 300','class':'chart-svg',role:'group','aria-label':fig.getAttribute('data-title')},stage);
    var defs=el('defs',{},svg),g=el('linearGradient',{id:'gcol-'+fig.id,x1:0,y1:0,x2:0,y2:1},defs);
    el('stop',{offset:'0','stop-color':'#B22222'},g);el('stop',{offset:'1','stop-color':'#4B1B6B'},g);
    if(type==='pie')arcs(svg,fig,d,false);else if(type==='donut')arcs(svg,fig,d,true);
    else if(type==='barH')bars(svg,fig,d,true);else if(type==='barV')bars(svg,fig,d,false,false);
    else if(type==='col')bars(svg,fig,d,false,true);else if(type==='pareto')pareto(svg,fig,d);
    svg.querySelectorAll('[fill="url(#gcol)"]').forEach(function(n){n.setAttribute('fill','url(#gcol-'+fig.id+')')});
    if(type==='pie'||type==='donut')svg.setAttribute('viewBox','0 0 300 300');
    if(DS.reduced()){fig.classList.add('in')}else{
      new IntersectionObserver(function(e,o){if(e[0].isIntersecting){fig.classList.add('in');o.disconnect()}},{threshold:.25}).observe(fig);
    }
    // leyenda y tabla sincronizadas con el resaltado
    fig.addEventListener('pointerover',function(e){var r=e.target.closest&&e.target.closest('[data-row]');if(r){fig.setAttribute('data-hl',r.getAttribute('data-row'));fig.classList.add('hl')}});
    fig.addEventListener('pointerout',function(e){if(e.target.closest&&e.target.closest('[data-row]')){fig.classList.remove('hl')}});
  };
  DS.COL=COL;DS.COLTXT=TXT;
})();
