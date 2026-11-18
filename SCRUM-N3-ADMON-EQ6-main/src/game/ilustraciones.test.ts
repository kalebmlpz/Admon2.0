import { describe, expect, it } from 'vitest';
import { rutas } from '@/data/rutas';
import { ilustracionReto } from '@/game/ilustraciones';
import { guiaDelReto, nuevaPartida } from '@/game/estado';
import { reto as pantallaReto } from '@/game/pantallas/reto';

describe('escenas relacionadas con los retos', () => {
  for (const ruta of Object.values(rutas)) {
    ruta.escenarios.forEach((escenario, nivel) => {
      escenario.retos.forEach((reto, indice) => {
        it(`${ruta.nombre}, nivel ${nivel + 1}: ${reto.pregunta}`, () => {
          const antes = JSON.stringify(reto);
          const html = ilustracionReto(reto, guiaDelReto(ruta.clave, nivel, indice));
          const pantalla = pantallaReto({ ...nuevaPartida(ruta.clave), escenario: nivel, reto: indice });
          expect(pantalla).toContain(html);
          expect(pantalla).toMatch(/<figure class="reto-visual">[\s\S]*<h2 class="pixel preg">[\s\S]*<div data-cuerpo>/);
          expect(pantalla).not.toContain('<details');
          expect(html).toContain('<figcaption>');
          expect(html).not.toMatch(/escena-dialogos|escena-pie/);
          expect(html.match(/<li>/g)?.length).toBeGreaterThanOrEqual(3);
          expect(html.match(/class="px escena-actor"/g)?.length).toBeGreaterThanOrEqual(2);
          expect(html).toContain('/img/px/');
          expect(html).toContain('aria-hidden="true"');
          expect(html).not.toMatch(/undefined|data-accion|data-arg/);
          expect(JSON.stringify(reto)).toBe(antes);
        });
      });
    });
  }
});
