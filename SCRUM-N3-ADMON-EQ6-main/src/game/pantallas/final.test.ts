import { expect, test } from 'vitest';
import { nuevaPartida } from '@/game/estado';
import { final } from '@/game/pantallas/final';

test('con 50 puntos: una estrella encendida, "Aprendiz como Beto", sin insignias ni aviso', () => {
  const html = final({ ...nuevaPartida(), pantalla: 'fin', puntos: 50, progreso: [2, 2], rachaMax: 4 });
  expect(html.match(/class="estrella/g)).toHaveLength(3);
  expect(html.match(/class="estrella off"/g)).toHaveLength(2);
  expect(html).toContain('50 <small>de 120 puntos</small>');
  expect(html).toContain('<b>Aprendiz como Beto</b></p>');
  expect(html).not.toContain('class="ch"');
});

test('con 70 puntos y récord nuevo añade el aviso tras el rango', () => {
  const html = final({ ...nuevaPartida(), pantalla: 'fin', puntos: 70, nuevoRecord: true });
  expect(html).toContain('<b>Desarrollador en práctica</b>. Nuevo mejor puntaje');
});

test('en PMBOK el rango máximo, el globo y el enlace cambian de ruta', () => {
  const html = final({ ...nuevaPartida('pmbok'), pantalla: 'fin', puntos: 100 });
  expect(html).toContain('<b>Maestro PMBOK</b>');
  expect(html).toContain('Con un buen plan, ¡hasta Beto entregó a tiempo!');
  expect(html).toContain('/jugar/?ruta=scrum">Jugar Scrum</a>');
});

test('en Scrum el final ofrece jugar PMBOK', () => {
  const html = final({ ...nuevaPartida(), pantalla: 'fin', puntos: 120 });
  expect(html).toContain('<b>Maestro Scrum</b>');
  expect(html).toContain('/jugar/?ruta=pmbok">Jugar PMBOK</a>');
});
