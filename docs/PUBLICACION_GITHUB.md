# Publicar en GitHub Pages
1. Sube el contenido de la carpeta (no la carpeta contenedora) a la raíz del repositorio. Incluye `.nojekyll`.
2. Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
3. La web queda en `https://USUARIO.github.io/REPOSITORIO/`. Todas las rutas son relativas.
4. Los módulos JS (`type="module"`) requieren servidor: no funcionan abriendo el HTML con doble clic (`file://`). Para probar local: `python3 -m http.server` en la carpeta.
