# resultado-final Specification

## Purpose
Cierre de la partida ganada que califica el desempeño con estrellas, rango e insignias y anima a volver a jugar.

## Requirements

### Requirement: Pantalla de juego completado
Al terminar el tercer escenario de la ruta activa con al menos una vida el juego SHALL mostrar "Juego completado", tres estrellas con las obtenidas encendidas y el resto apagadas, "P de 120 puntos", el rango, las insignias, un globo de Pau y la imagen grupal. El globo SHALL decir "Valió la pena el esfuerzo. Con Scrum, ¡hasta Beto terminó a tiempo!" en la ruta Scrum y "Valió la pena el esfuerzo. Con un buen plan, ¡hasta Beto entregó a tiempo!" en la ruta PMBOK.

#### Scenario: Partida terminada
- **WHEN** la persona pulsa "Ver resultados" tras completar el escenario 3 de la ruta Scrum
- **THEN** ve "Juego completado" con estrellas, puntos, rango, el globo de Pau de Scrum e imagen grupal

#### Scenario: Partida de PMBOK terminada
- **WHEN** la persona pulsa "Ver resultados" tras completar el escenario 3 de la ruta PMBOK
- **THEN** ve "Juego completado" con el globo "Valió la pena el esfuerzo. Con un buen plan, ¡hasta Beto entregó a tiempo!"

### Requirement: Estrellas por puntaje
Las estrellas encendidas SHALL ser 3 con 90 puntos o más, 2 con 60 a 89 y 1 con menos de 60.

#### Scenario: Tres estrellas
- **WHEN** la persona termina con 90 puntos
- **THEN** las tres estrellas están encendidas

#### Scenario: Dos estrellas
- **WHEN** la persona termina con 60 puntos
- **THEN** dos estrellas están encendidas y una apagada

#### Scenario: Una estrella
- **WHEN** la persona termina con 50 puntos
- **THEN** una estrella está encendida

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

### Requirement: Insignias
La pantalla final SHALL mostrar "Sin errores" si ningún reto se falló, "Racha de N" si la racha máxima fue 6 o más, siendo N esa racha, y "Velocista" si 6 o más retos se acertaron en menos de 10 segundos cada uno. Sin condiciones cumplidas no SHALL mostrarse ninguna insignia.

#### Scenario: Partida perfecta y rápida
- **WHEN** la persona acierta los 12 retos, cada uno en menos de 10 segundos
- **THEN** ve "Sin errores", "Racha de 12" y "Velocista"

#### Scenario: Racha insuficiente
- **WHEN** la racha máxima fue 5
- **THEN** no aparece la insignia de racha

#### Scenario: Sin insignias
- **WHEN** la persona falló dos retos, su racha máxima fue 4 y tardó más de 10 s en la mayoría
- **THEN** no se muestra ninguna insignia

### Requirement: Volver a jugar
La pantalla final SHALL ofrecer "Jugar de nuevo", que inicia una partida nueva de la misma ruta en el mapa, "Jugar <otra ruta>" ("Jugar PMBOK" desde Scrum o "Jugar Scrum" desde PMBOK), que inicia una partida nueva de la otra ruta, e "Inicio", que lleva a la portada.

#### Scenario: Jugar de nuevo
- **WHEN** la persona pulsa "Jugar de nuevo" al terminar la ruta PMBOK
- **THEN** ve el mapa de la ruta PMBOK con 0 pts, tres vidas y solo el escenario 1 habilitado

#### Scenario: Jugar la otra ruta
- **WHEN** la persona pulsa "Jugar PMBOK" al terminar la ruta Scrum
- **THEN** ve el mapa de la ruta PMBOK con 0 pts, tres vidas y solo el escenario 1 habilitado
