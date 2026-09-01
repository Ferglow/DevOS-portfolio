import type { Experience, Profile, Project, Skill, Education } from './types'

export const profile: Profile = {
  name: 'Fernando Andrés',
  role: 'Desarrollador Frontend',
  tagline: 'Ingeniero en Informática convirtiendo ideas en interfaces web fluidas, accesibles y con personalidad.',
  summary: [
    'Ingeniero en Informática con 2 años de experiencia en el desarrollo de soluciones tecnológicas innovadoras y escalables. Actualmente enfocado en desarrollo frontend con React, TypeScript y diseño de interfaces.',
    'Me formé de forma autodidacta y a través de proyectos personales, lo que me dio una visión integral: sé consumir y construir APIs REST, conectar bases de datos y crear interfaces modernas y responsivas.',
    'Creo que el código bien hecho es una forma de arte: cada proyecto es una oportunidad para combinar lógica sólida con una estética cuidada.',
  ],
  locatedIn: 'Mexico',
  email: 'fernando.a.h@outlook.com',
  avatarEmoji: '👨‍💻',
  socials: {
    github: 'https://github.com/Ferglow',
    linkedin: 'https://www.linkedin.com/in/ferdinand-andres/',
    blog: 'https://stalwart-alpaca-1f0da4.netlify.app/',
  },
}

export const skills: Skill[] = [
  { name: 'React', category: 'frontend', level: 5, icon: '⚛️' },
  { name: 'TypeScript', category: 'frontend', level: 4, icon: '🔷' },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 5, icon: '🟨' },
  { name: 'HTML5', category: 'frontend', level: 5, icon: '🧱' },
  { name: 'CSS3 / Flexbox / Grid', category: 'styling', level: 4, icon: '🎨' },
  { name: 'Tailwind CSS', category: 'styling', level: 4, icon: '🌊' },
  { name: 'Framer Motion', category: 'styling', level: 3, icon: '✨' },
  { name: 'Astro', category: 'frontend', level: 3, icon: '🚀' },
  { name: 'Vite', category: 'tooling', level: 4, icon: '⚡' },
  { name: 'Git / GitHub', category: 'tooling', level: 4, icon: '🌿' },
  { name: 'NPM', category: 'tooling', level: 4, icon: '📦' },
  { name: 'Node.js / Express', category: 'tooling', level: 3, icon: '🟢' },
  { name: 'MySQL', category: 'other', level: 4, icon: '🐬' },
  { name: 'REST APIs', category: 'other', level: 4, icon: '🔌' },
  { name: 'Zustand', category: 'other', level: 3, icon: '🐻' },
  { name: 'Java / Spring Boot', category: 'other', level: 3, icon: '☕' },
  { name: 'Python', category: 'other', level: 3, icon: '🐍' },
]

export const projects: Project[] = [
  {
    id: 'devos',
    title: 'DevOS Portfolio',
    description: 'Portfolio tipo sistema operativo: ventanas arrastrables, terminal interactiva y escritorio navegable.',
    longDescription:
      'Un portfolio que se comporta como un sistema operativo: ventanas arrastrables, terminal interactiva y escritorio navegable. Construido desde cero para demostrar arquitectura frontend compleja, refactorizado y con arquitectura data-driven.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Zustand', 'Framer Motion'],
    emoji: '🖥️',
    accent: '#a78bfa',
    highlights: [
      'Window manager con drag & drop y z-index',
      'Terminal interactiva con comandos',
      'Arquitectura data-driven',
      '100% responsive y accesible',
    ],
    category: 'dev',
    year: '2026',
    repoUrl: 'https://github.com/Ferglow/DevOS-portfolio',
  },
  {
    id: 'dulceantojo',
    title: 'Dulce Antojo',
    description: 'Sistema completo de reservaciones para restaurante con panel de administración y confirmación por WhatsApp.',
    longDescription:
      'Sistema full-stack de reservaciones para un restaurante. Incluye página de inicio, reservas en línea, confirmación directa por WhatsApp, e información de contacto. El panel de administración permite gestionar el menú, las reservaciones y la configuración del restaurante, con estadísticas básicas.',
    stack: ['JavaScript', 'Node.js', 'Frontend', 'Netlify'],
    emoji: '🍰',
    accent: '#f472b6',
    highlights: [
      'Sistema full-stack (frontend + backend)',
      'Panel de administración completo',
      'Confirmación de reservas por WhatsApp',
      'Desplegado en Netlify',
    ],
    category: 'dev',
    year: '2026',
    repoUrl: 'https://github.com/Ferglow/dulceantojo',
  },
  {
    id: 'innovate-for-impact',
    title: 'Innovate for Impact',
    description: 'Rediseño de un sitio web corporativo con Astro y CMS desacoplado (Decap CMS).',
    longDescription:
      'Rediseño del sitio "Innovate for Impact" construido con Astro y el CMS desacoplado Decap. Un proyecto orientado a contenido editorial con buenas prácticas de generación estática, SEO y mantenibilidad.',
    stack: ['Astro', 'Decap CMS', 'TypeScript', 'Netlify'],
    emoji: '🌍',
    accent: '#34d399',
    highlights: [
      'Generación de sitios estáticos con Astro',
      'CMS desacoplado con Decap',
      'Contenido editorial y mantenible',
      'Configuración de despliegue en Netlify',
    ],
    category: 'dev',
    year: '2026',
    repoUrl: 'https://github.com/Ferglow/innovate-for-impact',
  },
  {
    id: 'agenda-contactos',
    title: 'Agenda de Contactos',
    description: 'API REST + interfaz web con Spring Boot y MySQL para gestión de contactos (CRUD completo).',
    longDescription:
      'Proyecto full-stack con Spring Boot y MySQL que implementa una agenda de contactos. Expone una API REST (Spring Data JPA) consumida por un frontend en HTML/CSS/JS con Fetch API. Arquitectura por capas (model, repository, service, controller).',
    stack: ['Java', 'Spring Boot', 'MySQL', 'JPA', 'JavaScript', 'REST'],
    emoji: '📇',
    accent: '#fbbf24',
    highlights: [
      'API REST con Spring Boot',
      'Persistencia con Spring Data JPA',
      'Frontend que consume la API',
      'CRUD completo de contactos',
    ],
    category: 'util',
    year: '2026',
    repoUrl: 'https://github.com/Ferglow/agenda-contactos',
    caseStudy: {
      problem:
        'Necesitaba demostrar manejo del ciclo completo de desarrollo backend: modelado de datos, API REST y consumo desde el frontend.',
      solution:
        'Implementé una agenda de contactos con Spring Boot y MySQL, exponiendo una API REST con Spring Data JPA y una arquitectura por capas (model, repository, service, controller). El frontend consume la API con Fetch API.',
      result:
        'Un proyecto full-stack completo y funcional que muestra dominio de Java, Spring Boot y persistencia relacional, con CRUD operativo de contactos.',
      challenge:
        'Mantener una arquitectura limpia y por capas que separe responsabilidades entre el acceso a datos y la lógica de negocio.',
      keyDecisions: [
        'Spring Data JPA para la capa de persistencia',
        'Arquitectura por capas para escalar el proyecto',
        'Frontend sencillo que demuestra consumo real de la API',
      ],
    },
  },
  {
    id: 'estudiantes',
    title: 'Gestión de Estudiantes',
    description: 'CRUD full-stack de estudiantes con Java, Spring Boot y MySQL: matrícula, consulta y administración de registros.',
    longDescription:
      'Aplicación web full-stack para la gestión de estudiantes. Implementa operaciones CRUD completas (crear, leer, actualizar, eliminar) sobre una base de datos MySQL, expuestas mediante una API REST construida con Spring Boot y consumidas desde una interfaz web sencilla.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'JPA', 'REST'],
    emoji: '🎓',
    accent: '#38bdf8',
    highlights: [
      'API REST con Spring Boot',
      'CRUD completo de estudiantes',
      'Persistencia con MySQL y JPA',
      'Arquitectura por capas',
    ],
    category: 'util',
    year: '2026',
    repoUrl: 'https://github.com/Ferglow/estudiantes',
  },
  {
    id: 'inventario',
    title: 'Sistema de Inventario',
    description: 'Gestión de inventario y stock con Java, Spring Boot y MySQL: control de productos y existencias.',
    longDescription:
      'Sistema full-stack para el control de inventario de productos. Permite registrar y administrar artículos, actualizar existencias y consultar el estado del stock en tiempo real, mediante una API REST en Spring Boot con persistencia en MySQL.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'JPA', 'REST'],
    emoji: '📦',
    accent: '#34d399',
    highlights: [
      'Control de stock y existencias',
      'API REST con Spring Boot',
      'Persistencia en MySQL',
      'CRUD de productos',
    ],
    category: 'util',
    year: '2026',
    repoUrl: 'https://github.com/Ferglow/inventario',
  },
  {
    id: 'mysql-recommender',
    title: 'MySQL Recommender Engine',
    description: 'Motor de recomendaciones híbrido con MySQL 8: colaborativo, contenido y Jaccard - API + Demo React.',
    longDescription:
      'Motor de recomendaciones e-commerce con MySQL 8 como protagonista. Implementa 4 estrategias (popular, colaborativo por co-ocurrencia, contenido y híbrido Jaccard) con CTEs, Window Functions, JSON y procedimientos almacenados. Backend Node/TS + Express y frontend React demo dockerizado.',
    stack: ['MySQL 8', 'Node.js', 'TypeScript', 'Express', 'React', 'Docker'],
    emoji: '🛒',
    accent: '#f59e0b',
    highlights: [
      '4 algoritmos: popular, colaborativo, contenido, híbrido',
      'SQL avanzado: CTEs, Window Functions, SP, vistas',
      'API REST documentada + fallback cold-start',
      'Demo React + Docker Compose',
    ],
    category: 'dev',
    year: '2026',
    repoUrl: 'https://github.com/Ferglow/MYSQL-RECOMMENDER',
  },
]

export const experience: Experience[] = [
  {
    role: 'Desarrollador Frontend (Autodidacta)',
    company: 'Proyectos personales',
    period: '2024 — Presente',
    description:
      'Formación autodidacta y desarrollo de aplicaciones web propias: portfolios, sistemas de reservaciones y CRUDs full-stack. Consumo de APIs REST, diseño responsivo y entrega de código de calidad.',
    tags: ['React', 'TypeScript', 'Node.js', 'Spring Boot', 'Tailwind'],
  },
]

export const education: Education[] = [
  {
    degree: 'Ingeniería en Informática',
    institution: 'Egresado',
    period: 'Egresado',
    description:
      'Titulado en Ingeniería en Informática. Formación en programación, bases de datos, ingeniería de software y desarrollo de sistemas.',
  },
  {
    degree: 'Formación continua en desarrollo web',
    institution: 'Autodidacta / Cursos',
    period: 'Continuo',
    description:
      'Aprendizaje constante de frontend moderno (React, TypeScript), APIs REST, y herramientas de construcción como Vite y Astro.',
  },
]
