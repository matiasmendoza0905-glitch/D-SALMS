# Exporta y optimiza los recursos seleccionados del banco D´Salms Proyect (índices = orden alfabético del ZIP).
import json,os
from PIL import Image
SRC="/home/claude/bank/D#U00b4Salms Proyect/";F=json.load(open('/home/claude/bank_index.json'))
LAM={
'imagologia-paleta':(72,'Lámina de imagología y paleta de colores con prendas, bolsas, gorra y muestras de color'),
'paleta-oficial':(73,'Lámina de la paleta de colores oficial con fotografías de inspiración y cinco muestras'),
'personalidad':(151,'Lámina «Nuestra personalidad»: moderna, juvenil, creativa, cercana, auténtica e inspiradora'),
'perfiles':(169,'Lámina «Perfiles distintos, una misma esencia» con Gabriel y Valeria'),
'identificador-analisis':(75,'Análisis gráfico del identificador DS con retícula, ampliaciones y paleta oficial'),
'iconografia-construccion':(195,'Análisis de iconografía y construcción del símbolo DS con detalles de curvatura y proporción'),
'sistema-iconografia':(76,'Sistema de identidad e iconografía: logotipo, tipografía, color y fotografía'),
'elementos-graficos':(111,'Sistema de elementos gráficos: ondas, degradados, patrones DS y texturas'),
'tipografia-logotipo':(122,'Análisis tipográfico del logotipo D’Salms con anotaciones'),
'kalnia':(10,'Muestra de la tipografía Kalnia con mayúsculas, minúsculas y números'),
'paleta-colores':(14,'Paleta de colores: turquesa, crema, negro, rojo y morado'),
'combinaciones-cromaticas':(18,'Matriz de combinaciones cromáticas del logotipo'),
'variantes-logo':(178,'Variantes del logotipo en turquesa, negro y morado'),
'sistema-visual':(179,'Infografía del sistema de identidad visual: elegancia, creatividad, calidad y fe'),
'propuestas-logo':(5,'Propuestas de logotipo: bocetos y diseño seleccionado'),
'asi-habla-1':(74,'Lámina «Así habla D’Salms»: la voz en acción y la personalidad verbal'),
'asi-habla-2':(78,'Lámina «Así habla D’Salms»: conversación y atención, personalidad verbal'),
'imagologia-editorial':(88,'Imagología editorial: serie de modelos con prendas de colores y especificaciones'),
'moodboard-editorial':(89,'Moodboard editorial de D’Salms con prendas, bolsa y paleta'),
'imagologia-prendas':(79,'Imagología y paleta de colores con modelos en prendas turquesa, morado y rojo'),
'manual-lamina':(80,'Lámina del manual de identidad con fotografías, prendas y paleta'),
'swatches-collage':(270,'Collage de paleta con fotografías de prendas y círculos de color'),
'identidad-componentes':(27,'Diagrama: identidad visual, verbal, corporativa y cultural alrededor del símbolo DS'),
'tipografia-viste':(12,'Muestra tipográfica «Viste tu esencia»'),
'logos-fondos':(17,'Logotipo D’Salms sobre fondos negro, morado y rojo'),
}
FOTO={
'camp-negro':(207,'Cartel «Viste tu esencia» con modelo en hoodie negro y logotipo DS'),
'camp-morado':(208,'Pieza editorial «Viste tu esencia» con modelo en hoodie sobre fondo morado'),
'camp-formas':(212,'Campaña «Viste tu esencia» con formas morada, roja y turquesa'),
'camp-panel':(262,'Cartel «Viste tu esencia» con mujer en hoodie sobre panel morado'),
'camp-revista':(177,'Portada de revista D’Salms «Viste tu esencia»'),
'camp-saco':(226,'Portada editorial D’Salms con saco turquesa y «Viste tu esencia»'),
'camp-afiche':(58,'Afiche «Edición limitada, viste tu esencia» con modelos'),
'camp-valla':(43,'Valla «Nueva temporada, viste tu esencia» en plaza urbana'),
'camp-hoodie':(199,'Joven con hoodie turquesa «Viste tu esencia» en entorno urbano'),
'camp-fe':(170,'Pieza «Tu fe también tiene estilo»'),
'vida-collage':(9,'Collage de jóvenes con prendas turquesa y crema'),
'vida-escalera':(16,'Grupo de jóvenes sentados en una escalera con prendas D’Salms'),
'vida-paseo':(264,'Tres jóvenes caminando con prendas D’Salms'),
'vida-paseo2':(265,'Jóvenes caminando en un paseo urbano'),
'vida-escalinata':(140,'Jóvenes con prendas turquesa en una escalinata'),
'vida-trio':(108,'Tres modelos con prendas de degradado turquesa y morado'),
'vida-estudio':(230,'Pareja con prendas turquesa y crema frente a formas de color'),
'vida-noche':(54,'Pareja caminando de noche con hoodies de la colección Propósito'),
'vida-elegancia':(55,'«Elegancia y propósito»: pareja con abrigos en la calle'),
'fe-filipenses':(45,'Hoodie negro con estampado Filipenses 4:13 por delante y por detrás'),
'fe-salmos231':(70,'Polo negro con estampado Salmos 23:1'),
'fe-camisa':(238,'Camisa negra con frase «The Lord is my light and my salvation»'),
'fe-viva':(253,'Camisetas «Fe viva» en turquesa y negro'),
'fe-polo-salmos':(247,'Polo con Salmos 24:1 en la espalda'),
'fe-bordado':(53,'Bordado del símbolo DS y Salmo 23:1 sobre tela'),
'prod-pedestal':(69,'Polos y camisas D’Salms sobre pedestal'),
'prod-collage':(3,'Collage de prendas, papelería y jóvenes con el símbolo DS'),
'prod-polos':(20,'Polos crema y negros con símbolo DS'),
'prod-buzos':(21,'Buzos turquesa y negro con símbolo DS'),
'prod-bolsas':(26,'Bolsas de papel D’Salms en turquesa, crema y negro'),
'prod-etiquetas':(24,'Etiqueta y colgante D’Salms sobre prenda'),
'dig-perfil':(138,'Perfil de Instagram de D’Salms en un teléfono'),
'dig-redes':(149,'Publicaciones de Instagram «Viste con propósito»'),
'dig-facebook':(124,'Página de D’Salms en Facebook'),
'dig-redes2':(250,'Teléfonos con publicaciones, papelería y patrones de D’Salms'),
'dig-perfil2':(33,'Dos teléfonos con el perfil y la cuadrícula de D’Salms'),
'dig-compra':(143,'Persona viendo prendas D’Salms en un teléfono'),
'proc-taller':(267,'Diseñadora creando prendas D’Salms con bocetos y paleta'),
'proc-corte':(266,'Manos trabajando un polo con degradado turquesa y muestras'),
'proc-equipo':(115,'Equipo de trabajo en conceptualización con paneles de diseño'),
'proc-fotos':(134,'Sesión fotográfica de una prenda D’Salms en estudio'),
'id-fachada':(59,'Fachada de tienda D’Salms de noche'),
'id-pared':(62,'Logotipo D’Salms en relieve sobre muro de concreto'),
'id-tienda':(66,'Interior de boutique D’Salms'),
'id-ciudad':(245,'Símbolo DS sobre una ciudad al amanecer'),
'id-papeleria':(52,'Papelería morada y dorada de D’Salms'),
'id-llaveros':(29,'Llaveros y piezas con el símbolo DS'),
}
os.makedirs('assets/img/banco/lam',exist_ok=True);os.makedirs('assets/img/banco/foto',exist_ok=True)
man=[];tot=0
for kind,D,W in (('lam',LAM,2000),('foto',FOTO,1500)):
    for slug,(i,alt) in D.items():
        im=Image.open(SRC+F[i]).convert('RGB');w,h=im.size
        big=im.copy();big.thumbnail((W,W));p=f'assets/img/banco/{kind}/{slug}.jpg';big.save(p,quality=80,optimize=True,progressive=True)
        t=im.copy();t.thumbnail((640,640));tp=f'assets/img/banco/{kind}/{slug}-t.jpg';t.save(tp,quality=76,optimize=True,progressive=True)
        tot+=os.path.getsize(p)+os.path.getsize(tp)
        man.append(dict(origen=F[i],indice_zip=i,ruta=p,miniatura=tp,tipo='lámina informativa' if kind=='lam' else 'fotografía/campaña',dimension_original=f'{w}x{h}',dimension_web=f'{big.size[0]}x{big.size[1]}',alt=alt,estado='integrado'))
# logos oficiales del banco
LG={'completo-turquesa':182,'completo-crema':183,'completo-morado':184,'completo-negro':185,'completo-rojo':186}
os.makedirs('assets/img/logos',exist_ok=True)
for s,i in LG.items():
    im=Image.open(SRC+F[i]).convert('RGB');im.thumbnail((900,900));p=f'assets/img/logos/{s}.jpg';im.save(p,quality=88,optimize=True);tot+=os.path.getsize(p)
    man.append(dict(origen=F[i],indice_zip=i,ruta=p,tipo='logotipo completo oficial',alt='Logotipo completo D’Salms ('+s.split('-')[1]+')',estado='integrado'))
m=json.load(open('data/media-manifest.json',encoding='utf-8'))
m['bancoProyect3']=dict(recibido=True,archivo='D_Salms_Proyect.zip',total=276,extensiones={'jpg':144,'jpeg':120,'png':12},duplicados_exactos=0,nota='Clasificado revisando cada imagen en hojas de contacto. Los índices corresponden al orden alfabético de los archivos del ZIP.')
m['pendientes']=[p for p in m['pendientes'] if 'Fotografías de productos' not in p and 'Ficha Técnica: moodboard' not in p]
m['recursos_banco']=man
json.dump(m,open('data/media-manifest.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(len(man),'recursos exportados,',round(tot/1e6,1),'MB')
