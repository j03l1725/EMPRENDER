# EMPRENDER — qué estamos construyendo

Escrito el 2026-08-26 a partir de: la ficha oficial del proyecto en `produccion.gob.ec`, los
dos audios de Estefy Pérez de esa tarde, el chat de WhatsApp, tres capturas del SEAL en
producción y el código del proyecto de Economía Digital (`~/Desktop/fomento-digital`).

▲▲ **Lo que no está aquí es lo que se habló por llamada y no se grabó.** Joel lo dice
explícitamente: «todo hicimos por llamada, no grabé esa llamada, no me acuerdo de muchas
cosas». Cada afirmación de abajo lleva de dónde sale. Lo que no tiene fuente está en
§ 6 como pregunta abierta, no como supuesto.

---

## 1. El encargo, en una frase

Una **landing page nueva** para el programa EMPRENDER: explica el programa, empuja a la
convocatoria y reparte a los cursos por niveles. **No se toca el SEAL** — se convive con él.

---

## 2. El programa del que habla la página

Fuente: [ficha oficial del MPCEI](https://www.produccion.gob.ec/proyecto-fortalecimiento-de-las-capacidades-de-las-unidades-productivas-rurales-en-el-territorio-focalizado-emprender/)

- **Nombre completo:** «Fortalecimiento de las capacidades de las Unidades Productivas Rurales
  en el Territorio Focalizado» — EMPRENDER.
- **Ejecuta:** Ministerio de Producción, Comercio Exterior e Inversiones (MPCEI).
- **Capital semilla:** entre **USD 10.000 y USD 80.000** por unidad productiva.
- **A quién:** asociaciones de productores, MiPymes, organizaciones de Economía Popular y
  Solidaria (EPS) y personas naturales con actividad productiva.
- **Dónde:** Esmeraldas, Manabí, Santo Domingo de los Tsáchilas, Carchi, Imbabura, Sucumbíos
  y Napo. **Siete provincias, no el país entero** — esto condiciona el mapa y el filtro de
  elegibilidad de la landing.
- **Qué financia:** Planes de Mejora de Agronegocios (PMA), aceleración empresarial y
  acompañamiento técnico.
- **Contacto:** `pemprender@produccion.gob.ec`
- **Vigencia:** hasta 2027, con convocatorias sucesivas. La primera cerró el 2025-11-09
  ([nota](https://www.produccion.gob.ec/primera-convocatoria-a-fondos-de-capital-semilla-del-proyecto-emprender/)),
  y la ficha anuncia convocatoria durante 2026.

▲ **La convocatoria que la landing debe enlazar todavía no está identificada.** La que hay
publicada es la primera, ya cerrada. Sin las bases de la de 2026 la sección de convocatoria se
maqueta con datos de ejemplo y se rellena cuando Estefy los mande.

---

## 3. Las dos plataformas, y por qué no tocamos una

**El SEAL** — `capacitacion.agricultura.gob.ec` — es el Sistema de Enseñanza en Línea del
Ministerio de Agricultura, Ganadería y Pesca. Es un **Moodle con el tema MB2NL**. Ahí ya viven
los cursos: Cursos del MAGP, Escuelas y Programas Especializados (incluida «Emprendimiento
Joven Rural»), Formación Institucional, Webinars y Ejes Transversales.

**La decisión, dicha por Joel:** no se cambia nada del SEAL. Se pidieron los accesos al
WordPress [sic] por correo y aún no los dan, pero **aunque los den, no van a permitir tocarlo**.
Lo que se acordó con la jefa de Estefy es que **dentro del SEAL haya un botón** que lleve a la
plataforma nueva.

▸ **Plan B, ya hablado y aprobado:** si no dan acceso, **todo se sirve desde el servidor propio
de INSIDE**, la empresa de Joel. La landing no depende del SEAL para existir; solo pierde el
botón de entrada desde allá.

▲ Joel es **contratista externo** en este proyecto. Estefy trabaja con él en la empresa y es la
contraparte que consigue textos y decisiones.

▲▲ **Hay un cruce institucional sin resolver:** el programa es del **MPCEI** (Producción) y los
cursos están en el **SEAL del MAG** (Agricultura). De quién es la marca de la landing, qué
logos van y bajo qué dominio se publica no está confirmado. Está en § 6.

---

## 4. Cómo tiene que ser la landing

Sale del audio 1 de Estefy, en su orden. Transcripción completa en
`transcripciones/2026-08-26-estefy.md`.

| # | Sección | Qué pidió |
|---|---|---|
| 1 | **Hero** | Interactivo, «que se parezca mucho a la de Economía Digital» pero con algo del formato SEAL. Logos del Gobierno del Ecuador y el nombre EMPRENDER |
| 2 | **Qué es el programa** | Un espacio que lo explique |
| 3 | **Convocatoria** | El tema completo: las bases y el link, para que salgan a registrarse |
| 4 | **Cursos por niveles** | **Tres niveles.** Nivel 1, nivel 2, nivel 3. Cada uno entra a la plataforma de cursos |
| 5 | **Recursos** | Pocos. Al menos dos videos: uno de Instagram y otro un video propio |

Del audio 2: **las tarjetas de curso se copian del SEAL** — foto arriba, título, metadatos.
El molde está dibujado en `referencias/paleta.md`.

**Los referentes visuales son dos y hay que mezclarlos:**

- **Economía Digital** (`~/Desktop/fomento-digital`) pone el movimiento: hero de pantalla
  completa con dos anillos de burbujas orbitando en sentidos opuestos, resplandores difusos,
  rejilla sutil, `framer-motion` y `lucide-react`. Ahí está también la paleta del Gobierno ya
  tipificada (`gob-blue #0255ba`, `gob-red #EF3E42`, `gob-gold #FFD700`).
- **El SEAL** pone la institucionalidad: cabecera navy fija, bandas moradas, verde de acción,
  tarjetas verde claro. Medido en `referencias/paleta.md`.

▸ **Joel va a mandar componentes de 21st.dev.** El scaffold está montado para que entren
directo: React 19 + Tailwind v4, que es lo que esos componentes esperan.

---

## 5. Decisiones técnicas ya tomadas

| Decisión | Qué | Por qué |
|---|---|---|
| Framework | **Next.js 16 + React 19 + TypeScript + Tailwind v4** en `web/` | Es a donde apunta el despliegue (Vercel) y aguanta que después «se pongan más cosas». Los componentes de 21st.dev son React + Tailwind, entran sin traducción |
| Despliegue | **Vercel por CLI**, con **token de otra cuenta** — no la de Joel | Lo dijo Joel. El token llega después; hasta entonces **todo local** |
| Idioma | Español, `lang="es"` | Público rural ecuatoriano |
| Contenido | **Placeholders marcados** hasta que Estefy mande los textos | Ella dijo que los textos los da ella. Inventarlos aquí sería fabricar contenido institucional |

▲ Economía Digital es **Vite**, no Next. Se toma de ahí el diseño y los componentes, no la
configuración. Si se prefiere paridad exacta de stack con ese proyecto, se cambia ahora que no
hay nada escrito — cuesta poco hoy y mucho en dos semanas.

---

## 6. Lo que falta — preguntas para Estefy

1. **Los textos.** Todos. Hero, «qué es el programa», descripción de cada nivel, recursos.
2. **La convocatoria vigente.** ¿Cuál es la de 2026, cuándo abre y cierra, dónde están las
   bases en PDF y a qué formulario se registra la gente?
3. **Los tres niveles.** ¿Cómo se llaman, qué contiene cada uno, y a qué URL exacta del SEAL
   entra cada uno? ¿Hay prerrequisito entre niveles?
4. **Los logos a la derecha.** En el SEAL van a la izquierda. ¿Es a propósito o se refería a
   los botones de sesión?
5. **De quién es la página.** ¿Marca MPCEI, marca MAG, o las dos? Es lo que decide la cabecera.
6. **Los dos videos.** URL del reel de Instagram y del video propio.
7. **El dominio.** ¿Subdominio del SEAL, dominio propio, o `.vercel.app` mientras tanto?
8. **El botón dentro del SEAL.** ¿Sigue en pie? ¿Llegó el acceso al gestor?

▸ Nada de esto bloquea maquetar. Se construye con placeholders visibles y se reemplaza.
