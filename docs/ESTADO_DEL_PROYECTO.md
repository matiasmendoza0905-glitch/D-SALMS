# Estado del proyecto — D’Salms V12.0
**Fase 4 — Imagen Pública corregida** · 12-11-2026 · Último ZIP: **D-SALMS-V12-FASE4-IMAGEN-PUBLICA-CORREGIDA.zip**

| Página | Estado |
|---|---|
| Inicio | Terminada (sin «productos destacados» ni «lookbook»; ahora hay fotos en el banco para añadirlos) |
| Imagen Pública | **Corregida e ilustrada** |
| Ficha Técnica de Identidad de Marca | Terminada en contenido (Fase 3); **rediseño visual con el banco: Fase 5** |
| Otras 14 páginas | En construcción, con navegación funcional |

## Errores resueltos en esta fase
1. **Navegación que abría listados de directorio.** Causa confirmada: los enlaces apuntaban a carpetas (`../imagen-publica/`). Con servidor local se resolvía `index.html`, pero al abrir los archivos directamente (`file://`) el navegador mostraba el índice. Ahora todos los enlaces internos (menú, submenús, logo, footer, botones, tarjetas) apuntan explícitamente a `…/index.html`.
2. **Título de P2/P4 superpuesto a la tabla y la interpretación.** Causa: la cabecera de cada pregunta tenía `position: sticky`. Se eliminó; cada pregunta es ahora un bloque en flujo normal (cabecera → gráfico + tabla → lectura). No queda ningún `sticky` en el contenido, solo la barra de secciones.
3. **Animación de entrada.** Antes desplazaba los bloques 28 px; ahora solo hace aparecer (opacidad), sin cambiar su posición.

## Imágenes agregadas
Ver `docs/INVENTARIO_VISUAL_V12.md`.

## Pruebas ejecutadas
- Navegación en `file://`: 68 clics (menú, footer y logo desde 4 páginas), 0 listados.
- Enlaces: 0 enlaces internos a carpeta; recursos de las 17 páginas cargan desde subruta `/D-Salms-V12/`.
- Imagen Pública: 10 gráficos, imágenes cargadas, lightbox abre y cierra con Esc, sin `sticky` en el contenido, sin desbordamiento a 1440 y 390 px, 0 errores de consola.
## Pendientes
- Ficha Técnica: integrar las láminas del banco (Fase 5).
- Probar en GitHub Pages real y a 1024/820/360 px.
- Plan de Comunicación debe montar la misma FODA.
