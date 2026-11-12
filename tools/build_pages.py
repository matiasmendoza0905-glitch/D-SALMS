# Generador de las 17 páginas HTML (la salida es HTML estático; este script no se necesita para publicar)
import os
import re
def fix_links(html):
    # Enlaces internos a carpeta -> index.html explícito (funciona con file://, servidor local y subrutas de GitHub Pages)
    return re.sub(r'href="((?:\./|\.\./)(?:[\w-]+/)?)"',lambda m:'href="'+m.group(1)+'index.html"',html)
import json
_M={}
try:
    for r in json.load(open("data/media-manifest.json",encoding="utf-8")).get("recursos_banco",[]):
        if "/lam/" in r["ruta"] or "/foto/" in r["ruta"]:
            w,h=r["dimension_original"].split("x");_M[os.path.basename(r["ruta"])[:-4]]=(("lam" if "/lam/" in r["ruta"] else "foto"),r["alt"],int(w),int(h))
except Exception as e: print("sin manifiesto",e)
def media(html):
    def rep(m):
        kind,slug,grp,cap=m.group(1),m.group(2),m.group(3),m.group(4)
        k,alt,w,h=_M[slug];cap=cap or alt
        a=f'<a class="gi {k}" href="{{R}}assets/img/banco/{k}/{slug}.jpg" data-lb="{grp}" data-cap="{cap}" style="aspect-ratio:{w}/{h}"><img src="{{R}}assets/img/banco/{k}/{slug}-t.jpg" alt="{alt}" loading="lazy" width="{w}" height="{h}"></a>'
        return f'<figure class="fig">{a}<figcaption>{cap}</figcaption></figure>' if kind=="fig" else a
    return re.sub(r'\{\{(gi|fig):([\w-]+):([\w-]+)(?:\|([^}]*))?\}\}',rep,html)
PAGES=[("","Inicio","",1),("empresa","Empresa","La Marca",4),("publico-objetivo","Público Objetivo","La Marca",4),
("identidad-corporativa","Identidad Corporativa","La Marca",4),("identidad-visual","Identidad Visual","La Marca",4),
("productos","Productos","Moda",5),("aplicaciones","Aplicaciones","Moda",5),
("imagen-institucional","Imagen Institucional","Imagen y Estudios",4),("imagen-publica","Imagen Pública","Imagen y Estudios",6),
("auditoria-imagen","Auditoría de Imagen Corporativa","Imagen y Estudios",7),("ficha-tecnica-identidad","Ficha Técnica de Identidad de Marca","Imagen y Estudios",9),
("comunicacion","Comunicación","Estrategia",7),("plan-comunicacion","Plan de Comunicación","Estrategia",7),("propuestas","Propuestas","Estrategia",8),
("manual-identidad","Manual de Identidad","Manual",8),("recursos-visuales","Recursos Visuales","Manual",8),("contacto","Contacto","Contacto",8)]
GROUPS=["La Marca","Moda","Imagen y Estudios","Estrategia","Manual"]
def href(R,slug): return R+(slug+"/index.html" if slug else "index.html")
def nav(R,cur):
    h=f'<li><a href="{R}"{" aria-current=\"page\"" if cur=="" else ""}>Inicio</a></li>'
    for g in GROUPS:
        items=[p for p in PAGES if p[2]==g]; has=any(p[0]==cur for p in items)
        subs="".join(f'<li><a href="{href(R,p[0])}"{" aria-current=\"page\"" if p[0]==cur else ""}>{p[1]}</a></li>' for p in items)
        h+=f'<li class="{"has-current" if has else ""}"><button type="button" aria-expanded="false" aria-haspopup="true">{g}</button><ul class="sub">{subs}</ul></li>'
    h+=f'<li><a href="{href(R,"contacto")}"{" aria-current=\"page\"" if cur=="contacto" else ""}>Contacto</a></li>'
    return h
def shell(slug,title,body,R,extra_css="",extra_js=()):
    full="D’Salms — "+title if slug else "D’Salms — Viste tu esencia."
    css="".join(f'<link rel="stylesheet" href="{R}css/{c}.css">' for c in ["tokens","base","nav","components","motion"]+([extra_css] if isinstance(extra_css,str) and extra_css else list(extra_css)))
    CORE=["core/ds","core/navigation","animations/reveal","animations/scroll-typography","animations/letter-scramble","components/logo-selector","components/presentation-mode","components/lightbox"]
    js="".join(f'<script defer src="{R}js/{j}.js"></script>' for j in CORE+list(extra_js)+["core/main"])
    foot="".join(f'<li><a href="{href(R,p[0])}">{p[1]}</a></li>' for p in PAGES)
    return f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{full}</title>
<meta name="description" content="D’Salms: moda contemporánea de inspiración cristiana. Viste tu esencia. Pichanaqui, Junín, Perú.">
<meta name="theme-color" content="#000000"><link rel="icon" href="{R}assets/img/logos/ds-turquesa.jpg">
<script>document.documentElement.classList.add("js")</script>
{css}</head>
<body class="page-enter"><a class="skip" href="#contenido">Saltar al contenido</a>
<header class="site-header"><div class="wrap"><a class="brand" href="{R}" aria-label="D’Salms, ir al inicio"><img src="{R}assets/img/logos/ds-crema.jpg" alt="Símbolo DS de D’Salms" width="40" height="40"><span>D’Salms</span></a>
<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav">Menú</button>
<ul class="nav" id="nav" aria-label="Navegación principal">{nav(R,slug)}</ul></div></header>
<main id="contenido">{body}</main>
<footer class="site-footer"><div class="wrap"><div class="foot-grid"><div><a class="brand" href="{R}"><img src="{R}assets/img/logos/ds-crema.jpg" alt="" width="40" height="40"><span>D’Salms</span></a><p style="margin-top:1rem">Viste tu esencia.<br>Pichanaqui, Junín, Perú.</p></div>
<ul class="foot-links">{foot}</ul></div><p class="foot-note">Design Salms S.A.C. · Proyecto académico de Diseño Gráfico Digital, SENATI · D’Salms V12.0</p></div></footer>
{js}</body></html>'''
HOME='''
<section class="hero" aria-label="Portada D’Salms">
<picture><source media="(max-width:700px)" srcset="{R}assets/img/hero/portada-y-principal-900.jpg"><source media="(max-width:1400px)" srcset="{R}assets/img/hero/portada-y-principal-1600.jpg">
<img src="{R}assets/img/hero/portada-y-principal-2560.jpg" width="2560" height="1429" alt="Amanecer sobre una avenida de la ciudad, con el símbolo DS de D’Salms sobre el cielo" fetchpriority="high"></picture>
<div class="hero-copy"><div class="wrap">
<h1><span><i>VISTE TU</i></span><span><i>ESENCIA.</i></span></h1>
<p class="lead">Moda contemporánea inspirada en la fe y la identidad.</p>
<div class="actions"><a class="btn btn--solid" href="{R}productos/">Explorar colecciones</a><a class="btn btn--ghost" href="{R}empresa/">Conocer la marca</a></div></div></div>
<span class="scroll-ind" aria-hidden="true">DESLIZA</span></section>

<section class="manifesto" aria-labelledby="man-t"><div class="m-block"><p id="man-t" class="reveal">La fe también se lleva puesta.</p></div>
<div class="m-text reveal"><img src="{R}assets/img/logos/ds-turquesa.jpg" alt="Símbolo DS de D’Salms en turquesa" width="92" height="92">
<p>D’Salms nace en 2026 en Pichanaqui como una iniciativa que une la fe cristiana, el diseño gráfico y la moda contemporánea.</p>
<p>Cada prenda busca que quien la lleva exprese lo que cree y quién es.</p><a class="btn btn--dark" href="{R}empresa/" style="width:max-content">Leer la historia</a></div></section>

<section class="st" data-scroll-type aria-label="VISTE TU ESENCIA"><div class="st-sticky"><div class="st-track" aria-hidden="true">VISTE TU ESENCIA.</div><span class="sr">Viste tu esencia.</span></div></section>

<section id="colecciones" aria-labelledby="col-t"><div class="wrap sec"><div class="col-head"><h2 id="col-t">Cinco familias de prendas</h2><a class="btn btn--dark" href="{R}productos/">Ver catálogo</a></div></div>
<ul class="col-list">
<li><a class="c1" href="{R}productos/"><span class="n">01</span><span class="t">Polos</span><span class="go">Ver colección</span></a></li>
<li><a class="c2" href="{R}productos/"><span class="n">02</span><span class="t">Hoodies y buzos</span><span class="go">Ver colección</span></a></li>
<li><a class="c3" href="{R}productos/"><span class="n">03</span><span class="t">Conjuntos</span><span class="go">Ver colección</span></a></li>
<li><a class="c4" href="{R}productos/"><span class="n">04</span><span class="t">Camisas</span><span class="go">Ver colección</span></a></li>
<li><a class="c5" href="{R}productos/"><span class="n">05</span><span class="t">Pantalones</span><span class="go">Ver colección</span></a></li></ul></section>

<section class="fil sec"><div class="wrap fil-grid"><div class="reveal"><h2>Estilo moderno, mensaje de fe.</h2>
<p>Nuestra misión es ofrecer prendas de calidad que combinen un estilo moderno con mensajes inspirados en la fe cristiana.</p>
<p>La visión: ser una marca reconocida en Pichanaqui y, progresivamente, en otras ciudades del Perú para 2028.</p></div>
<div class="vals reveal"><div class="val"><h3>Fe</h3><p>Mensajes inspirados en la fe cristiana.</p></div><div class="val"><h3>Calidad</h3><p>Prendas pensadas para durar y verse bien.</p></div>
<div class="val"><h3>Creatividad</h3><p>Diseño gráfico aplicado a la moda.</p></div><div class="val"><h3>Identidad</h3><p>Que cada persona exprese quién es.</p></div></div></div></section>

<section class="proc sec"><div class="wrap"><h2>Del mensaje a la prenda</h2>
<ol class="steps"><li class="reveal"><h3>Un mensaje de fe</h3><p>Todo diseño parte de una idea o pasaje que inspira.</p></li>
<li class="reveal"><h3>Diseño gráfico</h3><p>Tipografía, color y composición dan forma visual al mensaje.</p></li>
<li class="reveal"><h3>Prenda contemporánea</h3><p>El diseño se lleva a polos, hoodies, conjuntos, camisas y pantalones.</p></li>
<li class="reveal"><h3>Comunicación</h3><p>La marca se presenta con un tono cercano y una identidad coherente.</p></li></ol></div></section>

<section class="ident sec" aria-labelledby="id-t"><div class="wrap ident-grid" data-logo-selector>
<div class="ident-logo"><img src="{R}assets/img/logos/ds-turquesa.jpg" alt="Símbolo DS de D’Salms, versión turquesa" width="460" height="460"></div>
<div><h2 id="id-t" data-scramble="Viste tu esencia.">Viste tu esencia.</h2>
<p>El símbolo DS en sus cinco versiones oficiales. Versión actual: <strong data-logo-label>turquesa</strong>.</p>
<div class="var-btns" role="group" aria-label="Versiones del símbolo">
<button type="button" aria-pressed="true" data-name="turquesa" data-src="{R}assets/img/logos/ds-turquesa.jpg">Turquesa</button>
<button type="button" aria-pressed="false" data-name="morado" data-src="{R}assets/img/logos/ds-morado.jpg">Morado</button>
<button type="button" aria-pressed="false" data-name="rojo" data-src="{R}assets/img/logos/ds-rojo.jpg">Rojo</button>
<button type="button" aria-pressed="false" data-name="negro" data-src="{R}assets/img/logos/ds-negro.jpg">Negro</button>
<button type="button" aria-pressed="false" data-name="crema sobre fondo oscuro" data-src="{R}assets/img/logos/ds-crema.jpg">Crema</button></div>
<div class="swatches"><div class="sw" style="background:#2DB7C7;color:#000">Turquesa<small>#2DB7C7</small></div><div class="sw" style="background:#F8F6EF;color:#000">Crema<small>#F8F6EF</small></div><div class="sw" style="background:#000;color:#F8F6EF;border:1px solid #555">Negro<small>#000000</small></div><div class="sw" style="background:#B22222;color:#F8F6EF">Rojo<small>#B22222</small></div><div class="sw" style="background:#4B1B6B;color:#F8F6EF">Morado<small>#4B1B6B</small></div></div>
<p style="margin-top:1.5rem"><a class="btn btn--ghost" href="{R}identidad-visual/">Identidad visual</a></p></div></div></section>

<section class="ficha" aria-labelledby="fi-t"><div class="f-img" role="img" aria-label="Fotografía de portada de D’Salms"></div>
<div class="f-txt"><p class="sub-t">IMAGOLOGÍA · ICONOLOGÍA · IMAGEN VERBAL</p><h2 id="fi-t">Ficha técnica de identidad de marca</h2>
<p>Tres dimensiones que explican cómo D’Salms construye y comunica su identidad.</p><a class="btn btn--ghost" href="{R}ficha-tecnica-identidad/" style="width:max-content">Explorar ficha técnica</a></div></section>

<section class="cierre"><h2>Viste tu esencia.</h2><p>Moda contemporánea de inspiración cristiana, desde Pichanaqui.</p>
<div class="actions"><a class="btn btn--ghost" href="{R}productos/">Ver colecciones</a><a class="btn btn--ghost" href="{R}contacto/">Contacto</a></div></section>'''
EXTRA={"imagen-publica":(["charts","foda"],["data/dsalms-data","charts/chart-engine","components/foda","pages/public-image"]),
 "ficha-tecnica-identidad":(["ficha"],["data/dsalms-data","pages/brand-identity-sheet"])}
for slug,title,grp,ph in PAGES:
    R="./" if slug=="" else "../"
    if slug=="": body=HOME.replace("{R}",R); css="home"
    else:
        body=f'<section class="wrap stub"><span class="phase">En construcción · Fase {ph}</span><h1>{title}</h1><p>Esta página ya forma parte de la arquitectura y de la navegación. Su contenido completo se construye en la fase {ph} del plan de producción.</p><p><a class="btn btn--dark" href="{R}">Volver al inicio</a></p></section>'; css=""
    ex_js=()
    bf=f"tools/pages/{slug}.html"
    if slug and os.path.exists(bf):
        body=media(open(bf,encoding="utf-8").read()).replace("{R}",R)
        css=["pages"]+EXTRA[slug][0]; ex_js=EXTRA[slug][1]
    d=slug or "."; os.makedirs(d,exist_ok=True)
    open(os.path.join(d,"index.html"),"w",encoding="utf-8").write(fix_links(shell(slug,title,body,R,css,ex_js)))
print(len(PAGES),"páginas")
