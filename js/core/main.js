(function(){
  var run=function(){
    ['initPresentation','initNavigation','initReveal','initScrollTypography','initScramble','initLogoSelector','initLightbox','initCarousels','initPublicImage','initFoda','initBrandSheet'].forEach(function(n){
      if(DS[n]){try{DS[n]()}catch(e){console.error(n,e)}}
    });
  };
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run):run();
})();
