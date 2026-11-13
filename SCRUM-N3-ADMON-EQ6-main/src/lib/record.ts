import type { ClaveRuta } from '@/data/tipos';

/** Scrum conserva la clave anterior a las rutas para no perder récords ya guardados. */
const CLAVES: Record<ClaveRuta, string> = { scrum: 'sprint-best', pmbok: 'sprint-best-pmbok' };

/** Mejor puntaje guardado de la ruta; 0 si no hay o si el almacenamiento falla. */
export function leerRecord(ruta: ClaveRuta = 'scrum'): number {
  try {
    return Number(localStorage.getItem(CLAVES[ruta])) || 0;
  } catch {
    return 0;
  }
}

/** Guarda `puntos` si supera el récord de la ruta y devuelve si lo superó. Un fallo de almacenamiento se ignora. */
export function guardarRecord(puntos: number, ruta: ClaveRuta = 'scrum'): boolean {
  if (puntos <= leerRecord(ruta)) return false;
  try {
    localStorage.setItem(CLAVES[ruta], String(puntos));
  } catch {
    // ponytail: sin almacenamiento el récord no persiste, pero el aviso de la partida sigue valiendo.
  }
  return true;
}
