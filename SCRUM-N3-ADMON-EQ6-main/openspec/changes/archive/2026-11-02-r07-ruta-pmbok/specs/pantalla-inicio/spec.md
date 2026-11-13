## MODIFIED Requirements

### Requirement: Mejor puntaje en portada
La portada SHALL mostrar el mejor puntaje de cada ruta como "Scrum: N de 120" y "PMBOK: M de 120", donde N y M son los mejores puntajes guardados en el navegador para cada ruta o 0 cuando no existe ninguno.

#### Scenario: Sin récord guardado
- **WHEN** no hay mejor puntaje guardado en el navegador
- **THEN** la portada muestra "Scrum: 0 de 120" y "PMBOK: 0 de 120"

#### Scenario: Con récord guardado
- **WHEN** existe un mejor puntaje guardado de 80 en Scrum y ninguno en PMBOK
- **THEN** la portada muestra "Scrum: 80 de 120" y "PMBOK: 0 de 120"

#### Scenario: Almacenamiento no disponible
- **WHEN** el navegador bloquea el almacenamiento local
- **THEN** la portada se muestra completa y ambos mejores puntajes son 0

### Requirement: Jugar inicia una partida nueva
La portada SHALL ofrecer un botón por ruta, "Jugar Scrum" y "Jugar PMBOK". Cada uno SHALL iniciar una partida nueva de su ruta con 0 puntos y sin progreso, independientemente de partidas anteriores.

#### Scenario: Pulsar Jugar Scrum
- **WHEN** la persona pulsa "Jugar Scrum"
- **THEN** abandona la portada y comienza una partida nueva de la ruta Scrum con 0 puntos

#### Scenario: Pulsar Jugar PMBOK
- **WHEN** la persona pulsa "Jugar PMBOK"
- **THEN** abandona la portada y comienza una partida nueva de la ruta PMBOK con 0 puntos y su escenario 1 habilitado
