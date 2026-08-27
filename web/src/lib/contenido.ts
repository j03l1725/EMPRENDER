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
    "Fortalecimiento de las capacidades de las Unidades Productivas Rurales en el Territorio",
  ejecutor: "Ministerio de Desarrollo Económico y Productivo",
  correo: "pemprender@produccion.gob.ec",
  correoQuejas: "quejasyreclamos@produccion.gob.ec",
  fichaOficial:
    "https://www.produccion.gob.ec/proyecto-fortalecimiento-de-las-capacidades-de-las-unidades-productivas-rurales-en-el-territorio-focalizado-emprender/",
} as const;

/** oficial — bajada del hero. Texto entregado por Estefy el 2026-08-27. */
export const HERO_BAJADA =
  "Impulsa el crecimiento y la competitividad del sector agroindustrial, fortaleciendo " +
  "las capacidades de las unidades productivas rurales y acompañándolas en la mejora de sus negocios.";

/**
 * oficial — bases § 3.3. Coordenadas proyectadas sobre la silueta del país
 * (generadas desde datos geográficos, no puestas a ojo; ver README).
 */
export const PROVINCIAS = [
  { nombre: "Esmeraldas", region: "Costa", x: 22.95, y: 8.53, foto: "/img/prov-esmeraldas.jpg" },
  { nombre: "Manabí", region: "Costa", x: 8.9, y: 43.93, foto: "/img/prov-manabi.jpg" },
  { nombre: "Santo Domingo de los Tsáchilas", region: "Costa", x: 31.35, y: 29.92, foto: "/img/prov-santo-domingo.jpg" },
  { nombre: "Carchi", region: "Sierra", x: 56.8, y: 11.27, foto: "/img/prov-carchi.jpg" },
  { nombre: "Imbabura", region: "Sierra", x: 49.72, y: 19.32, foto: "/img/prov-imbabura.jpg" },
  { nombre: "Sucumbíos", region: "Amazonía", x: 71.42, y: 23.99, foto: "/img/prov-sucumbios.jpg" },
  { nombre: "Napo", region: "Amazonía", x: 55.13, y: 42.87, foto: "/img/prov-napo.jpg" },
] as const;

/** oficial — el párrafo de «qué es». Texto entregado por Estefy el 2026-08-27. */
export const QUE_ES = [
  "EMPRENDER impulsa a las unidades productivas rurales para que sus negocios crezcan, " +
    "mejoren y generen nuevas oportunidades.",
  "A través de capacitación y acompañamiento técnico especializado, cada unidad productiva " +
    "seleccionada construye su Plan de Mejora de Agronegocios (PMA), identificando qué " +
    "necesita fortalecer y cómo llevarlo a la práctica.",
  "Y damos un paso más: las unidades productivas que cumplen el proceso pueden acceder a " +
    "capital semilla para implementar su Plan de Mejora y convertirlo en resultados concretos.",
];

/**
 * oficial — los cuatro pasos del proceso. Estefy, 2026-08-27. Sustituyen a la
 * lista de seis objetivos específicos de la ficha, que decía lo mismo en
 * lenguaje de proyecto y no en el de quien va a postular.
 *
 * Las fotos son de Wikimedia con licencia de uso comercial; van declaradas en
 * CREDITOS_FOTOS porque la Regla 4 obliga a atribuirlas.
 */
export const PASOS = [
  {
    titulo: "Fortalece tus capacidades empresariales",
    texto: "Capacitación para mejorar la gestión y competitividad de tu agronegocio.",
    imagen: "/img/paso-capacitacion.jpg",
  },
  {
    titulo: "Construye tu Plan de Mejora de Agronegocios",
    texto:
      "Recibe asistencia técnica especializada para identificar brechas y oportunidades de crecimiento.",
    imagen: "/img/paso-plan.jpg",
  },
  {
    titulo: "Accede a capital semilla",
    texto:
      "Los PMA que superen el proceso de evaluación podrán acceder a cofinanciamiento para implementar inversiones estratégicas.",
    imagen: "/img/paso-capital.jpg",
  },
  {
    titulo: "Implementa tus mejoras con acompañamiento",
    texto: "Recibe asistencia técnica durante la ejecución y seguimiento de tu PMA.",
    imagen: "/img/paso-implementa.jpg",
  },
] as const;

/** oficial — encabezado de la sección de pasos. Estefy, 2026-08-27. */
export const PASOS_CABECERA = {
  antetitulo: "¿Cómo te impulsa EMPRENDER?",
  bajada: "Un proceso de fortalecimiento para llevar tu agronegocio al siguiente nivel.",
} as const;

/**
 * oficial — la tarjeta azul sobre la foto del programa. Estefy, 2026-08-27.
 * Estaba escrita a pelo dentro de Programa.tsx; se trae aquí, que es donde
 * dice la Regla 1 que vive el texto.
 */
export const TARJETA_PMA = {
  titulo: "Tu plan para crecer",
  texto: "Identifica qué mejorar en tu agronegocio y construye una ruta clara para hacerlo.",
} as const;

/** oficial — enfoques entregados por Estefy el 2026-08-27 */
export const ENFOQUES = [
  "Género, inclusión y diversidad social",
  "Participación y oportunidades para jóvenes",
  "Fortalecimiento y desarrollo empresarial",
] as const;

/**
 * oficial — los dos perfiles. Estefy, 2026-08-27; sustituyen a los cuatro
 * anteriores. El texto entregado traía un emoji delante de cada título; aquí
 * se guarda el nombre del icono, porque las convenciones de escritura de este
 * repositorio dicen «cero emojis».
 */
export const BENEFICIARIOS = [
  {
    icono: "factory",
    titulo: "Unidades productivas agroindustriales",
    detalle:
      "Personas naturales o jurídicas con negocios en marcha que transforman y agregan valor a materias primas agropecuarias.",
  },
  {
    icono: "handshake",
    titulo: "Con vinculación a productores primarios",
    detalle:
      "La propuesta debe integrar y beneficiar directamente a un mínimo de 50 productores primarios de los territorios priorizados.",
  },
] as const;

/** oficial — cabecera de la sección. Estefy, 2026-08-27. */
export const TERRITORIO = {
  titulo: "EMPRENDER está presente en 7 provincias",
  bajada:
    "Si tienes una unidad productiva agroindustrial que agrega valor a materias primas y " +
    "desarrollas tu actividad en uno de los territorios priorizados, este programa es para ti.",
  etiquetaMapa: "¿Dónde?",
} as const;

/** oficial — bases § 4.1.1. Perfiles cuya participación es deseable. */
export const PERFILES_DESEABLES = [
  "Mujeres que realicen actividades productivas",
  "Jóvenes entre 18 y 29 años",
  "Personas de pueblos y nacionalidades indígenas del Ecuador",
  "Personas con discapacidad o sus sustitutos registrados",
] as const;

/** oficial — bases § 3.13 (cronograma) y § 4.1 (postulación). Titular y bajada: Estefy, 2026-08-27. */
export const CONVOCATORIA = {
  titulo: "Capital semilla para impulsar tu agronegocio",
  bajada:
    "Convocatoria abierta del 15 de junio al 31 de diciembre de 2026. " +
    "Las postulaciones serán revisadas conforme vayan ingresando.",
  abre: "15 de junio de 2026",
  cierra: "31 de diciembre de 2026",
  abierta: true,
  montoMin: "USD 10.000",
  montoMax: "USD 80.000",
  correoPostulacion: "pemprender@produccion.gob.ec",
  urlFormulario: "https://formshare.alliance.cgiar.org/enketo/FPrfTOHe",
  urlBases: "/documentos/bases-convocatoria-emprender-2026.pdf",
} as const;

/** oficial — bases § 3.10. Las tres reglas de dinero. Redacción: Estefy, 2026-08-27. */
export const REGLAS_DINERO = [
  {
    cifra: "USD 10.000 – 80.000",
    titulo: "Capital semilla",
    detalle:
      "El monto se determina según la capacidad de gestión y ejecución de la unidad productiva, la calidad técnica del PMA y la validación del equipo del proyecto.",
  },
  {
    cifra: "50 %",
    titulo: "Para fortalecer a productores primarios",
    detalle:
      "Al menos el 50 % del capital semilla se destina a inversiones estratégicas dirigidas a los productores primarios vinculados.",
  },
  {
    cifra: "30 %",
    titulo: "Contraparte de la unidad productiva",
    detalle:
      "La contraparte se calcula sobre la inversión total del PMA y puede incluir aportes en efectivo y/o especie, conforme a las Bases.",
  },
] as const;

/** oficial — bases § 3.10 (garantías) y § 3.5 (inclusión de productores primarios) */
/**
 * ▲ Al 2026-08-27 esto NO se está pintando en ninguna parte. La tarjeta
 * «Además de los requisitos» que lo mostraba se retiró de la sección de la
 * convocatoria a petición de Estefy. El texto se conserva porque es oficial y
 * volcarlo costó trabajo; si vuelve a hacer falta, ya está aquí.
 */
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

/**
 * Créditos fotográficos.
 *
 * Todas las fotos son de Wikimedia Commons con licencia que permite uso comercial.
 * CC BY y CC BY-SA **exigen atribución**: por eso aparece en el pie de la página, no
 * solo en un fichero. Detalle completo en docs/referencias/creditos-fotos.md
 *
 * ▲ Son fotos de relleno. Cuando el Ministerio entregue material propio, se cambian
 *   estas cuatro y este bloque desaparece.
 */
export const CREDITOS_FOTOS = [
  {
    archivo: "curso-cacao.jpg",
    titulo: "Cacao Tree (Theobroma cacao) green pods",
    autor: "Bernard DUPONT",
    licencia: "CC BY-SA 2.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Cacao_Tree_(Theobroma_cacao)_green_pods_(17348751253).jpg",
  },
  {
    archivo: "curso-banano.jpg",
    titulo: "Banana plantation, Ecuador",
    autor: "Dave Lonsdale",
    licencia: "CC BY 2.0",
    licenciaUrl: "https://creativecommons.org/licenses/by/2.0/",
    fuente: "https://commons.wikimedia.org/wiki/File:Banana_plantation,_Ecuador.jpg",
  },
  {
    archivo: "curso-arroz.jpg",
    titulo: "Harvesting paddy",
    autor: "Zaheed Sarwer Khan",
    licencia: "CC BY 4.0",
    licenciaUrl: "https://creativecommons.org/licenses/by/4.0/",
    fuente: "https://commons.wikimedia.org/wiki/File:Harvesting_paddy.jpg",
  },
  {
    archivo: "campo.jpg",
    titulo: "Ecuadorian farmers",
    autor: "Kiwa Natural Life",
    licencia: "CC BY-SA 4.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    fuente: "https://commons.wikimedia.org/wiki/File:Ecuadorian_farmers.jpg",
  },
  {
    archivo: "paso-capacitacion.jpg",
    titulo: "Banana Processing",
    autor: "David Brossard",
    licencia: "CC BY-SA 2.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    fuente: "https://commons.wikimedia.org/wiki/File:Banana_Processing.jpg",
  },
  {
    archivo: "paso-plan.jpg",
    titulo: "Cafetal en Vilcabamba, Ecuador",
    autor: "Arabsalam",
    licencia: "CC BY-SA 4.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Coffee_Vilcabamba_Ecuador_1451.jpg",
  },
  {
    archivo: "paso-capital.jpg",
    titulo: "Mercado de ganado, Otavalo",
    autor: "Bernard Gagnon",
    licencia: "CC BY-SA 4.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Livestock_market,_Otavalo_01.jpg",
  },
  {
    archivo: "paso-implementa.jpg",
    titulo: "Café en rama, Vilcabamba, Ecuador",
    autor: "Arabsalam",
    licencia: "CC BY-SA 4.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Coffee_Vilcabamba_Ecuador_1461.jpg",
  },
  {
    archivo: "prov-esmeraldas.jpg",
    titulo: "TURISMO ESMERALDAS",
    autor: "Agencia de Noticias ANDES",
    licencia: "CC BY-SA 2.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:TURISMO_ESMERALDAS_(31678638842).jpg",
  },
  {
    archivo: "prov-manabi.jpg",
    titulo: "Canoa, Manabí, Ecuador",
    autor: "Erik.taylor",
    licencia: "CC BY-SA 3.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Canoa,_Manab%C3%AD,_Ecuador_north.JPG",
  },
  {
    archivo: "prov-santo-domingo.jpg",
    titulo: "Downtown El Carmen",
    autor: "1MadGod",
    licencia: "CC BY-SA 4.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Downtown_El_Carmen.jpg",
  },
  {
    archivo: "prov-carchi.jpg",
    titulo: "Vista desde Julio Andrade, Carchi",
    autor: "Diego Delso",
    licencia: "CC BY-SA 4.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Vista_desde_Julio_Andrade,_Provincia_de_Carchi,_Ecuador,_2015-07-21,_DD_41.JPG",
  },
  {
    archivo: "prov-imbabura.jpg",
    titulo: "Cubilche, Imbabura",
    autor: "Arabsalam",
    licencia: "CC BY-SA 4.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Cubilche_Ecuador_1009.jpg",
  },
  {
    archivo: "prov-sucumbios.jpg",
    titulo: "Laguna, parque nacional de Cuyabeno",
    autor: "Le mashk",
    licencia: "CC BY-SA 3.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Laguna,_parque_nacional_de_Cuyabeno,_Ecuador.jpg",
  },
  {
    archivo: "prov-napo.jpg",
    titulo: "Río Jatunyacu, Napo",
    autor: "amalavida.tv",
    licencia: "CC BY-SA 2.0",
    licenciaUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    fuente:
      "https://commons.wikimedia.org/wiki/File:Ama_la_Vida_-_Flickr_-_R%C3%ADo_Jatunyacu-_Napo_(8227375372).jpg",
  },
] as const;
