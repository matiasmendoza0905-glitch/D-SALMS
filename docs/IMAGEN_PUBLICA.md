# Imagen Pública — documentación técnica
- Ruta: `imagen-publica/index.html`. Datos: `data/public-image.json` (copia para el navegador en `js/data/dsalms-data.js`, generada por `tools/build_data.py`).
- Base: 15 registros × 10 preguntas = 150 respuestas, leídas del Excel `DSalms_Encuesta_15_Respuestas_Graficos.xlsx`. El script verifica que la hoja «Tabulación» del Excel coincide con el conteo de la matriz.
- Las frecuencias, porcentajes, Pareto, tablas, tarjetas y diagnóstico se calculan en el navegador desde `respuestas` (una sola fuente).
- Gráficos (`js/charts/chart-engine.js`, SVG propio sin librerías): P1 circular, P2 barras verticales, P3 dona, P4 barras horizontales, P5 circular, P6 dona, P7 columnas, P8 circular, P9 barras horizontales, P10 Pareto (barras ordenadas + % acumulado + línea de 80 %).
- Procedencia: datos de práctica; se explica en Metodología, sin repetir avisos en cada gráfico.
- Agrupación cognitiva/afectiva/conductual y las estrategias son propuestas de trabajo, rotuladas como tales.
