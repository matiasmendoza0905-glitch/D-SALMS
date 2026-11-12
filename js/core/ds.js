/* Espacio de nombres global. Scripts clásicos (sin módulos) para que la web funcione también abriendo el HTML directamente. */
window.DS=window.DS||{};
DS.reduced=function(){return matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('presentation')};
DS.fmt=function(p){return p.toFixed(1).replace('.',',')+' %'};
DS.esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
