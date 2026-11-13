import { describe, expect, it } from 'vitest';
import { rutas } from '@/data/rutas';
import { ilustracionReto } from '@/game/ilustraciones';
import { guiaDelReto } from '@/game/estado';

describe('escenas relacionadas con los retos', () => {
  for (const ruta of Object.values(rutas)) {
    ruta.escenarios.forEach((escenario, nivel) => {
      escenario.retos.forEach((reto, indice) => {
        it(`${ruta.nombre}, nivel ${nivel + 1}: ${reto.pregunta}`, () => {
          const antes = JSON.stringify(reto);
          const html = ilustracionReto(reto, guiaDelReto(ruta.clave, nivel, indice));
          expect(html).toContain('escena-narrativa');
          expect(html).toContain('<figcaption>');
          expect(html).toContain('escena-pie');
          expect(html).toMatch(/recursos-proyecto|reunion-personajes/);
          expect(html.match(/class="px escena-actor"/g)?.length).toBeGreaterThanOrEqual(2);
          expect(html).toContain('/img/px/');
          expect(html).toContain('role="img" aria-label="');
          expect(html).not.toMatch(/undefined|data-accion|data-arg/);
          expect(JSON.stringify(reto)).toBe(antes);
        });
      });
    });
  }
});
