# Genera data/public-image.json, data/foda.json y js/data/dsalms-data.js a partir del Excel y verifica la tabulación.
import openpyxl, json, os
from collections import Counter
X="/mnt/user-data/uploads/DSalms_Encuesta_15_Respuestas_Graficos_1.xlsx"
wb=openpyxl.load_workbook(X,data_only=True)
pre=[r for r in wb["Preguntas"].iter_rows(min_row=2,values_only=True) if r[0]]
resp=[r for r in wb["Respuestas"].iter_rows(min_row=2,max_row=16,values_only=True)]
assert len(resp)==15 and all(len(r)==11 for r in resp)
GRAF={1:"pie",2:"barV",3:"donut",4:"barH",5:"pie",6:"donut",7:"col",8:"pie",9:"barH",10:"pareto"}
fmt=lambda p:f"{p:.1f}".replace(".",",")+" %"
def plural(n,s,p): return f"{n} {s if n==1 else p}"
qs=[];freqs={}
for i,(pid,txt,alts) in enumerate(pre,1):
    ops=[a.strip() for a in alts.split("|")]
    col=[r[i] for r in resp]; c=Counter(col)
    assert set(c)<=set(ops),(pid,set(c)-set(ops))
    f=[c.get(o,0) for o in ops]; assert sum(f)==15; freqs[i]=(ops,f)
    qs.append(dict(id=pid,n=i,texto=txt,opciones=ops,grafico=GRAF[i],tipo="valoración" if i<=7 else "preferencia"))
# verificación contra la hoja Tabulación
tab=list(wb["Tabulación"].iter_rows(values_only=True)); k=0
for i in range(1,11):
    ops,f=freqs[i]
    while not (tab[k][1] or "").startswith(f"P{i:02d}"): k+=1
    got=[tab[k+2+j][2] for j in range(5)]; assert got==f,(i,got,f); k+=1
print("Tabulación del Excel verificada: 10 preguntas × 5 opciones coinciden con la matriz de respuestas")
for q in qs:
    i=q["n"];ops,f=freqs[i];m=max(f);lead=[o for o,x in zip(ops,f) if x==m]
    if i<=7:
        fav=f[0]+f[1];reg=f[2];neg=f[3]+f[4];assert neg==0
        t=f"Predomina «{lead[0]}» ({m} de 15; {fmt(m/15*100)}). Las dos opciones más favorables suman {fmt(fav/15*100)} ({fav} de 15); {plural(reg,'registro elige','registros eligen')} «{ops[2]}» y ninguno marca las dos opciones desfavorables."
        q["favorable"]=fav
    else:
        rest=[(o,x) for o,x in zip(ops,f) if o not in lead]
        if i==10:
            t=f"«{lead[0]}» y «{lead[1]}» empatan con {m} de 15 ({fmt(m/15*100)}) cada una; después aparecen «{ops[2]}» ({f[2]}), «{ops[3]}» ({f[3]}) y «{ops[4]}» ({f[4]}). Las tres primeras reúnen {fmt(sum(f[:3])/15*100)} y con la cuarta se llega a {fmt(sum(f[:4])/15*100)}."
        elif i==8:
            t=f"«{lead[0]}» lidera con {m} de 15 ({fmt(m/15*100)}). «{ops[1]}» y «{ops[2]}» obtienen {f[1]} cada una ({fmt(f[1]/15*100)}), «{ops[4]}» {f[4]} ({fmt(f[4]/15*100)}) y «{ops[3]}» {f[3]} ({fmt(f[3]/15*100)})."
        else:
            t=f"«{lead[0]}» lidera con {m} de 15 ({fmt(m/15*100)}). «{ops[1]}», «{ops[2]}» y «{ops[3]}» obtienen {f[1]} cada una ({fmt(f[1]/15*100)}); «{ops[4]}» no recibe respuestas."
    q["lectura"]=t
hdr=lambda i:f"A{i:02d}"
PI=dict(
 meta=dict(titulo="Estudio de imagen pública de D’Salms",registros=15,preguntas=10,respuestas=150,
   naturaleza="Ejercicio académico de tabulación y análisis de percepción visual. Los 15 registros son datos de práctica; no corresponden a un levantamiento de campo.",
   fuente="DSalms_Encuesta_15_Respuestas_Graficos.xlsx · 03_IMAGEN_PUBLICA_ENCUESTA_Y_FODA.docx",
   limitacion="Los resultados describen este conjunto de 15 registros y no son generalizables a los clientes de Pichanaqui."),
 preguntas=qs,
 participantes=[hdr(i) for i in range(1,16)],
 respuestas=[[r[i] for i in range(1,11)] for r in resp],
 acciones=[
  dict(prioridad="Alta",accion="Estandarizar fichas y fotografía de prendas",kpi="% de productos con ficha completa",evidencia="Auditoría del catálogo"),
  dict(prioridad="Alta",accion="Programar contenido de colecciones en redes",kpi="Frecuencia de publicaciones",evidencia="Calendario + métricas de plataforma"),
  dict(prioridad="Alta",accion="Aplicar una encuesta real posteriormente",kpi="N.º de respuestas válidas verificadas",evidencia="Formulario y consentimiento"),
  dict(prioridad="Media",accion="Mejorar claridad de contacto",kpi="% de enlaces operativos",evidencia="Revisión funcional web"),
  dict(prioridad="Media",accion="Monitorear consultas reales",kpi="Tiempo medio de respuesta",evidencia="Registro consentido y fechado")])
FODA=dict(version="1.0",nota="Fuente única de la matriz FODA. La usan Imagen Pública y Plan de Comunicación.",cuadrantes=[
 dict(id="F",nombre="Fortalezas",origen="Interno",signo="Favorable",items=["Identidad visual diferenciada con cinco colores oficiales.","Concepto de moda contemporánea de inspiración cristiana.","Portafolio visual masculino y femenino.","Relación coherente entre fe, moda y creatividad."]),
 dict(id="O",nombre="Oportunidades",origen="Externo",signo="Favorable",items=["Desarrollar contenido editorial para redes sociales.","Fortalecer la presentación digital del catálogo.","Conectar las colecciones con mensajes de fe.","Ampliar el alcance mediante canales digitales."]),
 dict(id="D",nombre="Debilidades",origen="Interno",signo="Desfavorable",items=["Necesidad de evaluar la reputación digital con datos reales.","Estandarizar fotografías y fichas de productos.","Fortalecer la información de contacto y atención.","Implementar seguimiento continuo de indicadores."]),
 dict(id="A",nombre="Amenazas",origen="Externo",signo="Desfavorable",items=["Competencia en el sector de moda contemporánea.","Cambios constantes en tendencias de consumo.","Saturación de contenido en redes sociales.","Riesgo de perder consistencia al ampliar aplicaciones."])])
os.makedirs("data",exist_ok=True);os.makedirs("js/data",exist_ok=True)
json.dump(PI,open("data/public-image.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
json.dump(FODA,open("data/foda.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
MEDIA={}
if os.path.exists("data/media-manifest.json"):
    for r in json.load(open("data/media-manifest.json",encoding="utf-8")).get("recursos_banco",[]):
        if "/lam/" in r["ruta"] or "/foto/" in r["ruta"]:
            w,h=r["dimension_original"].split("x");MEDIA[os.path.basename(r["ruta"])[:-4]]=dict(k="lam" if "/lam/" in r["ruta"] else "foto",alt=r["alt"],w=int(w),h=int(h))
open("js/data/dsalms-data.js","w",encoding="utf-8").write("/* Generado por tools/build_data.py desde data/*.json — no editar a mano. */\nwindow.DSALMS={publicImage:"+json.dumps(PI,ensure_ascii=False)+",foda:"+json.dumps(FODA,ensure_ascii=False)+",media:"+json.dumps(MEDIA,ensure_ascii=False)+"};\n")
for q in qs: print(q["id"],q["lectura"][:110])
