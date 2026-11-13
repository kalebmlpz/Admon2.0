import { escenarios } from '@/data/escenarios';
import { escenariosPmbok } from '@/data/pmbok';
import type { ClaveRuta, Ruta } from '@/data/tipos';

export const rutas: Record<ClaveRuta, Ruta> = {
  scrum: {
    clave: 'scrum',
    nombre: 'Scrum',
    escenarios,
    maestro: 'Maestro Scrum',
    perfecto: '¡Perfecto! Así se avanza en Scrum: una meta pequeña a la vez.',
    bien: 'Bien hecho. Cada Sprint deja algo que mejorar.',
    cierre: 'Valió la pena el esfuerzo. Con Scrum, ¡hasta Beto terminó a tiempo!',
  },
  pmbok: {
    clave: 'pmbok',
    nombre: 'PMBOK',
    escenarios: escenariosPmbok,
    maestro: 'Maestro PMBOK',
    perfecto: '¡Perfecto! Así se dirige un proyecto: con un plan claro y controlando el avance.',
    bien: 'Bien hecho. Cada proyecto deja lecciones aprendidas.',
    cierre: 'Valió la pena el esfuerzo. Con un buen plan, ¡hasta Beto entregó a tiempo!',
  },
};

/** `pmbok` elige PMBOK; cualquier otro valor, o ninguno, juega Scrum. */
export const claveRuta = (valor: string | null | undefined): ClaveRuta => (valor === 'pmbok' ? 'pmbok' : 'scrum');
