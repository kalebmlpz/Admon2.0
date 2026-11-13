## MODIFIED Requirements

### Requirement: Mapa al iniciar la partida
Al iniciar una partida el juego SHALL mostrar el mapa con el nombre de la ruta activa ("Ruta Scrum" o "Ruta PMBOK") y sus tres escenarios numerados, cada uno con su nombre, su tema y su imagen de fondo, precedidos por el globo de El Inge Morales "Elige tu siguiente reto."

#### Scenario: Partida nueva de Scrum
- **WHEN** la persona inicia la ruta Scrum desde la portada
- **THEN** ve "Ruta Scrum" y el mapa con "1. Exterior de la escuela", "2. Salón de clases" y "3. Cancha de la escuela" y sus temas de Scrum

#### Scenario: Partida nueva de PMBOK
- **WHEN** la persona inicia la ruta PMBOK desde la portada
- **THEN** ve "Ruta PMBOK" y el mapa con sus tres escenarios y los temas de PMBOK

### Requirement: Desbloqueo secuencial
Dentro de la ruta activa, el escenario N SHALL estar habilitado solo cuando el escenario N-1 de esa misma ruta esté completado. Un escenario bloqueado SHALL mostrar "completa el escenario anterior" y SHALL ignorar las pulsaciones.

#### Scenario: Inicio de partida
- **WHEN** no se ha completado ningún escenario de la ruta
- **THEN** solo el escenario 1 está habilitado y los escenarios 2 y 3 aparecen bloqueados

#### Scenario: Primer escenario completado
- **WHEN** el escenario 1 está completado y el 2 no
- **THEN** el escenario 2 está habilitado y el 3 sigue bloqueado

#### Scenario: Pulsar un escenario bloqueado
- **WHEN** la persona pulsa un escenario bloqueado
- **THEN** el mapa no cambia

#### Scenario: PMBOK no depende de Scrum
- **WHEN** la persona inicia la ruta PMBOK sin haber completado ningún escenario de Scrum
- **THEN** el escenario 1 de PMBOK está habilitado
