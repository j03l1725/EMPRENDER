/**
 * Todo el contenido de la landing, en un solo sitio.
 *
 * La idea es que mañana, con Estefy delante, se edite ESTE fichero y nada más.
 * Cada bloque dice de dónde sale:
 *
 *   oficial  → verificado en la ficha del MPCEI o en el SEAL en producción.
 *              No se cambia sin cambiar la fuente.
 *   borrador → lo escribimos nosotros para que la página no esté vacía.
 *              Es exactamente lo que ella tiene que corregir.
 *
 * El botón «Revisión» de la esquina resalta en amarillo todo lo `borrador`.
 */

export const PROGRAMA = {
  nombre: "EMPRENDER",
  nombreLargo:
    "Fortalecimiento de las capacidades de las Unidades Productivas Rurales en el Territorio Focalizado",
  ejecutor: "Ministerio de Producción, Comercio Exterior e Inversiones",
  ejecutorSiglas: "MPCEI",
  correo: "pemprender@produccion.gob.ec",
  correoQuejas: "quejasyreclamos@produccion.gob.ec",
  fichaOficial:
    "https://www.produccion.gob.ec/proyecto-fortalecimiento-de-las-capacidades-de-las-unidades-productivas-rurales-en-el-territorio-focalizado-emprender/",
} as const;

/** borrador — bajada del hero. La escribe Estefy. */
export const HERO_BAJADA =
  "Capital semilla, acompañamiento técnico y formación para que las unidades productivas " +
  "rurales del territorio focalizado den el salto a la agroindustria.";

export const CIFRAS = [
  { valor: "7", sufijo: "", etiqueta: "provincias focalizadas" },
  { valor: "80.000", prefijo: "USD ", etiqueta: "de capital semilla, hasta" },
  { valor: "2027", sufijo: "", etiqueta: "vigencia del proyecto" },
] as const;

/** oficial — ficha del MPCEI */
export const PROVINCIAS = [
  "Esmeraldas",
  "Manabí",
  "Santo Domingo de los Tsáchilas",
  "Carchi",
  "Imbabura",
  "Sucumbíos",
  "Napo",
] as const;

/** borrador — el párrafo de «qué es». Lo escribe Estefy. */
export const QUE_ES = [
  "EMPRENDER es un proyecto del Ministerio de Producción, Comercio Exterior e Inversiones " +
    "que fortalece las capacidades de las unidades productivas rurales del territorio focalizado " +
    "para que desarrollen agronegocios sostenibles.",
  "No es solo dinero. Cada unidad productiva seleccionada elabora un Plan de Mejora de " +
    "Agronegocios, recibe acompañamiento técnico durante su ejecución y entra a un programa de " +
    "aceleración empresarial.",
];

/** oficial — los seis objetivos específicos, textuales de la ficha */
export const OBJETIVOS = [
  "Apoyar la implementación de convocatorias a fondos de cofinanciamiento",
  "Implementar programas de fortalecimiento empresarial (aceleración)",
  "Acompañar la elaboración de Planes de Mejora de Agronegocios (PMA)",
  "Acompañar la ejecución de los PMA aprobados",
  "Recopilar y reportar información del sistema de seguimiento",
  "Mejorar capacidades de fortalecimiento empresarial en actores territoriales",
] as const;

/** oficial — enfoques declarados en la ficha */
export const ENFOQUES = [
  "Género e inclusión social y rural",
  "Gestión de riesgos sociales, climáticos y ambientales",
] as const;

/** oficial — beneficiarios elegibles según la ficha */
export const BENEFICIARIOS = [
  {
    titulo: "Asociaciones de productores",
    detalle: "Organizaciones de productores legalmente constituidas del territorio focalizado.",
    icono: "users",
  },
  {
    titulo: "MiPymes",
    detalle: "Micro, pequeñas y medianas empresas con actividad agroindustrial.",
    icono: "building",
  },
  {
    titulo: "Organizaciones de EPS",
    detalle: "Economía Popular y Solidaria con proyectos de impacto rural.",
    icono: "handshake",
  },
  {
    titulo: "Personas naturales",
    detalle: "Con actividades productivas y proyectos agroindustriales.",
    icono: "user",
  },
] as const;

/**
 * borrador — la convocatoria 2026 todavía no está publicada.
 * La que hay en produccion.gob.ec es la primera y cerró el 2025-11-09.
 * Fechas, requisitos y formulario los tiene que dar Estefy.
 */
export const CONVOCATORIA = {
  estado: "Próxima convocatoria 2026",
  montoMin: "USD 10.000",
  montoMax: "USD 80.000",
  cierre: "por confirmar",
  urlBases:
    "https://www.produccion.gob.ec/wp-content/uploads/2025/10/1ERA_Convocatoria_Proyecto_EMPRENDER_MPCEI.pdf",
  urlPostular: "https://formshare.alliance.cgiar.org/enketo/FPrfTOHe",
  pasos: [
    {
      n: 1,
      titulo: "Revisa si calificas",
      detalle:
        "Tu unidad productiva debe estar en una de las siete provincias del territorio focalizado y tener un proyecto agroindustrial con impacto rural.",
    },
    {
      n: 2,
      titulo: "Postula en línea",
      detalle:
        "Llena el formulario de postulación con los datos de la unidad productiva y la propuesta.",
    },
    {
      n: 3,
      titulo: "Elabora tu Plan de Mejora",
      detalle:
        "Si pasas la evaluación, recibes acompañamiento para construir el Plan de Mejora de Agronegocios (PMA).",
    },
    {
      n: 4,
      titulo: "Ejecuta con acompañamiento",
      detalle:
        "Con el PMA aprobado accedes al capital semilla y al programa de fortalecimiento empresarial.",
    },
  ],
} as const;

/**
 * borrador — los tres niveles.
 * Estefy dijo «son tres niveles» y nada más. Nombres, contenido y URLs de destino
 * en el SEAL son invención nuestra hasta que ella los confirme.
 */
export const NIVELES = [
  {
    n: 1,
    nombre: "Fundamentos del agronegocio",
    detalle:
      "Para quien recién empieza. Qué es un agronegocio, cómo se organiza una unidad productiva y qué exige el mercado.",
    duracion: "20 horas",
    modulos: 4,
    href: "https://capacitacion.agricultura.gob.ec/",
  },
  {
    n: 2,
    nombre: "Gestión y formalización",
    detalle:
      "Costos, precios, calidad, asociatividad y los requisitos formales para vender a compradores grandes.",
    duracion: "32 horas",
    modulos: 6,
    href: "https://capacitacion.agricultura.gob.ec/",
  },
  {
    n: 3,
    nombre: "Plan de Mejora de Agronegocios",
    detalle:
      "El nivel que prepara la postulación: cómo se arma un PMA, cómo se sustenta la inversión y cómo se mide el resultado.",
    duracion: "40 horas",
    modulos: 8,
    href: "https://capacitacion.agricultura.gob.ec/",
  },
] as const;

/**
 * oficial — cursos vistos en el carrusel «Cursos abiertos» del SEAL el 2026-08-26.
 * Las imágenes están recortadas de esa misma captura y son provisionales.
 */
export const CURSOS = [
  {
    titulo: "Manejo integrado del cultivo de cacao",
    imagen: "/img/curso-cacao.jpg",
    inscritos: 0,
    actualizado: "13 jun 2026",
    href: "https://capacitacion.agricultura.gob.ec/",
  },
  {
    titulo: "Manejo integrado del cultivo de banano",
    imagen: "/img/curso-banano.jpg",
    inscritos: 0,
    actualizado: "13 jun 2026",
    href: "https://capacitacion.agricultura.gob.ec/",
  },
  {
    titulo: "Manejo integrado del cultivo de arroz",
    imagen: "/img/curso-arroz.jpg",
    inscritos: 135,
    actualizado: "23 ago 2026",
    href: "https://capacitacion.agricultura.gob.ec/",
    nuevo: true,
  },
] as const;

/** borrador — Estefy pidió «unos dos videos: uno de Instagram y otro un video». Faltan las URL. */
export const RECURSOS = [
  {
    tipo: "video" as const,
    titulo: "Conoce EMPRENDER en tres minutos",
    detalle: "Qué es el programa, a quién va dirigido y cómo se postula.",
  },
  {
    tipo: "reel" as const,
    titulo: "Historias del territorio",
    detalle: "Unidades productivas que ya pasaron por el programa.",
  },
];
