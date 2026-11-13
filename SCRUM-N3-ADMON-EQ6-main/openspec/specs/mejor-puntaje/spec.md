# mejor-puntaje Specification

## Purpose
Persistencia local del mejor puntaje para que la persona vea su progreso entre partidas en el mismo navegador.

## Requirements

### Requirement: Guardar el mejor puntaje
Cada ruta SHALL tener su propio mejor puntaje. Al terminar una partida ganada con un puntaje mayor que el guardado de esa ruta, el juego SHALL guardar el nuevo puntaje en esa ruta y la pantalla final SHALL añadir ". Nuevo mejor puntaje" tras el rango. Con un puntaje igual o menor no SHALL cambiar el guardado ni mostrar el aviso. El mejor puntaje de Scrum guardado antes de este cambio SHALL conservarse como el de la ruta Scrum.

#### Scenario: Primer récord
- **WHEN** no hay puntaje guardado y la persona termina con 70 puntos
- **THEN** se guarda 70 y la pantalla final muestra "Desarrollador en práctica. Nuevo mejor puntaje"

#### Scenario: Puntaje inferior
- **WHEN** el guardado es 90 y la persona termina con 80
- **THEN** el guardado sigue en 90 y no aparece el aviso

#### Scenario: Récords separados por ruta
- **WHEN** el guardado de Scrum es 110 y la persona termina la ruta PMBOK con 70 por primera vez
- **THEN** se guarda 70 para PMBOK, aparece el aviso de nuevo mejor puntaje y el de Scrum sigue en 110

#### Scenario: Récord previo de Scrum
- **WHEN** el navegador ya tenía guardado 90 antes de existir las rutas
- **THEN** el mejor puntaje de la ruta Scrum es 90 y el de PMBOK es 0

### Requirement: Persistencia entre visitas
El mejor puntaje de cada ruta SHALL sobrevivir a recargar la página y cerrar el navegador, y la portada SHALL mostrar ambos.

#### Scenario: Recargar la portada
- **WHEN** se guardó 70 en Scrum y 50 en PMBOK y la persona recarga la portada
- **THEN** ve 70 como mejor puntaje de Scrum y 50 como mejor puntaje de PMBOK, ambos de 120

### Requirement: Funcionar sin almacenamiento
Si el navegador impide leer o escribir el almacenamiento local, el juego SHALL seguir funcionando y SHALL tratar el mejor puntaje como 0 sin mostrar errores.

#### Scenario: Almacenamiento bloqueado
- **WHEN** el almacenamiento local lanza error al escribir
- **THEN** la pantalla final se muestra completa y la portada indica 0
