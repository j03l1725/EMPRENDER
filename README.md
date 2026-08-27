# EMPRENDER

Landing page del programa **EMPRENDER** — «Fortalecimiento de las capacidades de las Unidades
Productivas Rurales en el Territorio Focalizado», del Ministerio de Producción, Comercio
Exterior e Inversiones del Ecuador.

▸ **Antes de tocar nada, leer `docs/BRIEF.md`.** Ahí está qué se pidió, qué está confirmado, qué
está supuesto y las ocho preguntas abiertas. 131 líneas.

## Estado

**Local.** Todavía no se despliega. El despliegue es por CLI de Vercel con el token de **otra
cuenta**, no la de Joel, y ese token aún no llega.

## Estructura

```
web/                          Next.js 16 · React 19 · TypeScript · Tailwind v4
docs/
  BRIEF.md                    El encargo entendido. Se lee primero
  transcripciones/            Audios de Estefy del 2026-08-26 + su transcripción
  referencias/
    paleta.md                 Colores medidos sobre las capturas, no estimados
    capturas/                 El SEAL en producción, 2026-08-26
    marca/                    Logos que mandó Estefy
```

## Correr en local

```bash
cd web && npm run dev      # http://localhost:3000
```

## Reglas de esta base

1. **Ningún texto institucional se inventa.** Los textos los da Estefy. Lo que no llegó va como
   placeholder visible — `[[FALTA: …]]` — nunca como prosa plausible. Una landing de gobierno
   con cifras inventadas es un problema, no un borrador.
2. **El SEAL no se toca.** Es un Moodle del MAG y no hay permiso para modificarlo. Se replica su
   lenguaje visual; no se edita su código.
3. **Los colores salen de `docs/referencias/paleta.md`**, que salen de contar píxeles. Si hace
   falta uno nuevo, se mide y se anota ahí.
