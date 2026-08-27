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
pnpm install         # solo la primera vez en una máquina nueva
pnpm dev             # http://localhost:3000
pnpm build           # antes de desplegar, siempre
```

▲ **Aquí se usa pnpm, no npm.** No es preferencia de estilo: es lo que sostiene el
endurecimiento descrito abajo. `npm install` en este directorio genera un `package-lock.json`
que compite con `pnpm-lock.yaml` y se salta las tres protecciones. Si aparece un
`package-lock.json`, es un error: bórralo.

### Por qué pnpm — la cadena de suministro

Una landing de gobierno con 360 paquetes transitivos hereda la confianza de 360 mantenedores.
Los ataques recientes al registro de npm no comprometen el paquete que instalas, sino uno
enterrado seis niveles más abajo, y se ejecutan en el `postinstall`. Tres cosas lo frenan aquí:

| Protección | Dónde | Qué hace |
|---|---|---|
| Scripts de instalación bloqueados | por defecto en pnpm 10 | Ninguna dependencia ejecuta `postinstall` salvo que esté en `onlyBuiltDependencies` de `package.json`. Hoy la lista está **vacía**: nada se ejecuta. Es la vía por la que entra la mayoría del malware. |
| Cuarentena de siete días | `web/.npmrc` → `minimum-release-age=10080` | Una versión publicada hace menos de una semana no se instala. Las versiones comprometidas se suelen despublicar en horas; esto convierte una ventana de minutos en uno de siete días. |
| `node_modules` estricto | por defecto en pnpm | Un paquete solo puede importar lo que declaró. Sin dependencias fantasma, el radio de alcance de un paquete comprometido es menor. |

**Cuando `pnpm install` avise `Ignored build scripts: X`, la respuesta por defecto es no hacer
nada.** El proyecto compila y lintea con la lista vacía —está verificado—. Solo si algo falla de
verdad se aprueba, uno a uno y mirando qué hace ese script, con `pnpm approve-builds`.

**Para actualizar una dependencia con prisa justificada** (un parche de seguridad recién
publicado, por ejemplo) se salta la cuarentena a propósito y se deja constancia en el commit:

```bash
pnpm update <paquete> --minimum-release-age=0
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
pnpm verificar       # lint + build
pnpm build && pnpm start &     # el arnés necesita el sitio servido
pnpm auditar         # ocho tamaños, de 375 a 1280
```

`auditar` revisa desbordamiento horizontal, texto cortado, objetivos de toque y —lo más
importante— que la ventana de composición no se ensanche. Pásalo después de cada tanda de
cambios de maquetación, y sobre todo cuando entren componentes nuevos. **Sale con código
distinto de cero si algo falla**, así que se puede encadenar.

Usa el Chrome del sistema. Si está en otra ruta: `CHROME=/ruta/al/chrome pnpm auditar`.

▲▲ **Lo que hay que vigilar no es `window.scrollX`, es que `window.innerWidth` coincida con el
ancho de la pantalla.** Ver la trampa del carrusel más abajo. El arnés ya comprueba las dos
cosas —antes solo miraba `scrollX`, que es justo lo que no detecta el fallo—, y además avisa
si algo `position: fixed` acaba fuera de la pantalla, que es cómo se manifestó.

▲ **Estado al 2026-08-27: `auditar` falla en los tres tamaños de móvil.** La ventana de
composición mide 457 px en pantallas de 375, 390 y 430. Está sin arreglar; ver «Lo siguiente».

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
web/                          Next.js 16 · React 19 · TypeScript · Tailwind v4 · pnpm
  .npmrc                      Cuarentena de siete días. Ver «Por qué pnpm»
  pnpm-lock.yaml              El lockfile. Se commitea siempre
  src/lib/contenido.ts        TODO el texto. Se edita esto y nada más
  src/components/             Una sección por fichero
  src/app/globals.css         Tokens de color, animaciones de entrada
  public/img/                 Fotos (Wikimedia, ver Regla 4)
  public/documentos/          Bases de la convocatoria en PDF y los dos formatos de carta
  scripts/
    auditar-responsive.mjs    Arnés de ocho tamaños → `pnpm auditar`
    generar-mapa-ecuador.mjs  Regenera la silueta desde datos geográficos → `pnpm mapa`
docs/
  BRIEF.md                    El encargo entendido y las preguntas abiertas. Se lee segundo
  transcripciones/            Audios de Estefy del 2026-08-26 y su transcripción
  referencias/
    paleta.md                 Colores del SEAL, medidos sobre capturas con Pillow
    creditos-fotos.md         Licencias de las fotos y qué obliga cada una
    mapa-ecuador.md           Cómo se generó la silueta + la trampa del carrusel
    emprender-ficha-oficial.md   Resumen de la ficha del MPCEI y del SEAL
    capturas/                 El SEAL en producción, 2026-08-26
    buscar-fotos-commons.py   Busca en Wikimedia filtrando por licencia
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

---

## Añadido el 2026-08-27 — el gestor pasa a pnpm, y lo que eso destapó

El cambio de npm a pnpm está descrito arriba, en «Por qué pnpm». Al hacerlo salieron a la luz
tres cosas que npm tapaba, porque su `node_modules` plano deja que un script importe lo que
nunca declaró. **Dos están arregladas y una no.**

**✓ `framer-motion` era dependencia y no se usaba.** La Trampa 4 decía «`framer-motion` ya no es
dependencia» pero seguía en `package.json`, sin un solo import en `src/`. Eliminada.

**✓ Los dos arneses no podían arrancar.** `auditar-responsive.mjs` importaba `puppeteer-core` y
`generar-mapa-ecuador.mjs` importaba `topojson-client` y `world-atlas`; **ninguno de los tres
estaba declarado en ningún sitio, ni siquiera en el lockfile de npm**. El comando que este
fichero presentaba como la verificación obligatoria llevaba tiempo fallando al importar. Los dos
scripts se mudaron a `web/scripts/` —donde alcanzan las dependencias del proyecto— y las tres
librerías están ahora en `devDependencies`. El arnés además ya no tiene la ruta de Chrome
clavada a `/usr/bin/google-chrome`.

**✗ SIN ARREGLAR — el fallo del ICB volvió, y en móvil.** Con el arnés ya funcionando y con la
comprobación de `innerWidth` que este fichero pedía desde el principio, la primera pasada da
esto:

```
✗ iphone-se   375x667   scrollX=0  innerWidth=457▲
✗ iphone-15   390x844   scrollX=0  innerWidth=457▲
✗ iphone-max  430x932   scrollX=0  innerWidth=458▲
✓ los cinco tamaños de tablet y portátil
```

`scrollX=0` en los tres: por eso el arnés viejo los daba por buenos. La ventana de composición
mide 457 px en una pantalla de 375. Es la Trampa 1 otra vez.

**Lo que se sabe:** el `<footer class="bg-morado px-6 py-16">` tiene la caja en 359 px y el
contenido en 449 px, y el elemento que sobresale es uno de los dos `<a>` de correo del
`div.-my-2.flex.flex-wrap.justify-center.gap-x-6`. Los dos correos suman 449 px con el hueco y
**no están envolviendo pese al `flex-wrap`**.

**Lo que NO es:** se probó `break-all` en los dos `<a>`. Quita el aviso de desbordamiento del
enlace pero **`innerWidth` sigue en 457**, así que el correo largo es síntoma y no causa. No se
dejó ese cambio. Quien siga: la pregunta es por qué ese contenedor flex no envuelve, y la
sospecha es el `items-center` del padre en columna, que le da ancho de contenido máximo en vez
de estirarlo. Reprodúcelo con `pnpm auditar` antes de tocar nada.

**✗ SIN ARREGLAR — `pnpm lint` falla.** Un error preexistente en `Reveal.tsx:28`
(`react-hooks/set-state-in-effect`) por los `setState` síncronos dentro del `useEffect`. No se
tocó **a propósito**: ese componente es exactamente el de la Trampa 4, y reescribirlo a ciegas
es la vía más corta a dejar la página en blanco otra vez. Necesita a alguien que verifique
después que el texto sigue siendo legible sin JS. Mientras tanto `pnpm verificar` sale en rojo,
y sale en rojo por un motivo cierto.
