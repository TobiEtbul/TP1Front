/** Forma de una serie ya normalizada, tal como la usan los componentes. */
export interface Serie {
  id: number;
  nombre: string;
  generos: string[];
  puntaje: number;
  estado: string;
  anio: number | null;
  duracion: number | null;
  idioma: string;
  sinopsis: string;
  imagen: string;
  url: string;
}
