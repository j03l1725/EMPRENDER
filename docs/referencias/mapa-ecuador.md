# La silueta del Ecuador del hero

**No está dibujada a mano ni copiada de una imagen.** Se generó con
`generar-mapa-ecuador.mjs`, que está en esta carpeta.

## Cómo se hizo

1. **Datos:** `world-atlas`, resolución 1:50 m —Natural Earth, dominio público—. Es un
   TopoJSON de todos los países; se extrae la geometría de Ecuador.
2. **Se descarta Galápagos.** El archipiélago está a unos 1.000 km de la costa; si se incluye,
   el encuadre se estira y la parte continental queda diminuta. Se toma el polígono de mayor
   área, que es el continental —20,03 frente a 0,37 del siguiente—.
3. **Simplificación Douglas-Peucker**, epsilon 0,02 grados. Baja de miles de puntos a 113,
   lo que da un trazado de 1.346 caracteres: suficientemente ligero para ir en línea en el
   componente, y suficientemente fiel para que se reconozca el país.
4. **Proyección equirrectangular.** Ecuador está sobre la línea ecuatorial, así que la
   distorsión de una equirrectangular es despreciable. Se normaliza a un `viewBox` de ancho
   100 y alto 112,82.

## Los marcadores

Son las **capitales** de las siete provincias focalizadas, proyectadas con exactamente la
misma transformación que el contorno. Por eso caen donde deben:

| Provincia | Capital | lon, lat |
|---|---|---|
| Esmeraldas | Esmeraldas | −79,6517 · 0,9682 |
| Manabí | Portoviejo | −80,4545 · −1,0546 |
| Santo Domingo de los Tsáchilas | Santo Domingo | −79,1719 · −0,2542 |
| Carchi | Tulcán | −77,7178 · 0,8117 |
| Imbabura | Ibarra | −78,1223 · 0,3517 |
| Sucumbíos | Nueva Loja | −76,8828 · 0,0847 |
| Napo | Tena | −77,8134 · −0,9938 |

▸ **Si hay que regenerarlo** —otra simplificación, otro encuadre, añadir provincias—:

```bash
npm install world-atlas topojson-client
node generar-mapa-ecuador.mjs
```

Imprime tres versiones (epsilon 0,02 / 0,035 / 0,05) y las coordenadas de los marcadores.
El componente que lo consume es `web/src/components/MapaEcuador.tsx`.

▲ El script deja los valores en la salida estándar; hay que pegarlos en el componente. No se
automatizó porque se ejecuta una vez cada mucho tiempo y automatizarlo costaría más de lo que
ahorra.

---

# Nota aparte: el carrusel y el ancho de la ventana en móvil

Vale la pena dejarlo escrito porque el síntoma no apunta a la causa.

**Síntoma:** en cualquier teléfono, el botón de menú y el de revisión no aparecían. La página
no se desplazaba de lado —`window.scrollX` daba 0— y el texto se veía del tamaño correcto, así
que no parecía un problema de desbordamiento.

**Causa:** el carrusel de «Cursos abiertos» tiene 1.008 px de contenido dentro de una caja con
`overflow-x: auto`. En emulación móvil, Chrome ensancha la **ventana de composición** hasta
abarcar ese contenido: `window.innerWidth` daba **704** en una pantalla de 375. Todo lo que es
`position: fixed` se coloca contra ese ancho, así que el botón de menú, anclado a la derecha,
caía en x=648 — fuera de la pantalla.

**Lo que no lo arregla**, y se probó: `overflow-x: hidden` o `clip` en el propio carrusel, en su
sección, en `body` o en `html`; `max-width: 100vw` en el carrusel.

**Lo que sí:** `contain: layout` en el carrusel. Le dice al navegador que el contenido de ese
elemento no afecta al diseño de fuera, y la ventana vuelve a 375. Se probaron todos los valores;
`layout` es el mínimo suficiente y, a diferencia de `paint` o `content`, no recorta las sombras
de las tarjetas.

▸ **Si algún día se añade otro elemento con desplazamiento horizontal**, lleva `contain: layout`
o reaparece el mismo fallo. La prueba está en `docs/referencias/auditar-responsive.mjs`: lo que
hay que vigilar no es `scrollX`, es que `window.innerWidth` coincida con el ancho de la pantalla.
