## MODIFIED Requirements

### Requirement: Pantalla de juego completado
Al terminar el tercer escenario de la ruta activa con al menos una vida el juego SHALL mostrar "Juego completado", tres estrellas con las obtenidas encendidas y el resto apagadas, "P de 120 puntos", el rango, las insignias, un globo de Pau y la imagen grupal. El globo SHALL decir "Valió la pena el esfuerzo. Con Scrum, ¡hasta Beto terminó a tiempo!" en la ruta Scrum y "Valió la pena el esfuerzo. Con un buen plan, ¡hasta Beto entregó a tiempo!" en la ruta PMBOK.

#### Scenario: Partida terminada
- **WHEN** la persona pulsa "Ver resultados" tras completar el escenario 3 de la ruta Scrum
- **THEN** ve "Juego completado" con estrellas, puntos, rango, el globo de Pau de Scrum e imagen grupal

#### Scenario: Partida de PMBOK terminada
- **WHEN** la persona pulsa "Ver resultados" tras completar el escenario 3 de la ruta PMBOK
- **THEN** ve "Juego completado" con el globo "Valió la pena el esfuerzo. Con un buen plan, ¡hasta Beto entregó a tiempo!"

### Requirement: Rango por puntaje
El rango SHALL ser "Maestro Scrum" en la ruta Scrum o "Maestro PMBOK" en la ruta PMBOK con 100 puntos o más, "Desarrollador pro" con 80 a 99, "Desarrollador en práctica" con 60 a 79 y "Aprendiz como Beto" con menos de 60.

#### Scenario: Puntaje perfecto
- **WHEN** la persona termina la ruta Scrum con 120 puntos
- **THEN** el rango es "Maestro Scrum"

#### Scenario: Puntaje perfecto en PMBOK
- **WHEN** la persona termina la ruta PMBOK con 100 puntos
- **THEN** el rango es "Maestro PMBOK"

#### Scenario: Límite inferior de pro
- **WHEN** la persona termina con 80 puntos
- **THEN** el rango es "Desarrollador pro"

#### Scenario: Puntaje bajo
- **WHEN** la persona termina con 40 puntos
- **THEN** el rango es "Aprendiz como Beto"

### Requirement: Volver a jugar
La pantalla final SHALL ofrecer "Jugar de nuevo", que inicia una partida nueva de la misma ruta en el mapa, "Jugar <otra ruta>" ("Jugar PMBOK" desde Scrum o "Jugar Scrum" desde PMBOK), que inicia una partida nueva de la otra ruta, e "Inicio", que lleva a la portada.

#### Scenario: Jugar de nuevo
- **WHEN** la persona pulsa "Jugar de nuevo" al terminar la ruta PMBOK
- **THEN** ve el mapa de la ruta PMBOK con 0 pts, tres vidas y solo el escenario 1 habilitado

#### Scenario: Jugar la otra ruta
- **WHEN** la persona pulsa "Jugar PMBOK" al terminar la ruta Scrum
- **THEN** ve el mapa de la ruta PMBOK con 0 pts, tres vidas y solo el escenario 1 habilitado
