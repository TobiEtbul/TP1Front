# 🎬 Seriteca — Catálogo de series

Página web estática hecha con **Astro** para la actividad diagnóstico de Frontend (TP 1).

Es un catálogo de las **24 series mejor puntuadas** de [TVmaze](https://www.tvmaze.com/api),
con buscador, filtros, estadísticas y modo oscuro. Los datos se piden a la API **cuando se
compila el sitio**, así que la página que se publica es HTML puro: no hay servidor detrás ni
espera de carga al entrar. Además, desde el navegador se puede consultar la API **en vivo**
para buscar cualquier serie que no esté en el catálogo.

---

## 📑 Secciones

| Sección | Qué tiene |
| :--- | :--- |
| **Inicio** (hero) | Presentación, accesos rápidos y decoración animada con CSS |
| **Catálogo** | Buscador, filtro por género, ordenamiento y grilla de tarjetas + búsqueda en vivo contra la API |
| **Estadísticas** | Tarjetas de métricas con números animados y un gráfico de barras de géneros |
| **Sobre el proyecto** | Explicación, listado de funcionalidades y herramientas usadas |

---

## ✨ Funcionalidades

**Requisitos mínimos**

- ✅ Una página principal (`/`) con **4 secciones**
- ✅ **Responsive**: grillas fluidas, tipografía con `clamp()`, menú hamburguesa en mobile
- ✅ **JavaScript**: eventos, manipulación del DOM, `localStorage` y `fetch`

**Extras**

- 🧩 **Componentes reutilizables**: `SerieCard`, `StatCard`, `Header`, `Footer`, etc.
- 🌗 **Modo claro / oscuro** con toggle, que respeta la preferencia del sistema y se recuerda
  entre visitas con `localStorage` (sin parpadeo al cargar)
- 🔎 **Buscador en vivo** que filtra el catálogo mientras se escribe
- 🏷️ **Filtro por género** y **ordenamiento** por puntaje, nombre o año
- 🌐 **Fetch a una API externa** (TVmaze) desde el navegador, con estados de *cargando*,
  *sin resultados* y *error*
- 🎞️ **Animaciones**: aparición al hacer scroll (`IntersectionObserver`), contadores que
  cuentan hasta su valor, barras que se llenan y transiciones en hover
- ♿ **Accesibilidad**: HTML semántico, `aria-*` en los controles interactivos, foco visible,
  link "saltar al contenido" y respeto por `prefers-reduced-motion`

---

## 🛠️ Herramientas usadas

| Herramienta | Para qué |
| :--- | :--- |
| [**Astro 6**](https://astro.build) | Framework del sitio. Genera HTML estático y permite dividir la página en componentes `.astro` |
| **HTML semántico** | `header`, `nav`, `main`, `section`, `article`, `figure`, `footer` |
| **CSS moderno** (sin framework) | Custom properties para los temas, Grid, Flexbox, `clamp()`, `color-mix()`, media queries y `@keyframes` |
| **JavaScript (ES Modules)** | Toda la interacción: filtros, orden, tema, menú y `fetch` |
| **TypeScript** | Tipado de los datos de las series (`src/data/tipos.ts`) |
| [**TVmaze API**](https://www.tvmaze.com/api) | Origen de los datos. Gratuita y sin API key |
| **Git + GitHub** | Control de versiones |

> No se usó ninguna librería de CSS (Tailwind, Bootstrap) a propósito: la idea era resolver
> el diseño y el responsive con CSS nativo.

---

## 📁 Estructura del proyecto

```text
TP1Front/
├── public/                  # Archivos estáticos (favicon)
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.astro     # Navegación + toggle de tema
│   │   ├── Hero.astro       # Sección de presentación
│   │   ├── Catalogo.astro   # Buscador, filtros, grilla y fetch a la API
│   │   ├── SerieCard.astro  # Tarjeta de una serie
│   │   ├── Estadisticas.astro
│   │   ├── StatCard.astro   # Tarjeta de métrica
│   │   ├── Sobre.astro
│   │   └── Footer.astro
│   ├── data/
│   │   ├── series.ts        # Fetch a TVmaze + cálculo de estadísticas
│   │   ├── series.json      # Copia local, por si no hay internet al compilar
│   │   └── tipos.ts         # Tipos de TypeScript
│   ├── layouts/
│   │   └── Layout.astro     # <head>, header, footer y scripts comunes
│   ├── pages/
│   │   └── index.astro      # Página principal
│   └── styles/
│       ├── global.css       # Reset, variables de tema y utilidades
│       └── tarjeta.css      # Estilos de la tarjeta (globales, ver nota abajo)
├── astro.config.mjs
├── netlify.toml             # Configuración para el deploy
└── package.json
```

> **Nota:** los estilos de la tarjeta están en un CSS global y no dentro del componente
> porque las tarjetas de la búsqueda en la API se crean desde JavaScript, y los estilos
> *scoped* de Astro no alcanzan a los elementos creados después.

---

## 🚀 Cómo ejecutarlo

Requisitos: **Node.js 22.12 o superior**.

```bash
# 1. Clonar el repositorio
git clone https://github.com/TobiEtbul/TP1Front.git
cd TP1Front

# 2. Instalar las dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

Después abrir 👉 **http://localhost:4321**

### Comandos disponibles

| Comando | Qué hace |
| :--- | :--- |
| `npm install` | Instala las dependencias |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Compila el sitio a la carpeta `dist/` |
| `npm run preview` | Previsualiza el sitio ya compilado |

---

## ☁️ Deploy

El sitio es 100% estático, así que se puede publicar en cualquier hosting.

**Netlify** — el archivo `netlify.toml` ya tiene la configuración:

- Build command: `npm run build`
- Publish directory: `dist`

**Vercel** — detecta Astro automáticamente; no hace falta configurar nada.

---

## 👤 Autor

**Tobías Etbul** — TP 1, actividad diagnóstico de Frontend.
