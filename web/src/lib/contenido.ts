/**
 * Todo el contenido de la landing, en un solo sitio.
 *
 * Se edita ESTE fichero y nada más. Cada bloque dice de dónde sale:
 *
 *   oficial  → verificado en las bases de la convocatoria 2026 (41 páginas, PDF en
 *              public/documentos/), en la ficha del MPCEI o en el SEAL en producción.
 *              Se indica el numeral de las bases cuando aplica.
 *   borrador → lo escribimos nosotros. Es lo que hay que corregir con Estefy.
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

/**
 * oficial — bases § 3.3. Coordenadas proyectadas sobre la silueta del país
 * (generadas desde datos geográficos, no puestas a ojo; ver README).
 */
export const PROVINCIAS = [
  { nombre: "Esmeraldas", region: "Costa", x: 22.95, y: 8.53 },
  { nombre: "Manabí", region: "Costa", x: 8.9, y: 43.93 },
  { nombre: "Santo Domingo de los Tsáchilas", region: "Costa", x: 31.35, y: 29.92 },
  { nombre: "Carchi", region: "Sierra", x: 56.8, y: 11.27 },
  { nombre: "Imbabura", region: "Sierra", x: 49.72, y: 19.32 },
  { nombre: "Sucumbíos", region: "Amazonía", x: 71.42, y: 23.99 },
  { nombre: "Napo", region: "Amazonía", x: 55.13, y: 42.87 },
] as const;

/** borrador — el párrafo de «qué es». Lo escribe Estefy. */
export const QUE_ES = [
  "EMPRENDER es un proyecto del Ministerio de Producción, Comercio Exterior e Inversiones " +
    "que fortalece las capacidades de las unidades productivas rurales del territorio focalizado " +
    "para que desarrollen agronegocios sostenibles.",
  "No es solo dinero. Cada unidad productiva seleccionada se capacita, construye su Plan de " +
    "Mejora de Agronegocios con acompañamiento técnico, y recién entonces accede al capital " +
    "semilla para ejecutarlo.",
];

/** oficial — los seis objetivos específicos, textuales de la ficha del MPCEI */
export const OBJETIVOS = [
  "Apoyar la implementación de convocatorias a fondos de cofinanciamiento",
  "Implementar programas de fortalecimiento empresarial (aceleración)",
  "Acompañar la elaboración de Planes de Mejora de Agronegocios (PMA)",
  "Acompañar la ejecución de los PMA aprobados",
  "Recopilar y reportar información del sistema de seguimiento",
  "Mejorar capacidades de fortalecimiento empresarial en actores territoriales",
] as const;

/** oficial — enfoques declarados en la ficha y en las bases § 3.4 */
export const ENFOQUES = [
  "Género e inclusión social y rural",
  "Gestión de riesgos sociales, climáticos y ambientales",
] as const;

/** oficial — bases § 1 (Definiciones) y § 3.3 */
export const BENEFICIARIOS = [
  {
    titulo: "Asociaciones de productores",
    detalle:
      "Organizaciones económicas de productores primarios que agregan valor a la materia prima.",
    icono: "users",
  },
  {
    titulo: "MiPymes agroindustriales",
    detalle: "Micro, pequeñas y medianas empresas que transforman materia prima agropecuaria.",
    icono: "building",
  },
  {
    titulo: "Organizaciones de EPS",
    detalle: "Economía Popular y Solidaria con proyectos agroindustriales de impacto rural.",
    icono: "handshake",
  },
  {
    titulo: "Personas naturales",
    detalle: "Que lideren una unidad productiva agroindustrial con presencia en el mercado.",
    icono: "user",
  },
] as const;

/** oficial — bases § 4.1.1. Perfiles cuya participación es deseable. */
export const PERFILES_DESEABLES = [
  "Mujeres que realicen actividades productivas",
  "Jóvenes entre 18 y 29 años",
  "Personas de pueblos y nacionalidades indígenas del Ecuador",
  "Personas con discapacidad o sus sustitutos registrados",
] as const;

/** oficial — bases § 3.13 (cronograma) y § 4.1 (postulación) */
export const CONVOCATORIA = {
  titulo: "Primera convocatoria a fondos de capital semilla",
  abre: "15 de junio de 2026",
  cierra: "31 de diciembre de 2026",
  abierta: true,
  montoMin: "USD 10.000",
  montoMax: "USD 80.000",
  correoPostulacion: "pemprender@produccion.gob.ec",
  urlFormulario: "https://formshare.alliance.cgiar.org/enketo/FPrfTOHe",
  urlBases: "/documentos/bases-convocatoria-emprender-2026.pdf",
} as const;

/** oficial — bases § 3.10. Las tres reglas de dinero que definen la postulación. */
export const REGLAS_DINERO = [
  {
    cifra: "USD 10.000 – 80.000",
    titulo: "Capital semilla",
    detalle:
      "El monto depende de la capacidad de gestión de la unidad productiva, de la calidad técnica de su PMA y de la validación del equipo del proyecto.",
  },
  {
    cifra: "50 %",
    titulo: "Va a los productores primarios",
    detalle:
      "Al menos la mitad del capital semilla se destina a inversiones dirigidas a los proveedores primarios, para fortalecer su capacidad productiva y sus ingresos.",
  },
  {
    cifra: "30 %",
    titulo: "Contraparte mínima",
    detalle:
      "Sobre el valor total de la inversión del PMA. Puede ser en efectivo o en especie —maquinaria, equipos, vehículos, tierras, trabajo técnico—, siempre con respaldo documental.",
  },
] as const;

/** oficial — bases § 3.10 (garantías) y § 3.5 (inclusión de productores primarios) */
export const CONDICIONES = [
  {
    titulo: "Mínimo 50 productores primarios",
    detalle:
      "Cada unidad productiva firma un Acuerdo de Inclusión y debe vincular y beneficiar directamente a al menos cincuenta productores primarios de las provincias priorizadas.",
  },
  {
    titulo: "Garantía del 5 %",
    detalle:
      "Sobre el capital semilla aprobado, de cobro inmediato, a nombre del MPCEI y vigente por 18 meses.",
  },
  {
    titulo: "Contabilidad formal",
    detalle:
      "La unidad beneficiaria mantiene un software contable conforme a la norma ecuatoriana y contrata un profesional contable mientras dure el convenio. Ese costo sí cuenta como contraparte.",
  },
  {
    titulo: "Meta de crecimiento",
    detalle:
      "El PMA debe reflejar un incremento de ventas del 20 % hasta el final del proceso.",
  },
] as const;

/** oficial — bases § 3.13, resumido a las fases que le importan al postulante */
export const CRONOGRAMA = [
  {
    n: 1,
    titulo: "Postulación",
    plazo: "15 jun — 31 dic 2026",
    detalle:
      "Envías el formulario y los documentos al correo del proyecto. Las postulaciones se revisan a medida que van ingresando.",
  },
  {
    n: 2,
    titulo: "Revisión y selección",
    plazo: "Hasta 7 días hábiles",
    detalle: "Se convalidan los requisitos y se seleccionan beneficiarios por orden de recepción.",
  },
  {
    n: 3,
    titulo: "Asistencia técnica de arranque",
    plazo: "Hasta 7 días hábiles",
    detalle: "Levantamiento de los formularios de caracterización de la unidad productiva y su hogar.",
  },
  {
    n: 4,
    titulo: "Capacitación",
    plazo: "Hasta 20 días hábiles",
    detalle:
      "Al menos tres procesos de capacitación, junto con los productores primarios vinculados.",
  },
  {
    n: 5,
    titulo: "Construcción del PMA y del PGSAC",
    plazo: "Hasta 30 días hábiles",
    detalle:
      "Acompañamiento para elaborar el Plan de Mejora de Agronegocios, el Plan de Gestión Social, Ambiental y Climática y el cronograma de inversión.",
  },
  {
    n: 6,
    titulo: "Evaluación y selección",
    plazo: "Hasta 15 días hábiles",
    detalle: "El PMA se evalúa una sola vez. No hay reevaluación: el resultado es definitivo.",
  },
  {
    n: 7,
    titulo: "Acreditación y firma de convenio",
    plazo: "Hasta 15 días hábiles",
    detalle:
      "Acreditación por el MINEDEC y firma del convenio de cofinanciamiento con el MPCEI.",
  },
] as const;

/**
 * oficial — bases § 4.1.1.1 y § 4.1.1.2.
 * `formato` marca los que se descargan aquí mismo; `enlace` los que se obtienen
 * en el sistema oficial de cada institución.
 */
type Requisito = {
  titulo: string;
  como: string;
  enlace?: string;
  enlaceTexto?: string;
  formato?: string;
};

export const REQUISITOS_COMUNES: Requisito[] = [
  {
    titulo: "Formulario de postulación",
    como: "Describe la actividad productiva del agronegocio, su estado actual y sus productos.",
    enlace: CONVOCATORIA.urlFormulario,
    enlaceTexto: "Abrir el formulario",
  },
  {
    titulo: "RUC con domicilio en una provincia priorizada",
    como: "Certificado de Registro Único de Contribuyente con actividad productiva.",
    enlace: "https://srienlinea.sri.gob.ec/sri-en-linea/inicio/NAT",
    enlaceTexto: "Obtener en el SRI",
  },
  {
    titulo: "Evidencia de ventas del último año",
    como: "Facturas o notas de venta autorizadas por el SRI a nombre de la unidad productiva. Se verifica su validez.",
  },
  {
    titulo: "Interés del mercado",
    como: "Documento firmado por un socio comercial que manifieste interés en comprar tus productos, con sus datos de contacto.",
  },
  {
    titulo: "Certificado de cumplimiento tributario",
    como: "Emitido por el SRI, actualizado a la fecha de postulación.",
    enlace: "https://srienlinea.sri.gob.ec/sri-en-linea/inicio/NAT",
    enlaceTexto: "Obtener en el SRI",
  },
  {
    titulo: "Certificado de obligaciones patronales",
    como: "Emitido por el IESS. Si el sistema devuelve una hoja en blanco, solicita el certificado de no estar registrado como patrono. No se aceptan autocertificaciones.",
    enlace: "https://www.iess.gob.ec/es/web/empleador/certificado-de-obligaciones-patronales",
    enlaceTexto: "Obtener en el IESS",
  },
  {
    titulo: "Certificado del SERCOP",
    como: "De no ser contratista incumplido ni adjudicatario fallido con el Estado. Verifica el nombre del certificado: el SERCOP emite dos tipos.",
    enlace:
      "https://www.compraspublicas.gob.ec/ProcesoContratacion/compras/FO/formularioCertificados.cpe",
    enlaceTexto: "Obtener en el SERCOP",
  },
  {
    titulo: "Registro Único de MiPymes (RUM)",
    como: "Certificado RUM vigente.",
    enlace: "https://servicios.produccion.gob.ec/rum/publico/categorizacion.jsf",
    enlaceTexto: "Obtener el RUM",
  },
  {
    titulo: "Carta de compromiso con productores primarios",
    como: "Firmada con los productores primarios de materias primas agropecuarias.",
    formato: "/documentos/declaracion-de-compromiso.doc",
  },
  {
    titulo: "Declaración de no tener conflicto de intereses",
    como: "Suscrita a la fecha de postulación por el representante legal.",
    formato: "/documentos/carta-no-conflicto-de-interes.docx",
  },
];

export const REQUISITOS_NATURAL: Requisito[] = [
  {
    titulo: "Cédula o pasaporte con residencia",
    como: "Ser mayor de 18 años, ecuatoriano o extranjero con residencia legal y permiso de trabajo vigente. En PDF.",
  },
  {
    titulo: "Declaración del IVA del último ejercicio fiscal",
    como: "Presentada ante el SRI.",
  },
  {
    titulo: "Historial crediticio del representante legal",
    como: "Sin obligaciones vencidas en el sistema financiero. Emitido por la Superintendencia de Bancos o un buró autorizado.",
  },
];

export const REQUISITOS_JURIDICA: Requisito[] = [
  {
    titulo: "Cédula del representante legal",
    como: "Copia legible de la cédula o pasaporte con visa de residencia y permiso de trabajo vigente.",
  },
  {
    titulo: "Nombramiento vigente",
    como: "Copia del nombramiento del representante legal.",
  },
  {
    titulo: "Escritura de constitución y estatutos",
    como: "Legalizados y registrados en la cartera de Estado correspondiente.",
  },
];

/** oficial — bases § 3.6, las causales que más descalifican */
export const CAUSALES_RECHAZO = [
  "No tener el establecimiento matriz y la producción en las provincias focalizadas",
  "No contar con el Acuerdo de Inclusión de al menos 50 productores primarios",
  "Dedicarse solo a comprar y vender sin agregar valor",
  "No presentar evidencia de ventas de los últimos 12 meses",
  "No estar al día con el SRI, el IESS o constar como incumplido en el SERCOP",
  "Estar recibiendo capital semilla de otra entidad pública sin haber cerrado la desinversión",
  "Presentar documentación incompleta, con errores, incongruente o no vigente",
] as const;

/** oficial — bases § 3.11 */
export const FINANCIABLE = [
  "Infraestructura y adecuaciones previstas en el PMA",
  "Maquinaria y equipos del proceso productivo",
  "Materiales, insumos y reactivos del cronograma de inversión",
  "Marca, marketing y estrategias de promoción",
  "Apertura de puntos de venta y canales de comercialización",
  "Mejora de procesos y certificaciones nacionales o internacionales",
  "Gestión de riesgos climáticos, ambientales y sociales",
  "Capacidades administrativas, comerciales, jurídicas y financieras",
] as const;

/**
 * borrador — los tres niveles.
 * Estefy dijo «son tres niveles» y nada más. Nombres, contenido y URL de destino
 * son invención nuestra hasta que ella los confirme. Ojo: las bases hablan de
 * «al menos 3 procesos de capacitación» (§ 3.13, fase 5) — puede que sean estos.
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
 * Las imágenes están recortadas de esa captura y son provisionales.
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
