## ADDED Requirements

### Requirement: Dos rutas de juego
El juego SHALL ofrecer dos rutas: "Scrum", con los escenarios "Exterior de la escuela" (Fundamentos de SCRUM), "Salón de clases" (Roles del equipo) y "Cancha de la escuela" (Eventos y artefactos), y "PMBOK", con los escenarios "Exterior de la escuela" (Fundamentos de PMBOK), "Salón de clases" (Ciclo de vida y procesos) y "Cancha de la escuela" (Gestión del proyecto). Cada ruta SHALL tener 12 retos repartidos en 4 por escenario.

#### Scenario: Escenarios de la ruta Scrum
- **WHEN** la persona juega la ruta Scrum
- **THEN** el mapa muestra los tres escenarios de Scrum con sus temas actuales

#### Scenario: Escenarios de la ruta PMBOK
- **WHEN** la persona juega la ruta PMBOK
- **THEN** el mapa muestra "Fundamentos de PMBOK", "Ciclo de vida y procesos" y "Gestión del proyecto" como temas de sus tres escenarios

### Requirement: Elegir la ruta por URL
La página del juego SHALL leer el parámetro `ruta` de la URL: con `pmbok` SHALL iniciar una partida de la ruta PMBOK y con `scrum`, sin parámetro o con cualquier otro valor SHALL iniciar una partida de la ruta Scrum.

#### Scenario: Enlace directo a PMBOK
- **WHEN** la persona abre `/jugar/?ruta=pmbok`
- **THEN** ve el mapa de la ruta PMBOK con su primer escenario habilitado, sin haber jugado Scrum

#### Scenario: Sin parámetro
- **WHEN** la persona abre `/jugar/`
- **THEN** ve el mapa de la ruta Scrum

#### Scenario: Parámetro inválido
- **WHEN** la persona abre `/jugar/?ruta=xyz`
- **THEN** ve el mapa de la ruta Scrum sin mostrar errores

### Requirement: Rutas independientes
Cada ruta SHALL ser una partida completa e independiente: empieza con 3 vidas y 0 puntos, su máximo es 120 puntos y su progreso no afecta a la otra ruta.

#### Scenario: Jugar PMBOK sin Scrum
- **WHEN** la persona completa los tres escenarios de la ruta PMBOK sin haber jugado Scrum
- **THEN** llega a la pantalla final de PMBOK con su puntaje sobre 120

#### Scenario: Derrota en una ruta
- **WHEN** la persona se queda sin vidas en la ruta PMBOK
- **THEN** la derrota solo reinicia la partida de PMBOK

### Requirement: Guías de la ruta PMBOK
En la ruta PMBOK el escenario 1 SHALL ser guiado por Riqui, el 2 por Pau y el 3 por Beto; el guía SHALL decir las líneas de intro que le tocan y aparecer en los retos y en la retroalimentación de su escenario.

#### Scenario: Retos del escenario 3 de PMBOK
- **WHEN** la persona juega cualquier reto del escenario 3 de la ruta PMBOK
- **THEN** el personaje guía mostrado es Beto en todos los retos
