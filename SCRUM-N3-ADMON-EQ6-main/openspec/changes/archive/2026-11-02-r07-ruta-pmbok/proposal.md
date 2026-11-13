## Why

La materia también cubre PMBOK y el profe quiere mostrarlo en clase con el mismo juego, sin obligar al grupo a terminar antes los tres escenarios de Scrum. Hoy el juego es una sola partida lineal de Scrum.

## What Changes

- El juego tiene dos **rutas independientes**: Scrum (los 3 escenarios actuales, sin cambios de contenido) y PMBOK (3 escenarios nuevos con conceptos generales que valen para la 6ª y la 7ª edición).
- Cada ruta es una partida completa: 3 vidas, 12 retos, máximo 120 pts, desbloqueo secuencial dentro de la ruta y pantalla final propia.
- La ruta se elige desde la portada (un botón por ruta) y llega al juego como `/jugar/?ruta=pmbok`; sin parámetro, o con uno inválido, se juega Scrum. El enlace sirve para abrir PMBOK directo en clase.
- Ruta PMBOK: "Fundamentos de PMBOK" (guía Riqui), "Ciclo de vida y procesos" (guía Pau), "Gestión del proyecto" (guía Beto). Reusa los fondos b0, b1 y b2. 9 retos de opción múltiple, 1 de ordenar y 2 de relacionar, en borrador hasta que el equipo los revise.
- El rango máximo depende de la ruta: "Maestro Scrum" o "Maestro PMBOK". Los mensajes del resultado de escenario y del final que mencionan Scrum se adaptan a cada ruta.
- Mejor puntaje por ruta. El récord de Scrum ya guardado se conserva.
- La pantalla final ofrece además jugar la otra ruta.
- Portada y reglas presentan las dos rutas. El título "Sprint en la escuela" se mantiene.

Fuera de alcance: arte nuevo de fondos, un selector de ruta dentro del juego (fuera de la portada y la pantalla final), un puntaje combinado de ambas rutas, contenido atado a una edición concreta del PMBOK y cambios a los retos de Scrum.

## Capabilities

### New Capabilities
- `rutas-de-juego`: existencia de las rutas Scrum y PMBOK, elección por URL, independencia de las partidas y contenido de la ruta PMBOK.

### Modified Capabilities
- `mapa-escenarios`: el mapa muestra los escenarios de la ruta activa y el desbloqueo es secuencial dentro de esa ruta.
- `resultado-escenario`: mensaje de escenario perfecto según la ruta; "Ver resultados" al completar los tres escenarios de la ruta.
- `resultado-final`: globo de cierre y rango máximo según la ruta; botón para jugar la otra ruta.
- `mejor-puntaje`: un mejor puntaje por ruta.
- `pantalla-inicio`: un botón por ruta y mejor puntaje de cada ruta en la portada.

## Impact

- Datos: nuevo `src/data/rutas.ts` (o equivalente) con los escenarios PMBOK; `tipos.ts` gana el tipo de ruta. `escenarios.ts` (Scrum) no cambia.
- Lógica: `src/game/estado.ts` (`Partida.ruta`, rango, guía especial de Pau solo en Scrum), `src/game/flujo.ts` y las pantallas que hoy leen `escenarios[p.escenario]`.
- Persistencia: `src/lib/record.ts` con clave por ruta.
- Páginas: `src/pages/jugar.astro` (lee `?ruta=`), `src/pages/index.astro`, `src/data/reglas.ts`.
- Tests de `estado`, `flujo`, `record` y `final` se amplían.
- `openspec/config.yaml` (contexto del proyecto) describe solo Scrum; se actualiza al cerrar el change.
- Sin dependencias nuevas.
