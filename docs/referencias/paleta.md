# Paleta y patrones del SEAL

Los colores **no están estimados a ojo**: salen de contar píxeles sobre las tres capturas de
`capturas/` con Pillow. Cada uno lleva dónde se midió.

| Token | Hex | Dónde se midió |
|---|---|---|
| `navy` | `#041336` | Barra de cabecera fija. 60 % de esa banda |
| `azul` | `#005eb8` | Botón «Acceder» y borde de «Register» |
| `morado` | `#3f377b` | Banda «Cursos abiertos» y pie de página. 15 % de la captura 3 |
| `verde` | `#1c6d0e` | Botón «Conoce el SEAL». 90 % del área del botón |
| `verde-claro` | `#d9f2cb` | Tarjetas «Tipos de cursos / Manuales / Recursos / Soporte» |
| `gris` | `#f5f7f9` | Fondo de sección alterna |
| `blanco` | `#ffffff` | Fondo dominante — 41-60 % según la captura |

▸ **El acento del Gobierno del Ecuador** (rojo `#EF3E42`, amarillo `#FFD700`, azul `#0255ba`)
ya estaba tipificado en `fomento-digital/tailwind.config.js` del proyecto de Economía Digital.
Se reutiliza tal cual para la franja tricolor del logo.

## Patrones que hay que replicar

**Tarjeta de curso** — es lo que pide el audio 2. Del carrusel «Cursos abiertos»:

```
┌──────────────────────────┐
│   foto 16:9 del curso    │  ← esquinas superiores redondeadas
├──────────────────────────┤
│ Manejo integrado del     │  ← título, negrita, 2 líneas máx
│ cultivo de cacao         │
│ ◎ 135    ⟳ 23 ago 2026   │  ← inscritos · última actualización
│ ▁▁▁▁▁▁▁▁                 │  ← barra de acento inferior, parcial
└──────────────────────────┘
```

Carrusel de 3 visibles, flechas circulares blancas a los lados, puntos de paginación abajo con
el activo alargado en verde.

**Tarjeta de categoría** — fondo `verde-claro`, icono de línea grande arriba centrado, título en
negrita, párrafo de tres o cuatro líneas. Cuatro en fila.

**Cabecera** — fija, `navy`, altura ~64 px: logo tricolor «EL NUEVO ECUADOR / Ministerio…» a la
izquierda, marca de la plataforma al lado, enlaces de texto en el centro, buscador y dos botones
píldora a la derecha (`azul` relleno + `azul` contorno).

**Hero** — foto a sangre con degradado cálido, título enorme en blanco, párrafo, dos CTA: uno
sólido `verde` y otro de texto con icono de play circular.

**Pie** — banda `morado`, cuatro enlaces en fila, buscador ancho con botón `verde`, línea de
copyright centrada.

▲ El SEAL usa el widget de accesibilidad (botón circular azul, esquina inferior derecha) y una
barra de progreso de lectura. Si la landing va a convivir con el SEAL, conviene mantener el
mismo widget para que no se note el salto.
