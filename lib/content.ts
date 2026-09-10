export type Locale = "en" | "es";

export type L<T = string> = Record<Locale, T>;

export type Accent = "lav" | "mint" | "peach" | "sky" | "gold";

/* ---------------------------------------------------------------- UI strings */

export const ui = {
  nav: {
    work: { en: "Work", es: "Proyectos" },
    experience: { en: "Experience", es: "Experiencia" },
    about: { en: "About", es: "Sobre mí" },
    contact: { en: "Contact", es: "Contacto" },
    resume: { en: "Résumé", es: "CV" },
  },
  hero: {
    available: {
      en: "Open to new opportunities",
      es: "Abierto a nuevas oportunidades",
    },
    role: { en: "Software Engineer", es: "Software Engineer" },
    headline: {
      en: "I build products people actually use.",
      es: "Construyo productos que la gente usa de verdad.",
    },
    sub: {
      en: "Software engineer with 5+ years shipping across banking, proptech and e-commerce — from home-banking micro-frontends to AI agent systems and apps live on the App Store.",
      es: "Software engineer con más de 5 años shippeando en banca, proptech y e-commerce — desde micro-frontends de home banking hasta sistemas de agentes de IA y apps publicadas en la App Store.",
    },
    ctaWork: { en: "See my work", es: "Ver proyectos" },
    ctaContact: { en: "Get in touch", es: "Hablemos" },
    location: { en: "Buenos Aires, Argentina", es: "Buenos Aires, Argentina" },
  },
  stats: {
    years: { en: "Years shipping", es: "Años shippeando" },
    projects: { en: "Products built", es: "Productos construidos" },
    stores: { en: "Live app stores", es: "Stores en producción" },
    domains: { en: "Industries", es: "Industrias" },
  },
  work: {
    kicker: { en: "Selected work", es: "Proyectos seleccionados" },
    title: { en: "Things I've built end to end", es: "Cosas que construí de punta a punta" },
    intro: {
      en: "Three products I designed, built and shipped on my own — product, frontend, backend, infra and app-store releases.",
      es: "Tres productos que diseñé, construí y publiqué solo — producto, frontend, backend, infra y publicación en stores.",
    },
    viewCase: { en: "View case study", es: "Ver caso" },
    liveNote: {
      en: "These apps require login. Every case study includes a guided tour so you can see them without an account.",
      es: "Estas apps requieren login. Cada caso incluye un recorrido guiado para que las veas sin cuenta.",
    },
    highlights: { en: "Highlights", es: "Destacados" },
    stack: { en: "Stack", es: "Stack" },
    role: { en: "Role", es: "Rol" },
    status: { en: "Status", es: "Estado" },
    tour: { en: "Guided tour", es: "Recorrido guiado" },
    close: { en: "Close", es: "Cerrar" },
    visitLive: { en: "Visit live site", es: "Ir al sitio" },
    appStore: { en: "App Store", es: "App Store" },
    playStore: { en: "Google Play", es: "Google Play" },
  },
  experience: {
    kicker: { en: "Experience", es: "Experiencia" },
    title: { en: "Where I've worked", es: "Dónde trabajé" },
    present: { en: "Present", es: "Actualidad" },
  },
  skills: {
    kicker: { en: "Toolbox", es: "Herramientas" },
    title: { en: "What I work with", es: "Con qué trabajo" },
  },
  about: {
    kicker: { en: "About", es: "Sobre mí" },
    title: { en: "Law school taught me to argue. Code let me build.", es: "Derecho me enseñó a argumentar. El código me dejó construir." },
    p1: {
      en: "I started in Law School at Universidad de Morón, then pivoted into software at Henry and never looked back. That mix is oddly useful: I read the fine print, I care about the people who use what I build, and I like turning messy real-world problems into clean systems.",
      es: "Arranqué en la carrera de Derecho en la Universidad de Morón, después pegué el volantazo hacia el software en Henry y no miré más atrás. Esa mezcla es rara pero útil: leo la letra chica, me importa la gente que usa lo que construyo y me copa convertir problemas reales y desordenados en sistemas prolijos.",
    },
    p2: {
      en: "For the last five years I've shipped production software — critical features at Santander's home banking, AI agent systems at Pulppo, and my own products on the side. I do my best work on teams where ideas get shared and challenged, and I use Claude AI daily to move faster without cutting corners.",
      es: "En los últimos cinco años shippee software en producción — features críticas en el home banking de Santander, sistemas de agentes de IA en Pulppo y mis propios productos en paralelo. Rindo mejor en equipos donde las ideas se comparten y se discuten, y uso Claude AI todos los días para ir más rápido sin bajar la calidad.",
    },
    funKicker: { en: "Off the clock", es: "Fuera del laburo" },
    fun: {
      en: "Argentine through and through — die-hard fan of the Scaloneta. Half the reason Prode exists.",
      es: "Argentino hasta la médula — fanático de la Scaloneta. La mitad de la razón por la que existe Prode.",
    },
  },
  contact: {
    kicker: { en: "Contact", es: "Contacto" },
    title: { en: "Let's build something", es: "Construyamos algo" },
    sub: {
      en: "Got a role, a project or an idea? I'm one message away.",
      es: "¿Tenés un puesto, un proyecto o una idea? Estoy a un mensaje.",
    },
    emailCta: { en: "Send me an email", es: "Mandame un mail" },
    copied: { en: "Copied!", es: "¡Copiado!" },
  },
  footer: {
    built: {
      en: "Built with Next.js, Tailwind & Framer Motion",
      es: "Hecho con Next.js, Tailwind y Framer Motion",
    },
    rights: { en: "All rights reserved.", es: "Todos los derechos reservados." },
  },
} as const;

/* ------------------------------------------------------------------ Projects */

export type Project = {
  id: string;
  name: string;
  accent: Accent;
  icon?: string;
  year: string;
  tagline: L;
  description: L;
  role: L;
  status: L;
  statusTone: "live" | "beta";
  highlights: L<string[]>;
  stack: string[];
  media?: {
    type: "gif" | "image";
    src: string;
    caption: L;
  };
  links?: { label: L; href: string; kind: "live" | "play" | "apple" | "repo" }[];
};

export const projects: Project[] = [
  {
    id: "data-jury",
    name: "Data Jury",
    accent: "sky",
    icon: "/datajury-icon.webp",
    year: "2024 — 2025",
    tagline: {
      en: "The app that lets lawyers rate the courts they work with.",
      es: "La app que deja a los abogados calificar los juzgados donde litigan.",
    },
    description: {
      en: "A web + mobile platform where registered lawyers evaluate and rank courts and judicial offices of Argentina's judiciary. Sole developer across product, frontend, backend and both native apps — live on Google Play and the App Store.",
      es: "Una plataforma web + móvil donde abogados matriculados evalúan y rankean juzgados y dependencias del Poder Judicial argentino. Desarrollador único: producto, frontend, backend y ambas apps nativas — publicada en Google Play y App Store.",
    },
    role: {
      en: "Sole developer — product, frontend, backend, mobile & store releases",
      es: "Desarrollador único — producto, frontend, backend, mobile y publicación en stores",
    },
    status: { en: "Live in production", es: "En producción" },
    statusTone: "live",
    highlights: {
      en: [
        "Professional-license verification on sign-up (email/password + Google)",
        "Explore courts by jurisdiction with geolocation, ratings & Recharts analytics",
        "Automated import & scraping of official Poder Judicial (PJN) data via Puppeteer",
        "Single Next.js codebase shipped to iOS & Android with Capacitor",
        "CI/CD mobile builds through Codemagic; API & web on Vercel",
      ],
      es: [
        "Verificación de matrícula profesional en el registro (email/contraseña + Google)",
        "Exploración de juzgados por fuero con geolocalización, ratings y analytics con Recharts",
        "Importación y scraping automático de datos del Poder Judicial (PJN) con Puppeteer",
        "Un solo código Next.js publicado en iOS y Android con Capacitor",
        "Builds móviles con CI/CD en Codemagic; API y web en Vercel",
      ],
    },
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind",
      "Framer Motion",
      "Recharts",
      "Capacitor",
      "Express 5",
      "Prisma 6",
      "PostgreSQL",
      "Passport / JWT",
      "Puppeteer",
    ],
    media: {
      type: "image",
      src: "/datajury-icon.webp",
      caption: {
        en: "Data Jury — com.datajury.app, live on both stores.",
        es: "Data Jury — com.datajury.app, publicada en ambas stores.",
      },
    },
    links: [
      { label: { en: "Visit the web app", es: "Ir a la web" }, href: "https://juzgados-front.vercel.app/", kind: "live" },
      { label: { en: "Google Play", es: "Google Play" }, href: "https://play.google.com/store/search?q=data%20jury&c=apps", kind: "play" },
      { label: { en: "App Store", es: "App Store" }, href: "https://apps.apple.com/search?term=data%20jury", kind: "apple" },
    ],
  },
  {
    id: "simple-ai",
    name: "Simple-AI",
    accent: "mint",
    year: "2025 — Present",
    tagline: {
      en: "AI agents that answer a business's WhatsApp customers automatically.",
      es: "Agentes de IA que responden a los clientes de WhatsApp de un negocio, solos.",
    },
    description: {
      en: "A SaaS I founded that puts an AI sales-and-support agent on any e-commerce's WhatsApp. Messages flow through a serverless AWS pipeline into a 4-step LLM agent that understands intent, finds products and replies — all managed from a real-time dashboard.",
      es: "Un SaaS que fundé y que pone un agente de IA de ventas y soporte en el WhatsApp de cualquier e-commerce. Los mensajes pasan por un pipeline serverless en AWS hacia un agente LLM de 4 pasos que entiende la intención, busca productos y responde — todo desde un dashboard en tiempo real.",
    },
    role: {
      en: "Founder & solo engineer — product, cloud infra, agent pipeline, dashboard",
      es: "Fundador y único ingeniero — producto, infra cloud, pipeline del agente, dashboard",
    },
    status: { en: "In production", es: "En producción" },
    statusTone: "live",
    highlights: {
      en: [
        "WhatsApp Cloud API → API Gateway → SQS → Lambda processor, fully event-driven",
        "4-step AI pipeline: intent (13 categories) → keywords → product search → reply",
        "Product catalog auto-built by scraping the client's site (Firecrawl + OpenAI extraction)",
        "DynamoDB single-table design with 4 GSIs; read receipts & delivery/read tracking",
        "AWS CDK infra (Lambda, DynamoDB, SQS, S3, Secrets Manager) across dev & prod",
      ],
      es: [
        "WhatsApp Cloud API → API Gateway → SQS → Lambda processor, 100% event-driven",
        "Pipeline de IA de 4 pasos: intención (13 categorías) → keywords → búsqueda → respuesta",
        "Catálogo autoarmado scrapeando el sitio del cliente (Firecrawl + extracción con OpenAI)",
        "DynamoDB single-table con 4 GSIs; read receipts y tracking de entregado/leído",
        "Infra con AWS CDK (Lambda, DynamoDB, SQS, S3, Secrets Manager) en dev y prod",
      ],
    },
    stack: [
      "Next.js 14",
      "TypeScript",
      "AWS Lambda",
      "API Gateway",
      "AWS CDK",
      "DynamoDB",
      "SQS",
      "EventBridge",
      "OpenAI",
      "NextAuth",
      "MercadoPago",
    ],
    media: {
      type: "image",
      src: "",
      caption: {
        en: "Simple-AI — AI agents for WhatsApp, Instagram & Facebook.",
        es: "Simple-AI — agentes de IA para WhatsApp, Instagram y Facebook.",
      },
    },
    links: [
      {
        label: { en: "Visit the landing", es: "Ir a la landing" },
        href: "https://simple-ai.co/",
        kind: "live",
      },
    ],
  },
  {
    id: "prode",
    name: "Prode Vamo Arriba",
    accent: "peach",
    year: "2025",
    tagline: {
      en: "A World Cup 2026 prediction game for me and my friends.",
      es: "Un prode del Mundial 2026 para mí y mis amigos.",
    },
    description: {
      en: "A realtime prediction game for the 2026 World Cup. Log in with Google, predict every match, and watch the standings update live as results sync automatically from a football data API every minute.",
      es: "Un prode en tiempo real para el Mundial 2026. Entrás con Google, predecís cada partido y ves la tabla actualizarse en vivo mientras los resultados se sincronizan solos desde una API de fútbol cada minuto.",
    },
    role: {
      en: "Solo builder — full-stack, realtime & data sync",
      es: "Builder solo — full-stack, realtime y sync de datos",
    },
    status: { en: "Live", es: "En vivo" },
    statusTone: "live",
    highlights: {
      en: [
        "Google login and per-user predictions with Supabase Auth",
        "Scoring engine: +3 for an exact score, +1 for the right winner",
        "Live standings powered by Supabase Realtime",
        "Results auto-sync every minute from API-Football via a cron job",
      ],
      es: [
        "Login con Google y predicciones por usuario con Supabase Auth",
        "Motor de scoring: +3 por resultado exacto, +1 por acertar el ganador",
        "Tabla de posiciones en vivo con Supabase Realtime",
        "Resultados que se sincronizan solos cada minuto desde API-Football por cron",
      ],
    },
    stack: [
      "Next.js",
      "Supabase",
      "Realtime",
      "Tailwind",
      "API-Football",
      "Vercel",
    ],
    links: [
      { label: { en: "Visit live site", es: "Ir al sitio" }, href: "https://prode-vamo-arriba.vercel.app", kind: "live" },
    ],
  },
];

/* ---------------------------------------------------------------- Experience */

export type Job = {
  company: string;
  meta: L;
  roles: { title: L; period: L; body: L; bullets?: L<string[]> }[];
  accent: Accent;
  logo?: string;
};

export const experience: Job[] = [
  {
    company: "Pulppo",
    accent: "lav",
    logo: "/pulppo-logo.jpeg",
    meta: { en: "Real-estate technology platform (Habi)", es: "Plataforma de tecnología inmobiliaria (Habi)" },
    roles: [
      {
        title: { en: "Software Engineer", es: "Software Engineer" },
        period: { en: "Mar 2026 — Present", es: "Mar 2026 — Actualidad" },
        body: {
          en: "Build internal tools and AI agent systems for the platform, owning the agent layer of Coach AI — an AI coaching product that surfaces daily personalized insights to real-estate brokers.",
          es: "Construyo herramientas internas y sistemas de agentes de IA para la plataforma, a cargo de la capa de agentes de Coach AI — un producto de coaching con IA que entrega insights diarios personalizados a los brokers inmobiliarios.",
        },
        bullets: {
          en: [
            "Designed Coach AI's agent layer as a nested router hierarchy (orchestrator → performance → inventory) over a shared state schema, with deterministic routing and broker identity scoped through graph state.",
            "Built the metric tooling behind it: 46 inventory metrics grouped into 6 tools, with EWMA smoothing and regression-slope trends driving targeted broker feedback.",
            "Migrated the 1·5·10 operations dashboard from Python/Streamlit to Next.js with live MongoDB data, deployed on Vercel with Google login.",
            "Full-stack work across UI, API endpoints, Git/Slack integrations and the analytics layer; daily use of Claude AI for pair-programming, code generation and refactors.",
          ],
          es: [
            "Diseñé la capa de agentes de Coach AI como una jerarquía de routers anidados (orquestador → performance → inventario) sobre un state schema compartido, con ruteo determinista e identidad del broker acotada por el estado del grafo.",
            "Construí el tooling de métricas detrás: 46 métricas de inventario agrupadas en 6 tools, con suavizado EWMA y tendencias por pendiente de regresión para feedback dirigido a cada broker.",
            "Migré el dashboard de operaciones 1·5·10 de Python/Streamlit a Next.js con datos en vivo de MongoDB, deployado en Vercel con login de Google.",
            "Trabajo full-stack en UI, endpoints de API, integraciones con Git/Slack y la capa de analytics; uso diario de Claude AI para pair-programming, generación de código y refactors.",
          ],
        },
      },
    ],
  },
  {
    company: "Santander Tecnología",
    accent: "peach",
    logo: "/santander-logo.png",
    meta: { en: "One of the largest banks in the world", es: "Uno de los bancos más grandes del mundo" },
    roles: [
      {
        title: { en: "SSR Software Engineer", es: "SSR Software Engineer" },
        period: { en: "Jun 2023 — Mar 2026", es: "Jun 2023 — Mar 2026" },
        body: {
          en: "Developed and maintained critical features for the bank's customer application with Next.js, React, Node.js, CSS and Flame (Santander's UI system). Led two micro-frontends for the home-banking platform.",
          es: "Desarrollé y mantuve features críticas para la app de clientes del banco con Next.js, React, Node.js, CSS y Flame (el sistema de UI de Santander). Lideré dos micro-frontends de la plataforma de home banking.",
        },
        bullets: {
          en: [
            "A module for managing user notification preferences, consuming RESTful APIs, built with Next.js and React on a Node.js + Webpack workflow.",
            "A feature enabling users to update personal information such as email and phone number.",
          ],
          es: [
            "Un módulo para gestionar las preferencias de notificación del usuario, consumiendo APIs REST, con Next.js y React sobre un workflow de Node.js + Webpack.",
            "Una funcionalidad para que los usuarios actualicen datos personales como email y teléfono.",
          ],
        },
      },
      {
        title: { en: "Jr. Software Engineer", es: "Jr. Software Engineer" },
        period: { en: "Apr 2022 — Jun 2023", es: "Abr 2022 — Jun 2023" },
        body: {
          en: "Developed an internal back-office system empowering employees to create and manage emails, SMS and home-banking notifications, abstracting HTML complexity to streamline communication.",
          es: "Desarrollé un sistema interno de back-office para que los empleados crearan y gestionaran emails, SMS y notificaciones del home banking, abstrayendo la complejidad del HTML para agilizar la comunicación.",
        },
      },
    ],
  },
];

/* -------------------------------------------------------------------- Skills */

export type SkillGroup = { label: L; items: string[]; accent: Accent };

export const skills: SkillGroup[] = [
  {
    label: { en: "Languages", es: "Lenguajes" },
    items: ["JavaScript", "TypeScript", "HTML", "CSS"],
    accent: "lav",
  },
  {
    label: { en: "Frontend", es: "Frontend" },
    items: ["React", "React Native", "Next.js", "Redux"],
    accent: "sky",
  },
  {
    label: { en: "Backend", es: "Backend" },
    items: ["Node.js", "Express", "REST APIs", "Ajax"],
    accent: "mint",
  },
  {
    label: { en: "Data", es: "Datos" },
    items: ["PostgreSQL", "Sequelize", "MongoDB", "Mongoose", "Supabase", "Pinecone"],
    accent: "peach",
  },
  {
    label: { en: "AI", es: "IA" },
    items: ["LLM agent systems", "Claude AI", "AI-assisted development"],
    accent: "gold",
  },
  {
    label: { en: "Cloud", es: "Cloud" },
    items: ["GCP", "GKE", "AWS", "Vercel"],
    accent: "lav",
  },
];

export const marqueeStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "AWS",
  "Supabase",
  "PostgreSQL",
  "DynamoDB",
  "React Native",
  "Tailwind",
  "OpenAI",
  "Claude AI",
  "GCP",
  "Prisma",
  "Framer Motion",
];

export const contactInfo = {
  email: "jaimerandle18@gmail.com",
  phone: "+54 11 6455-0358",
  github: "https://github.com/jaimerandle",
  githubLabel: "github.com/jaimerandle",
  linkedin: "https://linkedin.com/in/jaimerandlee",
  linkedinLabel: "linkedin.com/in/jaimerandlee",
  resume: "/Jaime_Randle_CV.pdf",
};
