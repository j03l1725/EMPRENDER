# EMPRENDER

Landing page del programa **EMPRENDER** — «Fortalecimiento de las capacidades de las Unidades
Productivas Rurales en el Territorio Focalizado», del Ministerio de Producción, Comercio
Exterior e Inversiones del Ecuador.

## Arrancar en una máquina nueva

```bash
git clone https://github.com/j03l1725/EMPRENDER.git
cd EMPRENDER/web
npm install
npm run dev                # http://localhost:3000
```

Para poder desplegar desde esa máquina, una vez:

```bash
vercel login
vercel link --yes --project emprender     # desde web/, no desde la raíz
```

No hay ningún token en el repositorio y no debe haberlo. `vercel login` deja la sesión en el
sistema, fuera del proyecto.

▸ **Si abres el repositorio con Claude Code, `CLAUDE.md` se carga solo.** Ahí están las reglas
del proyecto, las trampas conocidas y el orden de lectura. No hace falta explicárselo.

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

Las cinco secciones que pidió Estefy, en su orden: hero · qué es el programa · convocatoria ·
cursos por niveles · recursos. Y cuatro más que las bases de la convocatoria respaldan:
**a quién va dirigido**, **requisitos y documentos**, **cronograma** y el carrusel de
**cursos abiertos** con el molde de tarjeta del SEAL del segundo audio.

▸ **«Requisitos y documentos» resuelve un pedido concreto:** que nadie tenga que salir a un
Google Drive a buscar un formato. Los dos formatos de carta se descargan desde la propia
página (`web/public/documentos/`), y los certificados llevan al sistema oficial que los emite
—SRI, IESS, SERCOP, RUM—, que es el único válido. Las bases completas también se sirven
desde aquí, no desde Drive.

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

**Las fotos son de Wikimedia Commons con licencia de uso comercial**, y dos de ellas exigen
atribución con *compartir igual*. Por eso los créditos van visibles en el pie de la página: si
alguien borra ese bloque, la página deja de cumplir la licencia. Detalle y salida limpia en
`docs/referencias/creditos-fotos.md`.

**El SEAL no se toca.** Es un Moodle del MAG y no hay permiso para modificarlo. Se replica su
lenguaje visual; no se edita su código.

**Los colores salen de `docs/referencias/paleta.md`**, que salen de contar píxeles sobre las
capturas. Si hace falta uno nuevo, se mide y se anota ahí.

**La silueta del Ecuador del hero se generó desde datos geográficos**, no se dibujó. El
procedimiento y el script están en `docs/referencias/mapa-ecuador.md`. Los siete puntos son
las capitales provinciales, proyectadas con la misma transformación que el contorno.

## Despliegue

```bash
cd web && vercel --prod
```

La sesión de Vercel está iniciada en la máquina de Joel (`vercel login`, no hay token guardado
en el repositorio). El root directory del proyecto es `web/`: si Vercel apunta a la raíz de
`EMPRENDER`, el build falla.
