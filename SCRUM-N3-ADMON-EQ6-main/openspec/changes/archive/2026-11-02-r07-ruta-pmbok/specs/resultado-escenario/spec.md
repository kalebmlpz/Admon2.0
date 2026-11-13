## MODIFIED Requirements

### Requirement: Pantalla de resultado
Al resolver el último reto de un escenario el juego SHALL marcarlo como completado y mostrar "<Escenario>: completado", el puntaje "X / 40" y un globo de El Inge Morales. Con 40 puntos el globo SHALL decir "¡Perfecto! Así se avanza en Scrum: una meta pequeña a la vez." en la ruta Scrum y "¡Perfecto! Así se dirige un proyecto: con un plan claro y controlando el avance." en la ruta PMBOK; en otro caso SHALL decir "Bien hecho. Cada Sprint deja algo que mejorar." en la ruta Scrum y "Bien hecho. Cada proyecto deja lecciones aprendidas." en la ruta PMBOK.

#### Scenario: Escenario perfecto
- **WHEN** la persona obtiene 40 puntos en un escenario de la ruta Scrum
- **THEN** ve "40 / 40" y el mensaje de perfecto de Scrum

#### Scenario: Escenario con errores
- **WHEN** la persona obtiene 30 puntos en un escenario de la ruta Scrum
- **THEN** ve "30 / 40" y el mensaje "Bien hecho. Cada Sprint deja algo que mejorar."

#### Scenario: Escenario perfecto en PMBOK
- **WHEN** la persona obtiene 40 puntos en un escenario de la ruta PMBOK
- **THEN** ve "40 / 40" y el mensaje "¡Perfecto! Así se dirige un proyecto: con un plan claro y controlando el avance."

#### Scenario: Escenario con errores en PMBOK
- **WHEN** la persona obtiene 20 puntos en un escenario de la ruta PMBOK
- **THEN** ve "20 / 40" y el mensaje "Bien hecho. Cada proyecto deja lecciones aprendidas."

### Requirement: Navegación tras el resultado
El resultado SHALL ofrecer "Volver al mapa" cuando queden escenarios de la ruta activa por completar y "Ver resultados" cuando los tres escenarios de la ruta estén completados; "Ver resultados" SHALL terminar la partida.

#### Scenario: Quedan escenarios
- **WHEN** la persona completa el escenario 1
- **THEN** el botón dice "Volver al mapa" y al pulsarlo se muestra el mapa con el escenario 2 habilitado

#### Scenario: Último escenario
- **WHEN** la persona completa el escenario 3
- **THEN** el botón dice "Ver resultados" y al pulsarlo la partida termina
