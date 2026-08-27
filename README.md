# EMPRENDER

Landing page del programa **EMPRENDER** — «Fortalecimiento de las capacidades de las Unidades
Productivas Rurales en el Territorio Focalizado», del Ministerio de Producción, Comercio
Exterior e Inversiones del Ecuador.

## Correr en local

```bash
cd web && npm run dev      # http://localhost:3000
```

## Para editar el contenido con Estefy

**Todo el texto vive en un solo fichero: `web/src/lib/contenido.ts`.** Está pensado para
abrirlo en la reunión, cambiar las cadenas y ver el resultado recargar solo. No hace falta
tocar ningún componente para cambiar textos, montos, niveles, cursos o enlaces.

Cada bloque de ese fichero está marcado con su procedencia:

| Marca | Qué significa |
|---|---|
| `oficial` | Verificado en la ficha del MPCEI o en el SEAL en producción. No se cambia sin cambiar la fuente |
| `borrador` | Lo escribimos nosotros para que la página no estuviera vacía. **Es lo que hay que corregir** |

▸ **El botón «Revisión»**, abajo a la derecha (o `Ctrl+Shift+R`), resalta en amarillo todos los
borradores. Apagado, la página se ve limpia y se puede enseñar. Encendido, se ve exactamente
qué falta confirmar — hoy son 25 fragmentos.

## Qué hay ahora

Las cinco secciones que pidió Estefy en su audio, en su orden: hero · qué es el programa ·
convocatoria · cursos por niveles · recursos. Añadimos dos que la ficha oficial respalda y sin
las cuales la página quedaba coja: **a quién va dirigido** y el carrusel de **cursos abiertos**
con el molde de tarjeta del SEAL que pidió en el segundo audio.

## Estructura

```
web/                          Next.js 16 · React 19 · TypeScript · Tailwind v4
  src/lib/contenido.ts        TODO el texto. Se edita esto y nada más
  src/components/             Una sección por fichero
  public/img/                 Fotos provisionales, recortadas de las capturas del SEAL
docs/
  BRIEF.md                    El encargo entendido y las preguntas abiertas
  transcripciones/            Audios de Estefy del 2026-08-26 + su transcripción
  referencias/
    paleta.md                 Colores medidos sobre las capturas, no estimados
    capturas/                 El SEAL en producción, 2026-08-26
    marca/                    Logos que mandó Estefy
```

## Decisiones que conviene conocer

**Las animaciones de entrada están en CSS, no en JavaScript.** Con `framer-motion` el texto
arranca en `opacity: 0` y si el JS falla o tarda, la página queda en blanco — pasó en la
primera versión. Ahora el HTML trae el texto y el CSS lo anima. `framer-motion` ya no se usa.

**Las fotos son provisionales.** Están recortadas de las capturas del SEAL del 2026-08-26 para
que la maqueta no se vea vacía. Hay que reemplazarlas por material propio antes de publicar.

**El SEAL no se toca.** Es un Moodle del MAG y no hay permiso para modificarlo. Se replica su
lenguaje visual; no se edita su código.

**Los colores salen de `docs/referencias/paleta.md`**, que salen de contar píxeles sobre las
capturas. Si hace falta uno nuevo, se mide y se anota ahí.

## Despliegue

Todavía no. Va a Vercel por CLI con el token de **otra cuenta**, no la de Joel, y ese token
aún no llega.
