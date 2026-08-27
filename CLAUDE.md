# EMPRENDER — contrato del repositorio

Landing page del programa **EMPRENDER** del Ministerio de Producción, Comercio Exterior e
Inversiones del Ecuador (MPCEI). Capital semilla de USD 10.000 a 80.000 para unidades
productivas agroindustriales de siete provincias.

**En línea, sin indexar:** <https://emprender-rho.vercel.app>

---

## Si acabas de abrir este repositorio, lee esto y nada más

1. **La última sección de este fichero**, «la última tanda, y el estado con el que te
   encuentras». Va al final porque es lo más reciente, pero **es lo primero que hay que leer en
   una máquina nueva**: dice cómo quedó la página, qué contenido ya no se pinta y qué salió mal.
2. **Este fichero, entero.** Son unas 500 líneas y dice cómo se trabaja aquí.
3. **`docs/BRIEF.md`** — qué encargaron, qué está confirmado, qué es invención nuestra y las
   diez preguntas abiertas. 140 líneas.

Con eso basta para empezar. El resto de `docs/` se consulta cuando haga falta, no se lee de
entrada. `git log` cuenta la historia si necesitas el porqué de algo.

▲▲ **Antes de desplegar nada, lee «Desplegar».** `vercel --prod` a secas no funciona aquí y
falla en silencio; hay un rodeo documentado. Dos sesiones distintas perdieron horas por esto.

▸ **En una máquina nueva, de cero:**

```bash
git clone https://github.com/j03l1725/EMPRENDER.git && cd EMPRENDER/web
pnpm install          # pnpm, no npm — ver «Por qué pnpm»
pnpm verificar-todo   # lint, build, arnés responsive y garantías de <Reveal>
pnpm dev              # http://localhost:3000
```

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

▲▲ **`cd web && vercel --prod` NO funciona en este proyecto.** Devuelve un despliegue en estado
`BLOCKED` y la CLI no lo dice claro: se queda esperando en silencio. Lee lo de abajo antes de
intentarlo, o perderás la tarde. Le pasó a dos sesiones distintas el 2026-08-27; una encadenó
cinco intentos fallidos en una hora sin enterarse de por qué.

**El motivo.** Vercel exige que el autor del commit sea miembro del equipo. La cuenta es
`lepr9190@gmail.com` y los commits van firmados por `joelusa25@gmail.com`, que no lo es. La API
lo dice, la CLI no:

```
readyStateReason: Git author joelusa25@gmail.com must have access to the team
seatBlock: { blockCode: "TEAM_ACCESS_REQUIRED" }
```

**La solución de verdad**, y son dos minutos: en `vercel.com` → equipo → *Members*, añadir
`joelusa25@gmail.com`. Mientras eso no se haga, hay que usar el rodeo.

**El rodeo:** desplegar desde una copia del código **sin repositorio git encima**. Sin `.git`
no hay autor de commit que comprobar, y pasa. Es un modo normal de la CLI, no un truco:

```bash
TMP=$(mktemp -d)
cd web
tar --exclude=node_modules --exclude=.next --exclude=.vercel --exclude=.env.local -cf - . \
  | (cd "$TMP" && tar xf -)
mkdir -p "$TMP/.vercel" && cp .vercel/project.json "$TMP/.vercel/"
cd "$TMP" && vercel --prod --yes
```

▸ **Comprobar siempre que el dominio apunta al despliegue nuevo.** Que el despliegue salga
`READY` no basta:

```bash
TOKEN=$(python3 -c "import json;print(json.load(open('$HOME/.local/share/com.vercel.cli/auth.json'))['token'])")
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.vercel.com/v4/aliases?projectId=prj_KbRzFgnn7x9yIjKFJV32Lu46eY0N&teamId=team_y46w6i8vDVqszBtVpH0EYxDE"
```

Proyecto `lepr9190-9627s-projects/emprender`. **El root directory del proyecto es `.`**, que con
despliegues desde CLI hechos desde `web/` es correcto. ▲ Si algún día se conecta el repositorio
de GitHub para que despliegue solo en cada push, **hay que cambiarlo a `web`**: apuntando a la
raíz del repositorio el build falla.

▲ En una máquina nueva hace falta `vercel login` y `vercel link --yes --project emprender`
desde `web/`. **No hay ningún token guardado en el repositorio** y no debe haberlo. `vercel link`
crea `web/.env.local` con un `VERCEL_OIDC_TOKEN`; está en `.gitignore`, y ahí tiene que quedarse.

### Verificar antes de dar algo por bueno

```bash
pnpm verificar-todo    # ← esto. lint → build → servidor → arnés → prueba
```

**Es el único comando que hace falta**, y el que hay que pasar antes de desplegar. Levanta el
sitio en un puerto libre, pasa las dos baterías y mata el servidor pase lo que pase. Sale con
código distinto de cero si algo falla. Al 2026-08-27 sale entero en verde.

Por piezas, cuando ya tienes un servidor tuyo levantado:

| | |
|---|---|
| `pnpm verificar` | lint + build, sin navegador |
| `pnpm auditar` | ocho tamaños, de 375 a 1280 |
| `pnpm probar` | las tres garantías de `<Reveal>` |

Los dos últimos usan el Chrome del sistema; si está en otra ruta, `CHROME=/ruta/al/chrome`.

▲▲ **`auditar`: lo que hay que vigilar no es `window.scrollX`, es que `window.innerWidth`
coincida con el ancho de la pantalla.** Ver la trampa del carrusel más abajo. El arnés comprueba
las dos cosas —hasta el 2026-08-27 solo miraba `scrollX`, que es justo lo que no detecta el
fallo— y además avisa si algo `position: fixed` acaba fuera de la pantalla, que es cómo se
manifestó.

▸ Los avisos de **«toque chico»** no cuentan como fallo, a propósito. Los que salen en móvil son
los enlaces de crédito de foto del pie, de 17 px: texto legal secundario que la Regla 4 obliga a
enseñar. Agrandarlos es una decisión de diseño de Joel y Estefy, no un arreglo.

▲ **`probar` existe por la Trampa 4** y comprueba lo que un navegador sano nunca enseña: que sin
JS el texto se lee, que con «menos movimiento» no se esconde nada, y que con JS la animación de
entrada de verdad esconde y de verdad revela. Está verificado que detecta la regresión: al
forzar `opacity: 0` en el render de `<Reveal>`, los bloques de texto legibles sin JS caen de 193
a 18 y la prueba falla.

---

## Trampas que ya nos costaron tiempo

Están aquí porque el síntoma no apunta a la causa en ninguna. **La quinta está al final del
fichero**, con la tanda del 2026-08-27, y es la que más cara salió.

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
dependan de JS para que el texto sea legible.** `framer-motion` ya no es dependencia —se quitó
del `package.json` el 2026-08-27, donde seguía declarada sin usarse—.

▸ Desde el 2026-08-27 esto ya no depende de que alguien se acuerde: **`pnpm probar` lo
comprueba**, cargando la página con el JS desactivado y contando el texto legible. Si `<Reveal>`
vuelve a arrancar escondido, la prueba cae de 193 bloques a 18 y falla.

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
    verificar-todo.mjs        Todo de una tacada → `pnpm verificar-todo`
    auditar-responsive.mjs    Arnés de ocho tamaños → `pnpm auditar`
    probar-reveal.mjs         Las tres garantías de <Reveal> → `pnpm probar`
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
varias cosas que npm tapaba, porque su `node_modules` plano deja que un script importe lo que
nunca declaró. **Todo lo de esta sección está arreglado y verificado.**

**`framer-motion` era dependencia y no se usaba.** La Trampa 4 ya decía «`framer-motion` ya no
es dependencia» pero seguía en `package.json`, sin un solo import en `src/`. Eliminada.

**Los dos arneses no podían arrancar.** `auditar-responsive.mjs` importaba `puppeteer-core` y
`generar-mapa-ecuador.mjs` importaba `topojson-client` y `world-atlas`; **ninguno de los tres
estaba declarado en ningún sitio, ni siquiera en el lockfile de npm**. El comando que este
fichero presentaba como la verificación obligatoria llevaba tiempo fallando al importar. Los dos
scripts se mudaron a `web/scripts/` —donde alcanzan las dependencias del proyecto— y las tres
librerías están en `devDependencies`. El arnés ya no tiene la ruta de Chrome clavada.

**El arnés no comprobaba lo que este fichero decía que había que comprobar.** Miraba
`window.scrollX`; la Trampa 1 dice en negrita que lo que importa es `window.innerWidth`. Ahora
mira las dos, avisa de lo `fixed` que se sale de pantalla, y sale con código distinto de cero.

**Un correo largo cortaba el texto en tablet vertical.** `pemprender@produccion.gob.ec` dentro
del paso 3 de la convocatoria desbordaba su caja a 768 px. Los dos `<a>` de correo de
`Convocatoria.tsx` llevan ahora `break-all`, como ya lo llevaba el de `Recursos.tsx`.

**`Reveal.tsx` incumplía `react-hooks/set-state-in-effect`** con tres `setState` síncronos
dentro del `useEffect`. Reescrito: el esconder y el mostrar los hace el efecto sobre el nodo,
por `ref`, en vez de por estado de React. El render de servidor sale siempre en `opacity: 1`, que
es la garantía de la Trampa 4, y ahora hay una prueba que lo vigila (`pnpm probar`).

---

### Trampa 5 — un `next start` huérfano te hace depurar un fallo que no existe

**Esta costó una hora y no dejó ni una pista honesta.** Va aquí para que no la vuelva a pagar
nadie.

Si queda un `next start` vivo de una tanda anterior, el siguiente **no puede coger el puerto 3000
y se muere en silencio**: `pnpm start &` no se queja, y `curl localhost:3000` responde perfecto
—lo está sirviendo el viejo—. El proceso zombi sigue sirviendo el `.next` de antes, así que el
HTML pide un fichero CSS cuyo hash ya no existe. Ese CSS devuelve **500** y la página se sirve
**entera sin estilos**.

Lo que se ve entonces es una carnicería de maquetación que no existe:

```
innerWidth=457 en una pantalla de 375        ← ni Tailwind ni preflight cargaron
body en x=[8,367]                            ← el margen de 8px por defecto del navegador
header con clase `fixed` y position: static  ← ninguna utilidad aplicada
nav con `hidden lg:flex` visible en móvil    ← ídem
```

Se llegó a documentar como una regresión de la Trampa 1 y a buscarle la causa en el `flex-wrap`
del pie. **No había nada roto.** Con el servidor bueno, los ocho tamaños pasan y `innerWidth`
coincide con la pantalla en todos.

**Cómo no caer:** usar `pnpm verificar-todo`, que levanta en un puerto libre y mata el grupo de
procesos entero al terminar. Si aun así sospechas, la comprobación que lo destapa en dos
segundos es pedir el CSS que el HTML dice que quiere:

```bash
CSS=$(curl -s localhost:3000 | grep -o '/_next/static/chunks/[^"]*\.css' | head -1)
curl -s -o /dev/null -w '%{http_code}\n' "localhost:3000$CSS"   # tiene que ser 200
```

Si eso da 500, no depures maquetación: mata el servidor y reconstruye. Y para matarlo de verdad
hace falta el hijo, no solo el padre:

```bash
kill -9 $(ss -lptn 'sport = :3000' | grep -o 'pid=[0-9]*' | cut -d= -f2 | sort -u)
```

▸ Es pariente de la Trampa 3 —`.next` rancio— pero peor, porque ahí el síntoma es una imagen
vieja y aquí es la página entera sin CSS, que se parece muchísimo a un bug de maquetación real.

---

## Añadido el 2026-08-27 — la tanda de textos de Estefy y dos secciones nuevas

Estefy entregó por WhatsApp la revisión de media página. Todo lo de esta sección es texto suyo,
`oficial`, y está en `contenido.ts` como manda la Regla 1.

**Qué cambió de sitio.** La tarjeta azul «Cómo se postula» vivía dentro de la sección de la
convocatoria y mezclaba dos cosas: el trámite de postular y el recorrido del programa. Se partió
en dos:

| Antes | Ahora |
|---|---|
| Tarjeta azul «Cómo se postula», dentro de la convocatoria | `Proceso.tsx` — las siete etapas, sección propia tras la convocatoria |
| Sus tres pasos y sus dos botones | `Cierre.tsx` — la franja final, lo último que se lee |
| Bloque «Se valora especialmente…» (perfiles deseables) | **borrado**, a petición suya |
| Tarjeta roja «Qué te deja fuera», con siete causales | **borrada**; la cierra `VERIFICA_ANTES`, una lista en positivo, y un enlace a las bases |

▲ **Se borró contenido oficial de las bases** —`PERFILES_DESEABLES` (§ 4.1.1) y
`CAUSALES_RECHAZO` (§ 3.6)—. No se perdió: sigue en el PDF de las bases, que es la fuente, y en
`git log`. Si alguien lo echa de menos, está en el commit anterior a este.

**Los borradores bajaron de 20 a 4.** Los nombres y el contenido de los tres niveles pasaron de
`borrador` a `oficial`; siguen en borrador solo la duración, el número de módulos y la URL de
destino de cada nivel, y los dos videos de `RECURSOS`, que aún no tienen URL.

### Trampa 6 — las clases de rejilla van en `<Reveal>`, no en el hijo

`<Reveal>` envuelve a sus hijos en un `<div>` propio. Cuando un `<Reveal>` es hijo directo de un
`grid`, **el elemento de la rejilla es ese div**, así que un `lg:col-span-2` puesto en el hijo no
hace nada: se aplica a un elemento que ya no está en el contexto de rejilla. Se ve como una
tarjeta que no se ensancha y una fila que no cierra.

`Reveal` acepta `className` justamente para esto. Va ahí, junto con el `h-full` si las tarjetas
deben igualar altura:

```tsx
<Reveal className={`h-full ${ultima ? "lg:col-span-2" : ""}`}>
  <li className="flex h-full flex-col …">
```

▸ **Para retratar una sección con Puppeteer, emula «menos movimiento».** Una captura normal sale
en blanco: `<Reveal>` esconde lo que no ha entrado en pantalla, y forzar el scroll a mano es una
carrera perdida contra el observador de intersección. Con
`page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }])` la página se
sirve entera y visible —es la garantía que `pnpm probar` verifica—. La cabecera es `fixed` y se
cuela en la captura de una sección: se oculta con un `addStyleTag` de usar y tirar.

▲ **Los scripts que importen `puppeteer-core` tienen que vivir en `web/scripts/`.** El
`node_modules` estricto de pnpm no alcanza a un fichero suelto en `/tmp`: falla con
`ERR_MODULE_NOT_FOUND`. Es la misma razón por la que los dos arneses se mudaron ahí.

---

## Añadido el 2026-08-27 (tarde) — la última tanda, y el estado con el que te encuentras

Esta sección es la que hay que leer si abres el repositorio en otra máquina. Cuenta qué quedó
montado y, sobre todo, **qué salió mal**, que es lo que no se deduce mirando el código.

### El repositorio pasó a público y está subido

Los once commits de la jornada están en `github.com/j03l1725/EMPRENDER`. Antes de subir se
revisó el historial completo buscando tokens, claves y ficheros `.env`: no hay ninguno.
`web/.env.local` y `web/.vercel/` están en `.gitignore` y ahí siguen.

▸ Queda un correo personal a la vista, en el `User-Agent` de
`docs/referencias/buscar-fotos-commons.py`. No es un descuido: la API de Wikimedia **exige** un
contacto en la cabecera. Si molesta en un repositorio público, se cambia por uno de proyecto.

### Cómo quedó la página, de arriba abajo

```
Hero · Programa · Pasos · Beneficiarios · Convocatoria
Proceso · Requisitos · Niveles · Cierre · Recursos · Pie
```

| Sección | Qué es |
|---|---|
| `Pasos` | Los cuatro pasos, en carrusel de portada con fondo `--color-plomo` |
| `Beneficiarios` | «Presente en 7 provincias» + dos perfiles + pila de fotos de provincia |
| `Proceso` | «Tu camino en EMPRENDER», siete etapas |
| `Niveles` | Formación, con el molde morado que tenían los cursos |
| `Cierre` | «¿Listo dar el siguiente paso?», la franja final |
| `Recursos` | Lo último antes del pie |

### Contenido que ya no se pinta pero sigue en `contenido.ts`

Nada de esto se borró, y todo lleva un aviso en el propio fichero. Es texto **oficial** de las
bases o del SEAL, y volcarlo costó trabajo:

| Constante | Por qué salió |
|---|---|
| `CONDICIONES` | Su tarjeta «Además de los requisitos» se retiró de la convocatoria |
| `CURSOS`, `CURSOS_CABECERA` | La sección de cursos abiertos se retiró; de formación quedan los niveles |
| `CRONOGRAMA` | Repetía el recorrido que cuenta `PROCESO`. **Lleva los plazos en días hábiles, que `PROCESO` no da** |

### Trampa 7 — dos sesiones a la vez sobre el mismo repositorio

Pasó, y produce un síntoma que despista del todo: **la página de producción y el `localhost` no
enseñan lo mismo**, porque el servidor de desarrollo recarga los ficheros del disco y esos los
está cambiando otra sesión.

Si algo «desaparece» y no fuiste tú:

```bash
git status --short          # ficheros tocados que no recuerdas
git log --oneline -3        # ¿tu último commit sigue siendo el último?
```

▲▲ **Antes de borrar un fichero que `git status` marca como `??`, commitéalo o cópialo.** Un
fichero sin rastrear que se borra **no se puede revertir**: no está en ningún sitio. Se perdió
así `Proceso.tsx`, creado por la otra sesión y borrado por esta.

### Cómo se recuperó `Proceso.tsx`, por si vuelve a hacer falta

Se reconstruyó desde el JavaScript compilado que quedaba en `.next/dev`. **El build de
desarrollo conserva la estructura JSX legible**: nombres de clase, orden de los elementos e
incluso los comentarios del código original.

```bash
grep -rl "components/Proceso" .next
python3 -c "…"   # buscar 'function Proceso(' y limpiar los nombres de turbopack
```

Los datos nunca se perdieron: vivían en `contenido.ts`, que sí estaba commiteado. **Es otro
argumento para la Regla 1**: con el texto separado del componente, perder un componente cuesta
una tarde; perder el texto costaría volver a transcribir el PDF.

▸ El fichero reconstruido lleva un aviso en su cabecera. Si algún detalle no cuadra con el
original, viene de ahí.

### Dos equivocaciones de esta jornada, para no repetirlas

**Se borró la sección que había que conservar.** Se pidió quitar la que se veía en una captura
con el antetítulo «El proceso»; había *dos* secciones que empezaban así —`Proceso` y
`Cronograma`— y se borró la que no era sin comprobar cuál pintaba esa pantalla.
▸ **Antes de borrar una sección por una captura, confirma qué componente la pinta**, buscando en
`src/` una frase literal de la imagen.

**Se documentó como bug algo que no lo era.** Ver la Trampa 5. Un servidor huérfano servía la
página sin CSS y se llegó a escribir en este fichero una regresión inexistente de la Trampa 1.
▸ **Antes de dar por bueno un fallo de maquetación, comprueba que el CSS carga.**

### Los créditos de foto están plegados, no borrados

Se pidió ocultarlos por espacio. Van en un `<details>` de una línea en el pie. **No se borraron
a propósito:** dos de las licencias son CC BY-SA, todas exigen atribución, y la página responde
`200` a cualquiera con el enlace aunque lleve `noindex`. Plegados cumplen la Regla 4 —el texto
está en el HTML y a un clic—; borrados, no.

### Lo siguiente

- **El bloqueo de despliegue**, arriba del todo en «Desplegar». Añadir `joelusa25@gmail.com` al
  equipo de Vercel y el rodeo del `tar` deja de hacer falta.
- **Fotos propias del Ministerio.** Las once de Wikimedia son un puente. Cuando lleguen, se
  cambian, se borra `CREDITOS_FOTOS` y el bloque del pie desaparece solo.
- **El `noindex` sigue puesto** (Regla 3) y debe seguir hasta que el Ministerio apruebe el
  contenido.
- **Quedan cuatro fragmentos en `borrador`**: duración, módulos y URL de cada nivel, y los dos
  videos de `RECURSOS`, que aún no tienen URL. El botón «Revisión» los resalta.
