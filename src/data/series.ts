import type { Serie } from "./tipos";
import respaldo from "./series.json";

const API = "https://api.tvmaze.com/shows?page=0";
const CANTIDAD = 24;

/** Pasa un show crudo de TVmaze al formato que usa el sitio. */
function normalizar(show: any): Serie {
  return {
    id: show.id,
    nombre: show.name,
    generos: show.genres,
    puntaje: show.rating.average,
    estado: show.status,
    anio: show.premiered ? Number(show.premiered.slice(0, 4)) : null,
    duracion: show.averageRuntime,
    idioma: show.language,
    sinopsis: (show.summary ?? "").replace(/<[^>]+>/g, "").trim(),
    imagen: show.image.medium,
    url: show.url,
  };
}

/**
 * Trae las series mejor puntuadas.
 *
 * El fetch corre en el build (no en el navegador), así que el HTML final ya sale
 * con todas las tarjetas escritas: la página es 100% estática.
 * Si no hay internet al compilar, usa la copia local de `series.json`.
 */
export async function obtenerSeries(): Promise<Serie[]> {
  try {
    const respuesta = await fetch(API);
    if (!respuesta.ok) throw new Error(`TVmaze respondió ${respuesta.status}`);

    const shows: any[] = await respuesta.json();

    return shows
      .filter((show) => show.image?.medium && show.rating?.average && show.genres.length > 0)
      .sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, CANTIDAD)
      .map(normalizar);
  } catch (error) {
    console.warn("[series] No se pudo consultar la API, uso los datos locales.", error);
    return respaldo as Serie[];
  }
}

/** Lista de géneros únicos, ordenada alfabéticamente (para el filtro). */
export function obtenerGeneros(series: Serie[]): string[] {
  const generos = new Set(series.flatMap((serie) => serie.generos));
  return [...generos].sort((a, b) => a.localeCompare(b));
}

/** Métricas del catálogo que se muestran en la sección de estadísticas. */
export function calcularEstadisticas(series: Serie[]) {
  const puntajes = series.map((serie) => serie.puntaje);
  const promedio = puntajes.reduce((suma, valor) => suma + valor, 0) / series.length;
  const mejor = series.reduce((a, b) => (a.puntaje >= b.puntaje ? a : b));
  const enEmision = series.filter((serie) => serie.estado === "Running").length;

  // Cantidad de series por género, de mayor a menor (para el gráfico de barras)
  const conteo = new Map<string, number>();
  for (const serie of series) {
    for (const genero of serie.generos) {
      conteo.set(genero, (conteo.get(genero) ?? 0) + 1);
    }
  }

  const porGenero = [...conteo.entries()]
    .map(([genero, cantidad]) => ({ genero, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 6);

  return {
    total: series.length,
    promedio: Number(promedio.toFixed(2)),
    mejor,
    enEmision,
    generosDistintos: new Set(series.flatMap((serie) => serie.generos)).size,
    porGenero,
    maximoGenero: porGenero[0]?.cantidad ?? 1,
  };
}
