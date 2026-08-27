# EMPRENDER — contrato del repositorio

Landing page del programa **EMPRENDER** del Ministerio de Producción, Comercio Exterior e
Inversiones del Ecuador (MPCEI). Capital semilla de USD 10.000 a 80.000 para unidades
productivas agroindustriales de siete provincias.

**En línea, sin indexar:** <https://emprender-rho.vercel.app>

---

## Si acabas de abrir este repositorio, lee esto y nada más

1. **Este fichero, entero.** Son unas 200 líneas y dice cómo se trabaja aquí.
2. **`docs/BRIEF.md`** — qué encargaron, qué está confirmado, qué es invención nuestra y las
   diez preguntas abiertas. 140 líneas.

Con eso basta para empezar. El resto de `docs/` se consulta cuando haga falta, no se lee de
entrada. `git log` cuenta la historia si necesitas el porqué de algo.

▲ **Quien trabaja aquí es Joel Morales, contratista externo.** La contraparte que consigue
textos y decisiones es **Estefy Pérez**, que trabaja con él. Los textos institucionales los da
ella; nosotros no los inventamos (ver Regla 1).

---

## Las cuatro reglas duras

### Regla 1 — Ningún texto institucional se inventa, y lo escrito por nosotros va marcado

Todo el contenido vive en **`web/src/lib/contenido.ts`**, en un solo fichero, y cada bloque
declara su procedencia en un comentario:

| Marca | Significa |
|---|---|
| `oficial` | Verificado en las bases de la convocatoria (el PDF de 41 páginas que está en el repo), en la ficha del MPCEI o en el SEAL en producción. **No se cambia sin cambiar la fuente.** |
| `borrador` | Lo escribimos nosotros para que la página no estuviera vacía. **Es lo que Estefy tiene que corregir.** |

El componente `<Borrador>` envuelve el texto de borrador. El botón **«Revisión»** de la esquina
inferior derecha —o `Ctrl+Shift+R`— lo resalta en amarillo. Apagado, la página se enseña limpia;
encendido, se ve exactamente qué falta confirmar.

**Por qué importa más que el estilo:** es una página de gobierno. Un dato plausible pero falso
presentado como oficial es el peor resultado posible del proyecto. Si añades contenido y no
tienes fuente, va envuelto en `<Borrador>`; si no, no va.

### Regla 2 — El SEAL no se toca

`capacitacion.agricultura.gob.ec` es el **Moodle del Ministerio de Agricultura** (MAG), tema
MB2NL. Es de otra institución. Se pidió acceso y no lo han dado, y **aunque lo den, no hay
permiso para modificarlo**. Lo acordado con la jefa de Estefy es que dentro del SEAL haya un
botón que lleve a esta plataforma.

Se **replica su lenguaje visual** —colores, molde de tarjeta de curso— y se **enlaza** a él.
No se edita su código ni se copian sus imágenes.

▸ **Plan B ya aprobado:** si no dan acceso, todo se sirve desde el servidor propio de INSIDE,
la empresa de Joel. La landing no depende del SEAL para existir.

### Regla 3 — La página lleva `noindex` a propósito. No lo quites

Está en `web/src/app/layout.tsx` (`robots: { index: false … }`) y en `web/src/app/robots.ts`.
Son dos vías porque una sola falla.

**Se quitan las dos el día que el Ministerio apruebe el contenido, no antes.** Mientras haya
texto de borrador, que Google lo recoja y lo muestre como información oficial sería exactamente
el fallo que la Regla 1 intenta evitar.

### Regla 4 — Las fotos obligan a atribuir

Las cuatro fotos son de Wikimedia Commons con licencia de uso comercial, pero **dos son CC BY-SA
y todas exigen atribución**. Por eso los créditos van visibles en el pie de la página, no
escondidos en un fichero: si alguien borra ese bloque, la página deja de cumplir la licencia.

Detalle y salida limpia en `docs/referencias/creditos-fotos.md`. La salida limpia es material
propio del Ministerio: en cuanto lo entreguen, se cambian las cuatro, se borra `CREDITOS_FOTOS`
de `contenido.ts` y el bloque del pie desaparece solo.

---

## Cómo se trabaja

```bash
cd web
npm install          # solo la primera vez en una máquina nueva
npm run dev          # http://localhost:3000
npm run build        # antes de desplegar, siempre
```

**Para cambiar textos, montos, niveles, cursos o enlaces: se edita `web/src/lib/contenido.ts`
y nada más.** Está pensado para abrirlo en una reunión con Estefy delante y ver el resultado
recargar solo. No hace falta tocar ningún componente.

### Desplegar

```bash
cd web && vercel --prod
```

Proyecto `lepr9190-9627s-projects/emprender`. **El root directory es `web/`**, no la raíz del
repositorio: si Vercel apunta a la raíz, el build falla.

▲ En una máquina nueva hace falta `vercel login` y `vercel link --yes --project emprender`
desde `web/`. **No hay ningún token guardado en el repositorio** y no debe haberlo.

### Verificar antes de dar algo por bueno

```bash
node docs/referencias/auditar-responsive.mjs      # ocho tamaños, de 375 a 1280
```

Revisa desbordamiento horizontal, texto cortado y objetivos de toque. Pásalo después de cada
tanda de cambios de maquetación, y sobre todo cuando entren componentes nuevos.

▲▲ **Lo que hay que vigilar no es `window.scrollX`, es que `window.innerWidth` coincida con el
ancho de la pantalla.** Ver la trampa del carrusel más abajo.

---

## Trampas que ya nos costaron tiempo

Están aquí porque el síntoma no apunta a la causa en ninguna de las tres.

**1 · Un carrusel horizontal deja los elementos `fixed` fuera de pantalla en móvil.**
El contenido del carrusel de cursos ensanchaba la ventana de composición a 704 px en una
pantalla de 375, y todo lo `position: fixed` se colocaba contra ese ancho falso: el botón de
menú caía en x=648, invisible. `window.scrollX` daba 0, así que no se detectaba mirando el
scroll. **Se corrige con `contain: layout` en el carrusel**; ni `overflow: hidden`/`clip` ni
`max-width` lo arreglan. Si añades otro elemento con desplazamiento horizontal, lleva
`contain: layout`. Detalle en `docs/referencias/mapa-ecuador.md`.

**2 · Next 16 rechaza cualquier `quality` que no esté declarada.** Si usas `quality={N}` en un
`<Image>`, N tiene que estar en `images.qualities` de `next.config.ts` o la imagen devuelve
error. Ahora están declaradas 62 y 75.

**3 · El servidor de desarrollo cachea las imágenes optimizadas.** Si cambias un fichero de
`public/img/` y sigues viendo el viejo, no es tu edición: hay que parar el servidor,
`rm -rf .next` y volver a arrancar. Borrar solo `.next/cache/images` con el servidor corriendo
no basta.

**4 · Las animaciones de entrada están en CSS, no en JavaScript.** Con `framer-motion` el texto
arranca en `opacity: 0` y una caída del JS dejaba la página en blanco —pasó, está en las
capturas—. Ahora el HTML trae el texto y el CSS lo anima; `Reveal` empieza visible y solo se
esconde una vez que el JS confirmó que montó. **No reintroduzcas animaciones de entrada que
dependan de JS para que el texto sea legible.** `framer-motion` ya no es dependencia.

---

## Dónde está cada cosa

```
web/                          Next.js 16 · React 19 · TypeScript · Tailwind v4
  src/lib/contenido.ts        TODO el texto. Se edita esto y nada más
  src/components/             Una sección por fichero
  src/app/globals.css         Tokens de color, animaciones de entrada
  public/img/                 Fotos (Wikimedia, ver Regla 4)
  public/documentos/          Bases de la convocatoria en PDF y los dos formatos de carta
docs/
  BRIEF.md                    El encargo entendido y las preguntas abiertas. Se lee segundo
  transcripciones/            Audios de Estefy del 2026-08-26 y su transcripción
  referencias/
    paleta.md                 Colores del SEAL, medidos sobre capturas con Pillow
    creditos-fotos.md         Licencias de las fotos y qué obliga cada una
    mapa-ecuador.md           Cómo se generó la silueta + la trampa del carrusel
    emprender-ficha-oficial.md   Resumen de la ficha del MPCEI y del SEAL
    capturas/                 El SEAL en producción, 2026-08-26
    auditar-responsive.mjs    Arnés de ocho tamaños
    generar-mapa-ecuador.mjs  Regenera la silueta desde datos geográficos
    buscar-fotos-commons.py   Busca en Wikimedia filtrando por licencia
```

---

## Convenciones de escritura

- **Español.** Público rural ecuatoriano; español neutral, sin modismos.
- **Cero emojis.** Iconos tipográficos: `▸ · — → ⇒ ✓ ✗ ▲ ★ ● ◆`
- **La raya de inciso va pegada al inciso**, norma española, no inglesa:
  `el capital semilla —que se entrega después— no al postular`. Espacio antes de la de apertura
  y después de la de cierre; nunca por dentro.
- **Fechas absolutas.** Nunca «el mes pasado»; siempre `2026-08-26`.
- **Cifras:** si la fuente da un número, se cita. Si no lo da, no se inventa.
- **Nombres de archivo:** minúsculas con guiones.

---

## Estado al 2026-08-26

Todo lo de este repositorio se construyó en un día. La landing está en línea con `noindex`,
lleva **20 fragmentos de borrador** marcados, y las bases completas de la convocatoria ya están
volcadas.

**Lo siguiente:** Estefy revisa y corrige —Joel iba a grabar esa conversación, con
consentimiento, porque la anterior fue por llamada y no se grabó, que es el motivo por el que
existe `docs/BRIEF.md`—. Cuando llegue ese audio se transcribe y se archiva en
`docs/transcripciones/` junto a los otros dos.

Joel también va a ir pasando componentes de **21st.dev**; el stack está elegido para que entren
sin traducción (React + Tailwind).
