# Tasks

Rebanadas verticales: cada grupo deja un cambio visible en el navegador.

## 1. Rebanada: PMBOK jugable por URL

- [x] 1.1 Agregar `ClaveRuta`/`Ruta` a `tipos.ts`, crear `src/data/pmbok.ts` (3 escenarios, 12 retos del borrador de `design.md`) y `src/data/rutas.ts` (Scrum reusa `escenarios` sin cambios); verificar con una prueba que cada ruta tiene 3 escenarios y 12 retos
- [x] 1.2 Agregar `ruta` a `Partida`, `nuevaPartida(ruta)`, `escenariosDe`/`escenarioActual` y `guiaDelReto(ruta, escenario, reto)` en `estado.ts`, y cambiar `flujo.ts` y las pantallas para leer la ruta activa y conservarla al reintentar o reiniciar; verificar con pruebas que una partida PMBOK completa llega a `fin` y que Pau solo sustituye al guía en la cancha de Scrum
- [x] 1.3 Hacer que `jugar.astro` lea `?ruta=` (Scrum por defecto o ante valor inválido); verificar en el navegador `/jugar/?ruta=pmbok`, `/jugar/` y `/jugar/?ruta=xyz`

## 2. Rebanada: textos por ruta

- [x] 2.1 Mostrar "Ruta Scrum"/"Ruta PMBOK" en el mapa, los mensajes por ruta en el resultado y en el globo final, `rango(puntos, ruta)` con "Maestro PMBOK" y el enlace "Jugar <otra ruta>" en el final; verificar con pruebas y en el navegador los textos de ambas rutas

## 3. Rebanada: récord por ruta

- [x] 3.1 Cambiar `record.ts` a `leerRecord(ruta)`/`guardarRecord(puntos, ruta)` con `sprint-best` (Scrum) y `sprint-best-pmbok`; verificar con pruebas la separación y que un `sprint-best` previo se lee como Scrum

## 4. Rebanada: portada y reglas

- [x] 4.1 Poner en `index.astro` los botones "JUGAR SCRUM"/"JUGAR PMBOK", los escenarios de ambas rutas, la cinta de datos, "GUÍA · …" por ruta y el récord de cada ruta en el pie y el HUD; verificar a 320 px y 1440 px sin desplazamiento horizontal
- [x] 4.2 Actualizar `reglas.ts` para mencionar las dos rutas; verificar la sección "Cómo se juega" y `/como-se-juega`

## 5. Revisión e integración

- [x] 5.1 Revisar con el equipo los 12 retos de PMBOK y aplicar correcciones en `pmbok.ts`; se verifica con la aprobación explícita del equipo (aprobado por el usuario el 2026-11-02)
- [x] 5.2 Jugar las dos rutas completas en el navegador (incluido el reto de ordenar de 5 pasos a 320 px) y verificar que `pnpm test`, `pnpm astro check` y `pnpm build` pasan
- [x] 5.3 Actualizar el contexto de `openspec/config.yaml` (rutas y claves de récord); verificar con `openspec validate r07-ruta-pmbok`
