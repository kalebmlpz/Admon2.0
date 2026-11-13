import { expect, test } from 'vitest';
import { nuevaPartida, type Partida } from '@/game/estado';
import { resultado } from '@/game/pantallas/resultado';

const conPuntos = (p: Partida, pts: number): Partida => ({ ...p, pantalla: 'resultado', puntosEscenario: [pts, 0, 0] });

test('el mensaje del resultado depende de la ruta', () => {
  expect(resultado(conPuntos(nuevaPartida(), 40))).toContain('Así se avanza en Scrum');
  expect(resultado(conPuntos(nuevaPartida(), 30))).toContain('Cada Sprint deja algo que mejorar.');
  expect(resultado(conPuntos(nuevaPartida('pmbok'), 40))).toContain('Así se dirige un proyecto');
  expect(resultado(conPuntos(nuevaPartida('pmbok'), 20))).toContain('Cada proyecto deja lecciones aprendidas.');
});
