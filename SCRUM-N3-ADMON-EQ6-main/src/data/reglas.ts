import type { Linea } from '@/data/tipos';

/** Reglas del juego, dichas por los guías; las usan la landing y /como-se-juega. */
export const reglas: Linea[] = [
  {
    personaje: 'inge',
    texto:
      'Elige la ruta Scrum o la ruta PMBOK; las dos están abiertas desde el inicio. Cada ruta recorre tres escenarios de la escuela con 4 retos cada uno: de opción múltiple, de ordenar y de relacionar.',
  },
  {
    personaje: 'lili',
    texto:
      'Empiezas con 3 vidas. Cada acierto suma 10 puntos y cada error quita una vida. Tienes tiempo limitado por reto.',
  },
  {
    personaje: 'tono',
    texto:
      'Si encadenas aciertos haces racha. Termina los tres escenarios de tu ruta con al menos una vida para ganar.',
  },
];
