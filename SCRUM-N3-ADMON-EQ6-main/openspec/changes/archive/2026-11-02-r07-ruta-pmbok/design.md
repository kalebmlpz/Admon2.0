## Context

El juego es una sola partida lineal de Scrum. Los datos viven en `src/data/escenarios.ts` y casi todo el código los lee como `escenarios[p.escenario]` (`flujo.ts`, `pantallas/intro.ts`, `reto.ts`, `retro.ts`, `resultado.ts`, `derrota.ts`, `mapa.ts`). Las reglas de puntos (40 por escenario, 120 por partida, estrellas 90/60, rangos 100/80/60) ya valen para cualquier ruta de 3 escenarios con 4 retos. El récord se guarda en `localStorage["sprint-best"]`. La portada (`index.astro`) lee `escenarios` para contar retos, armar la sección de escenarios y calcular qué nivel guía cada personaje.

## Goals / Non-Goals

**Goals:**
- Que PMBOK se pueda jugar sin pasar por Scrum, mediante un enlace directo (`/jugar/?ruta=pmbok`).
- Que el motor no cambie: la ruta es otra lista de escenarios con las mismas reglas.
- Conservar el récord de Scrum que ya tienen los navegadores.

**Non-Goals:**
- Un selector de ruta dentro del juego (solo existe en la portada y en la pantalla final).
- Un puntaje combinado de ambas rutas, fondos nuevos y cambios en los retos de Scrum.

## Decisions

**1. La ruta es un dato y `Partida.ruta` la referencia.**
`tipos.ts` agrega `ClaveRuta = 'scrum' | 'pmbok'` y `Ruta { clave, nombre, escenarios, maestro, perfecto, bien, cierre }`, donde los últimos cuatro son los textos que cambian por ruta (rango máximo, mensajes del resultado y globo final). Un nuevo `src/data/rutas.ts` exporta `rutas: Record<ClaveRuta, Ruta>`: Scrum importa `escenarios` sin tocarlos y PMBOK define sus 3 escenarios en `src/data/pmbok.ts`. `nuevaPartida(ruta = 'scrum')` dimensiona `puntosEscenario` y `completados` con los escenarios de esa ruta.
- Alternativa descartada: meter los 6 escenarios en un solo arreglo y calcular la ruta por índice. Obliga a hacer aritmética de índices en el mapa, el desbloqueo y la guía especial de Pau, y es más fácil equivocarse.

**2. Un solo acceso a los escenarios.**
`estado.ts` exporta `escenariosDe(p)` y `escenarioActual(p)`, y todas las lecturas `escenarios[p.escenario]` pasan a usarlos. Con eso `escenarioHabilitado`, `completarEscenario` y `todos completados` funcionan por ruta sin cambiar su lógica.

**3. La guía especial de Pau aplica solo a la ruta Scrum.**
`guiaDelReto(ruta, escenario, reto)`: la condición actual (`escenario === 2 && reto % 2 === 1`) se cumple solo cuando `ruta === 'scrum'`. En PMBOK el guía siempre es el del escenario.

**4. La ruta llega por la URL.**
`jugar.astro` lee `new URLSearchParams(location.search).get('ruta')` y llama a `iniciar(ruta)`. Cualquier valor distinto de `'pmbok'` se trata como `'scrum'`. Al reiniciar se conserva la ruta de la partida. Para cambiar de ruta, la pantalla final enlaza a `/jugar/?ruta=<otra>`, que recarga la página.
- Alternativa descartada: una pantalla nueva para elegir ruta dentro del juego. Agrega un estado a la tabla de transiciones y no aporta nada frente a un enlace, que además se puede compartir en clase.

**5. Récord por ruta con la clave anterior intacta.**
`leerRecord(ruta)` y `guardarRecord(ruta, puntos)` usan `sprint-best` para Scrum (la clave actual, así no se pierde nada) y `sprint-best-pmbok` para PMBOK. `flujo.ts` pasa `partida.ruta`.

**6. Portada.**
Tiene dos CTA, "JUGAR SCRUM" y "JUGAR PMBOK". La sección de escenarios muestra los dos grupos y la cinta de datos indica "2 RUTAS · 12 RETOS POR RUTA · MÁX. 120 PTS POR RUTA". El HUD HI-SCORE muestra el mayor de los dos récords y el pie muestra los dos ("SCRUM: N DE 120 · PMBOK: M DE 120"). El cálculo "GUÍA · NIVEL" pasa a buscar en ambas rutas (por ejemplo "GUÍA · PMBOK 1"). `reglas.ts` menciona que hay dos rutas de tres escenarios.

## Contenido PMBOK (borrador para revisión del equipo)

Son conceptos generales que valen para la 6ª y la 7ª edición. Hay 9 retos de opción múltiple, 1 de ordenar y 2 de relacionar, el mismo reparto que en Scrum. Los títulos de escenario se reusan porque los fondos son los mismos.

**Escenario 1 · Exterior de la escuela · Fundamentos de PMBOK · guía Riqui · fondo b0**
- Intro. Riqui: "El Inge dice que además de Scrum existe otra forma de dirigir proyectos: la guía PMBOK." Beto: "¿PMBOK? Suena a robot." Riqui: "Es una guía de buenas prácticas. A ver si la entiendes."
- mc. "¿Qué es un proyecto?" ✔ "Un esfuerzo temporal para crear un producto, servicio o resultado único" ✘ "Un trabajo que se repite igual todos los días" / "Cualquier tarea sin fecha de fin". Explicación: un proyecto tiene inicio y fin, y su resultado es único; si se repite igual, es una operación.
- mc. "¿Qué es la guía PMBOK?" ✔ "Un conjunto de buenas prácticas para dirigir proyectos, publicado por el PMI" ✘ "Un marco ágil basado en Sprints" / "Un programa para hacer cronogramas". Explicación: la publica el Project Management Institute y sirve para proyectos predictivos, ágiles o híbridos.
- mc. "La triple restricción equilibra:" ✔ "Alcance, tiempo y costo" ✘ "Vidas, puntos y racha" / "Diseño, código y pruebas". Explicación: si el alcance crece, normalmente suben el tiempo o el costo, y la calidad depende de ese equilibrio.
- rel. "Une cada concepto con su definición:" Proyecto → "Temporal y con un resultado único"; Operación → "Continua y repetitiva"; Director del proyecto → "Lidera al equipo para lograr los objetivos". Explicación: el director del proyecto es responsable de que el proyecto cumpla sus objetivos.

**Escenario 2 · Salón de clases · Ciclo de vida y procesos · guía Pau · fondo b1**
- Intro. Pau: "Antes de decorar algo, hay que saber en qué etapa va el proyecto." Lili: "¿Como el Sprint?" Pau: "Parecido, pero en PMBOK hablamos de ciclos de vida y grupos de procesos."
- mc. "¿Qué ciclo de vida define alcance, tiempo y costo desde el inicio?" ✔ "Predictivo (en cascada)" ✘ "Ágil" / "Improvisado". Explicación: en el enfoque predictivo se planea casi todo al principio y los cambios se controlan formalmente.
- mc. "Un enfoque híbrido:" ✔ "Combina prácticas predictivas y ágiles" ✘ "Solo usa Sprints" / "Trabaja sin ningún plan". Explicación: muchos equipos planean la fase general de forma predictiva y construyen por iteraciones.
- mc. "¿Qué grupo de procesos compara el avance con el plan y corrige desviaciones?" ✔ "Monitoreo y control" ✘ "Inicio" / "Cierre". Explicación: ocurre durante todo el proyecto, no solo al final.
- ord. "Ordena los grupos de procesos del PMBOK:" Inicio → Planificación → Ejecución → Monitoreo y control → Cierre. Explicación: monitoreo y control acompaña a todos los demás; aquí se ordena según el momento en que cada grupo toma protagonismo. **Ojo:** son 5 pasos y en Scrum son 4 (ver Riesgos).

**Escenario 3 · Cancha de la escuela · Gestión del proyecto · guía Beto · fondo b2**
- Intro. Beto: "¡Ahora yo soy el guía! Ya leí todo sobre PMBOK… bueno, casi todo." Toño: "Entonces explícanos los documentos del proyecto." Beto: "Fácil. Bueno… vamos a resolverlo juntos."
- mc. "¿Qué documento autoriza formalmente el inicio del proyecto?" ✔ "El acta de constitución del proyecto" ✘ "El Product Backlog" / "El registro de riesgos". Explicación: el acta da autoridad al director del proyecto y fija objetivos de alto nivel.
- mc. "La EDT (WBS) sirve para:" ✔ "Dividir el alcance en entregables y paquetes de trabajo más pequeños" ✘ "Calificar a cada integrante" / "Medir la velocidad del Sprint". Explicación: descomponer el trabajo facilita estimar, asignar y controlar.
- mc. "Los interesados (stakeholders) son:" ✔ "Personas o grupos que afectan o se ven afectados por el proyecto" ✘ "Solo el cliente que paga" / "Solo quienes programan". Explicación: alumnos, profes y directivos pueden ser interesados del videojuego.
- rel. "Une cada documento con su propósito:" Acta de constitución → "Autoriza el proyecto"; EDT (WBS) → "Descompone el alcance"; Registro de riesgos → "Anota amenazas y sus respuestas". Explicación: cada documento ayuda a planear y controlar una parte del proyecto.

## Risks / Trade-offs

- [El reto de ordenar de PMBOK tiene 5 pasos y en Scrum son 4] → verificar a 320 px que los 5 botones quepan y que los 45 s alcancen. Si no, quitar "Monitoreo y control" y ajustar la explicación.
- [Contenido escrito sin el material de la materia] → el equipo lo revisa antes de cerrar el change; la tarea de revisión bloquea el archivo.
- [Dos títulos repetidos ("Exterior de la escuela" en ambas rutas)] → el mapa muestra el nombre de la ruta y el tema, así que no hay ambigüedad dentro de una partida.
- [Que Beto sea guía cuando su rango "Aprendiz como Beto" es el más bajo] → es intencional, su intro hace el chiste. Si al equipo no le gusta, se cambia por otro personaje solo en los datos.

## Migration Plan

No hay migración: la clave `sprint-best` sigue siendo la de Scrum. Para hacer rollback se revierte el commit; el récord de PMBOK queda huérfano en `localStorage` y no afecta nada.

## Open Questions

- Validación de los 12 retos por parte del equipo o del profe.
