import type { ClaveIlustracion, ClavePersonaje, Reto } from '@/data/tipos';
import { personajes } from '@/data/personajes';
import { px } from '@/lib/assets';
import { esc } from '@/game/util';

const tinta = '#f2f0e6', amarillo = '#ffd84d', azul = '#4aa3ff', rosa = '#ff7aa8';
const caja = (x: number, y: number, w: number, h: number, color = tinta) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`;
const linea = (d: string, color = tinta) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="3"/>`;
const nota = (x: number, y: number, c = amarillo) => caja(x,y,18,18,c) + caja(x+4,y+5,10,2,'#14213d') + caja(x+4,y+10,7,2,'#14213d');
const persona = (x: number, y: number, c = azul) => caja(x+5,y,10,10,c)+caja(x,y+14,20,16,c);
const pantalla = (x: number, y: number) => caja(x,y,62,40,tinta)+caja(x+3,y+3,56,31,'#14213d')+caja(x+27,y+40,8,8,tinta)+caja(x+17,y+48,28,3,tinta)+linea(`M${x+17} ${y+16}l-6 5 6 5m28-10 6 5-6 5`,azul);
const charla = (x: number, y: number, c = rosa) => linea(`M${x} ${y}h30v18h-12l-7 7v-7h-11z`,c)+caja(x+6,y+7,3,3,c)+caja(x+14,y+7,3,3,c)+caja(x+22,y+7,3,3,c);
const calendario = (x: number, y: number) => caja(x,y,48,43,tinta)+caja(x+3,y+10,42,30,'#14213d')+caja(x+9,y-4,4,10,rosa)+caja(x+34,y-4,4,10,rosa)+[0,1,2].map(i=>[0,1].map(j=>caja(x+8+i*13,y+16+j*12,7,6,amarillo)).join('')).join('');
const documento = (x: number, y: number, c = tinta) => caja(x,y,32,43,c)+[0,1,2].map(i=>caja(x+6,y+9+i*9,20-i*3,3,'#14213d')).join('');
const arbol = () => linea('M112 39v17M42 77V56h140v21M112 56v21')+nota(103,20)+nota(33,78,azul)+nota(103,78,rosa)+nota(173,78,azul);
const reunion = () => persona(34,70,azul)+persona(102,70,rosa)+persona(170,70,amarillo)+charla(30,24)+charla(99,30,azul)+charla(165,20,amarillo);
const tablero = () => linea('M38 18h148v78H38z')+linea('M87 18v78M136 18v78','#668079')+nota(49,30)+nota(49,59,rosa)+nota(100,32,azul)+nota(149,58,amarillo);

/** Dibujos sin etiquetas de respuesta ni conexiones que resuelvan los emparejamientos. */
const escenas: Record<ClaveIlustracion, { titulo: string; descripcion: string; dibujo: () => string; companero: ClavePersonaje }> = {
 equipo: { titulo:'Una misión en equipo', descripcion:'Tres integrantes colaboran alrededor de un videojuego en construcción.', dibujo:()=>persona(23,72)+pantalla(82,33)+persona(179,72,rosa)+nota(48,23)+nota(162,24,rosa), companero:'beto' },
 sprints: { titulo:'El tiempo de la misión', descripcion:'Tres calendarios representan periodos de trabajo sobre el juego.', dibujo:()=>calendario(13,38)+calendario(88,38)+calendario(163,38), companero:'riqui' },
 evidencia: { titulo:'Algo no funciona…', descripcion:'Una pantalla muestra un fallo mientras una lupa examina el problema.', dibujo:()=>pantalla(35,30)+linea('M60 40l12 15m0-15L60 55',rosa)+'<circle cx="151" cy="49" r="22" fill="none" stroke="#ffd84d" stroke-width="4"/>'+linea('M168 66l23 23',amarillo), companero:'tono' },
 ciclo: { titulo:'Las piezas del Sprint', descripcion:'Un calendario, una pantalla y globos de diálogo representan actividades del Sprint sin indicar su orden.', dibujo:()=>calendario(16,38)+pantalla(91,38)+charla(178,40), companero:'beto' },
 backlog: { titulo:'Ideas para el videojuego', descripcion:'Un tablero contiene tarjetas de tareas en distintas columnas.', dibujo:tablero, companero:'riqui' },
 impedimentos: { titulo:'Un obstáculo en el camino', descripcion:'Una barrera bloquea el camino entre el equipo y su objetivo.', dibujo:()=>persona(27,55)+linea('M63 88h139',azul)+caja(91,42,65,17,rosa)+caja(96,59,5,30)+caja(147,59,5,30)+linea('M100 43l12 15m8-15 12 15m8-15 12 15',tinta), companero:'inge' },
 desarrollo: { titulo:'Manos a la obra', descripcion:'El equipo trabaja con un ordenador, herramientas de diseño y tarjetas.', dibujo:()=>pantalla(82,35)+persona(25,65,rosa)+persona(178,65)+nota(40,21)+linea('M174 20l15 15m-15 0 15-15',amarillo), companero:'tono' },
 roles: { titulo:'Cada quien aporta', descripcion:'Tres integrantes con distintos colores representan las responsabilidades del equipo.', dibujo:()=>persona(31,50,amarillo)+persona(101,50,azul)+persona(171,50,rosa)+charla(25,12)+nota(172,12), companero:'inge' },
 planning: { titulo:'La siguiente misión', descripcion:'Un calendario y tarjetas de tareas acompañan una meta marcada con una bandera.', dibujo:()=>calendario(18,35)+nota(93,37,rosa)+nota(93,65,azul)+linea('M163 94V23h35l-9 12 9 12h-35',amarillo), companero:'lili' },
 daily: { titulo:'El equipo se reúne', descripcion:'Tres integrantes intercambian mensajes sobre su trabajo.', dibujo:reunion, companero:'tono' },
 review: { titulo:'Hora de mostrar el juego', descripcion:'Dos personas observan una demostración del videojuego en una pantalla.', dibujo:()=>pantalla(82,21)+persona(34,75,rosa)+persona(170,75,amarillo)+charla(169,28), companero:'lili' },
 eventos: { titulo:'Momentos para conversar', descripcion:'Globos de conversación, una pantalla y notas representan distintos encuentros del equipo, sin emparejarlos.', dibujo:()=>charla(25,33)+pantalla(82,30)+nota(177,32,rosa)+nota(177,61,azul), companero:'tono' },
 proyecto: { titulo:'Una feria escolar', descripcion:'Un puesto de feria en construcción aparece junto a un calendario.', dibujo:()=>linea('M25 94V48h89v46M18 48l51-30 52 30',amarillo)+caja(40,60,21,18,rosa)+caja(76,60,21,18,azul)+calendario(151,42), companero:'beto' },
 guia: { titulo:'La biblioteca del proyecto', descripcion:'Un libro abierto reúne apuntes y gráficos para el proyecto.', dibujo:()=>linea('M112 32q-39-20-77-5v62q39-13 77 5 39-18 77-5V27q-38-15-77 5v62')+linea('M47 44h47m-47 14h39m37-14h47m-47 14h39',azul), companero:'inge' },
 triangulo: { titulo:'Un equilibrio por descubrir', descripcion:'Un triángulo une tres vértices sin etiquetas para representar un equilibrio de tres elementos.', dibujo:()=>linea('M112 20L40 96h144z',amarillo)+nota(103,11,rosa)+nota(31,87,azul)+nota(175,87,amarillo), companero:'pau' },
 conceptos: { titulo:'El trabajo en la escuela', descripcion:'Un calendario, tareas repetidas y un integrante representan conceptos diferentes sin conectarlos a definiciones.', dibujo:()=>calendario(15,34)+nota(93,28)+nota(93,56)+nota(93,84)+persona(178,56,rosa), companero:'inge' },
 predictivo: { titulo:'Un recorrido por etapas', descripcion:'Bloques escalonados y un calendario muestran un plan de trabajo.', dibujo:()=>linea('M20 35h48v22h48v22h48v22h40',azul)+nota(22,13)+nota(72,35,rosa)+nota(120,57,azul)+calendario(165,13), companero:'lili' },
 hibrido: { titulo:'Dos maneras de avanzar', descripcion:'Un recorrido por etapas convive con un circuito de trabajo.', dibujo:()=>linea('M20 26h40v24h40v24',azul)+linea('M144 28h54v54h-54z',amarillo)+nota(136,19,rosa)+nota(190,73,azul)+nota(72,73), companero:'riqui' },
 control: { titulo:'¿Cómo vamos?', descripcion:'Un gráfico compara dos trazos de avance dentro de un mismo plan.', dibujo:()=>linea('M31 19v80h171')+linea('M39 87l44-24 46-22 63-18',azul)+linea('M39 87l44-12 46 5 63-32',amarillo)+caja(42,12,13,4,azul)+caja(68,12,13,4,amarillo), companero:'tono' },
 procesos: { titulo:'Las piezas del proyecto', descripcion:'Cinco documentos distribuidos sin numeración ni flechas representan los grupos de procesos.', dibujo:()=>documento(20,18,azul)+documento(96,18)+documento(172,18,rosa)+documento(58,72,amarillo)+documento(134,72,azul), companero:'lili' },
 acta: { titulo:'Un documento importante', descripcion:'Un documento firmado y sellado acompaña el comienzo de una iniciativa escolar.', dibujo:()=>documento(88,23)+linea('M93 78l8-5 5 4 8-3',amarillo)+'<circle cx="145" cy="77" r="14" fill="none" stroke="#ff7aa8" stroke-width="3"/>'+linea('M140 90v14l5-4 5 4V90',rosa), companero:'inge' },
 edt: { titulo:'De una idea a sus partes', descripcion:'Un bloque superior se divide gráficamente en tres bloques menores.', dibujo:arbol, companero:'pau' },
 interesados: { titulo:'La escuela y el videojuego', descripcion:'Varios grupos de personas rodean una pantalla que representa el proyecto escolar.', dibujo:()=>pantalla(82,40)+persona(26,20,amarillo)+persona(177,20,rosa)+persona(26,83)+persona(177,83,amarillo), companero:'tono' },
 documentos: { titulo:'La mesa del proyecto', descripcion:'Tres documentos con símbolos de firma, estructura y advertencia, sin mostrar sus correspondencias.', dibujo:()=>documento(25,33)+documento(96,33,azul)+documento(167,33,rosa)+linea('M29 87l10-6 11 6',amarillo)+linea('M112 82v8m-12 8v-8h24v8',azul)+linea('M182 84l-10 17h20z',amarillo), companero:'pau' },
};

const sprite = (clave: ClavePersonaje) => `<img class="px escena-actor" src="${px(clave)}" alt="${esc(personajes[clave].nombre)}" width="90" height="120">`;
const dibujo = (contenido: string, descripcion: string) => `<svg viewBox="0 0 224 124" role="img" aria-label="${esc(descripcion)}" shape-rendering="crispEdges">${contenido}</svg>`;
const puesto = (x: number, y: number, color = rosa) =>
  caja(x,y,54,9,color)+caja(x+4,y+9,4,38)+caja(x+46,y+9,4,38)+caja(x+4,y+30,46,17,'#a27a49')+caja(x+12,y+20,12,10,amarillo)+caja(x+30,y+17,12,13,azul);
const feria = () => puesto(18,55,rosa)+puesto(86,55,azul)+puesto(154,55,amarillo)+linea('M15 18h194',tinta)+[30,62,94,126,158,190].map((x,i)=>`<path d="M${x} 20h12l-6 12z" fill="${i%2 ? rosa : amarillo}"/>`).join('');

/** Escenas que presentan una situación escolar relacionada con cada pregunta. */
function escenaNarrativa(clave: ClaveIlustracion): string | undefined {
  if (clave === 'daily') return `<figure class="reto-visual escena-narrativa"><figcaption>Una reunión antes de seguir</figcaption><div class="reunion-personajes">${[
    ['lili', '¡Ya funciona!', pantalla(80,25)+linea('M165 62l9 9 21-24','#5cc46a')],
    ['tono', 'Sigo con esto…',pantalla(80,25)+caja(83,83,58,7,azul)+caja(83,83,29,7,amarillo)],
    ['pau', 'Necesito ayuda',pantalla(80,25)+linea('M99 35l23 18m0-18-23 18',rosa)],
  ].map(([personaje, texto, icono])=>`<div class="reunion-integrante"><div class="escena-bocadillo"><span>${texto}</span>${dibujo(icono,'Situación del trabajo: '+texto)}</div>${sprite(personaje as ClavePersonaje)}</div>`).join('')}</div><p class="escena-pie">El equipo conversa sobre cómo va el videojuego.</p></figure>`;
  if (clave === 'triangulo') return `<figure class="reto-visual escena-narrativa"><figcaption>Preparar la feria de la escuela</figcaption><div class="proyecto-protagonista">${sprite('riqui')}<div class="feria-central">${dibujo(feria(),'Tres puestos, banderines y materiales de una feria escolar en preparación.')}</div>${sprite('pau')}</div><div class="recursos-proyecto"><div>${dibujo(calendario(88,35),'Calendario con días disponibles.')}<span>¿Cuántos días?</span></div><div>${dibujo('<circle cx="112" cy="60" r="28" fill="#ffd84d" stroke="#a27a49" stroke-width="5"/>'+linea('M121 44h-17v15h17v15h-19m10-38v45','#14213d'),'Monedas para los materiales.')}<span>¿Cuánto dinero?</span></div><div>${dibujo(puesto(86,38),'Un puesto entre los elementos que se quieren preparar.')}<span>¿Qué construiremos?</span></div></div><p class="escena-pie">Hay que organizar todo para el día de la feria.</p></figure>`;
  if (clave === 'edt') return `<figure class="reto-visual escena-narrativa"><figcaption>Una feria, muchas piezas</figcaption><div class="proyecto-protagonista">${sprite('beto')}<div class="feria-central">${dibujo(feria(),'La feria escolar completa, formada por distintos entregables.')}</div>${sprite('pau')}</div><div class="escena-ramas" aria-hidden="true"><i></i><i></i><i></i></div><div class="recursos-proyecto"><div>${dibujo(puesto(86,38),'Los puestos de la feria.')}<span>Puestos</span></div><div>${dibujo(linea('M25 27h174',tinta)+'<path d="M35 30h35l-17 28zM95 30h35l-17 28zM155 30h35l-17 28z" fill="#ff7aa8"/>'+caja(95,80,35,17,amarillo),'Banderines y materiales de decoración.')}<span>Decoración</span></div><div>${dibujo(calendario(88,35)+linea('M30 84h35m-17-17v34',rosa),'Actividades que se realizarán en la feria.')}<span>Actividades</span></div></div><p class="escena-pie">Cada parte contribuye al proyecto completo.</p></figure>`;
}

type ClaveContextual = Exclude<ClaveIlustracion, 'daily' | 'triangulo' | 'edt'>;
type IconoContextual = 'juego' | 'calendario' | 'tareas' | 'charla' | 'feria' | 'documento' | 'obstaculo' | 'avance' | 'libro' | 'equipo' | 'riesgo' | 'herramientas';
interface Contexto {
  titulo: string;
  dialogo: [string, string];
  pie: string;
  detalles: [IconoContextual, string, string][];
}

const contextos: Record<ClaveContextual, Contexto> = {
  equipo: {
    titulo: 'Construir el juego entre todos', dialogo: ['Probemos una parte.', '¡Y luego la mejoramos!'],
    pie: 'El grupo trabaja en un juego que todavía tiene cosas por descubrir.',
    detalles: [['equipo','Juntos','El equipo comparte ideas para resolver el reto.'], ['juego','Una parte jugable','Una versión pequeña del juego ya puede probarse.'], ['charla','Comentarios','Quienes prueban el juego comparten observaciones.']],
  },
  sprints: {
    titulo: 'Una meta para cada periodo', dialogo: ['Esta vez, el mapa.', 'Después, otro reto.'],
    pie: 'El calendario separa periodos de trabajo con pequeñas metas.',
    detalles: [['calendario','Un periodo','Un calendario delimita un periodo de trabajo.'], ['juego','Una meta','El mapa es la meta de este periodo.'], ['avance','Algo listo','Una parte del juego queda disponible para probar.']],
  },
  evidencia: {
    titulo: 'El botón no responde', dialogo: ['Al pulsar, no pasa nada.', 'Vamos a comprobarlo.'],
    pie: 'Toño prueba el juego y muestra al grupo el fallo que encontró.',
    detalles: [['juego','Probar','Un videojuego es puesto a prueba.'], ['riesgo','Observar el fallo','Una señal de advertencia marca un problema detectado.'], ['herramientas','Ajustar','Herramientas para corregir y volver a probar.']],
  },
  ciclo: {
    titulo: 'Los momentos de una misión', dialogo: ['Hay varias actividades.', '¿En qué orden van?'],
    pie: 'Las actividades aparecen mezcladas: tú decides la secuencia en las respuestas.',
    detalles: [['juego','Mostrar lo construido','Una pantalla lista para una demostración.'], ['calendario','Preparar el trabajo','Un calendario y notas para preparar la misión.'], ['charla','Conversar y mejorar','Una conversación para revisar el trabajo y cómo colaborar.']],
  },
  backlog: {
    titulo: '¿Qué necesita primero el juego?', dialogo: ['Faltan mapa y sonido.', '¿Qué aporta más?'],
    pie: 'El equipo reúne necesidades del juego y conversa sobre sus prioridades.',
    detalles: [['tareas','Mapa','Una tarjeta representa la creación del mapa.'], ['juego','Pantalla de inicio','Una pantalla pendiente de construir.'], ['charla','Necesidades','Los jugadores comparten lo que necesitan.']],
  },
  impedimentos: {
    titulo: 'El equipo se quedó bloqueado', dialogo: ['Nos falta una herramienta.', 'Veamos cómo conseguirla.'],
    pie: 'El Inge acompaña al grupo para que pueda seguir trabajando.',
    detalles: [['obstaculo','Un bloqueo','Una barrera impide continuar el camino.'], ['charla','Pedir apoyo','El grupo conversa para identificar la dificultad.'], ['herramientas','Poder continuar','Las herramientas que faltaban permiten retomar el trabajo.']],
  },
  desarrollo: {
    titulo: 'Distintas habilidades, un juego', dialogo: ['Yo preparo las pantallas.', 'Yo pruebo los controles.'],
    pie: 'El grupo coordina diseño, construcción y pruebas de una misma entrega.',
    detalles: [['tareas','Diseñar','Notas y bocetos para las pantallas.'], ['herramientas','Construir','Herramientas de trabajo para crear el juego.'], ['juego','Probar','La misma versión del juego se prueba antes de entregarla.']],
  },
  roles: {
    titulo: 'Un equipo con responsabilidades', dialogo: ['¿Qué necesitamos?', '¿Cómo nos organizamos?'],
    pie: 'Todos trabajan en el mismo juego; relaciona los roles con sus responsabilidades.',
    detalles: [['tareas','Necesidades','Tarjetas con necesidades pendientes del videojuego.'], ['obstaculo','Dificultades','Un obstáculo que requiere atención del equipo.'], ['juego','Producto','Una versión del juego en construcción.']],
  },
  planning: {
    titulo: 'Preparar la próxima misión', dialogo: ['Queremos un mapa jugable.', '¿Qué cabe en estos días?'],
    pie: 'Sobre la mesa están el objetivo, el calendario y las tareas candidatas.',
    detalles: [['juego','El mapa del juego','Una pantalla representa el objetivo que se quiere conseguir.'], ['calendario','Días disponibles','Un calendario muestra el periodo disponible para trabajar.'], ['tareas','Trabajo posible','Tarjetas con el trabajo que se podría realizar.']],
  },
  review: {
    titulo: 'Los alumnos prueban la entrega', dialogo: ['Este mapa ya funciona.', '¡Aquí me cuesta avanzar!'],
    pie: 'El equipo muestra lo construido y escucha a quienes van a usarlo.',
    detalles: [['juego','Demostración','Una versión utilizable del videojuego en pantalla.'], ['equipo','Quienes lo usan','Personas interesadas participan en la demostración.'], ['charla','Comentarios','Una conversación sobre lo observado al probar el juego.']],
  },
  eventos: {
    titulo: 'Tres conversaciones del equipo', dialogo: ['¿Cómo vamos hoy?', '¿Qué podemos mejorar?'],
    pie: 'Las escenas muestran encuentros diferentes, sin unirlos con las respuestas.',
    detalles: [['charla','Antes de seguir','El equipo conversa sobre su trabajo actual.'], ['juego','Una demostración','El videojuego se muestra a otras personas.'], ['equipo','Cómo colaborar','El grupo conversa sobre su manera de trabajar.']],
  },
  proyecto: {
    titulo: 'Crear una feria para la escuela', dialogo: ['La feria será el viernes.', '¡Hay que prepararla!'],
    pie: 'El grupo prepara algo especial que tendrá un día de realización.',
    detalles: [['calendario','Una fecha','El calendario señala cuándo se realizará la feria.'], ['herramientas','Preparativos','Materiales para construir los puestos.'], ['feria','La feria escolar','Los puestos forman el resultado que quiere conseguir el grupo.']],
  },
  guia: {
    titulo: 'Buscar orientación para la feria', dialogo: ['¿Cómo organizamos esto?', 'Consultemos la guía.'],
    pie: 'El Inge y Riqui revisan un libro antes de decidir cómo dirigir el proyecto.',
    detalles: [['libro','Una guía','Un libro abierto con apuntes de gestión de proyectos.'], ['tareas','El plan de la feria','Tarjetas para organizar el trabajo del proyecto.'], ['equipo','El equipo','Las personas aplican lo aprendido a su propia situación.']],
  },
  conceptos: {
    titulo: 'No todo el trabajo es igual', dialogo: ['Vamos a crear una feria.', 'Y atender la biblioteca.'],
    pie: 'Distingue la iniciativa especial, el trabajo cotidiano y quién coordina al equipo.',
    detalles: [['feria','Preparar la feria','Un evento especial se prepara para una fecha.'], ['libro','Atender la biblioteca','Los libros representan una actividad cotidiana que se repite.'], ['equipo','Coordinar al grupo','Una persona acompaña al grupo para lograr sus objetivos.']],
  },
  predictivo: {
    titulo: 'Preparar el plan antes de construir', dialogo: ['Estos son los puestos.', 'Y estas, las fechas.'],
    pie: 'Antes de empezar, el grupo acuerda qué hará, cuándo y con qué recursos.',
    detalles: [['documento','Plan preparado','Un documento reúne decisiones antes de construir.'], ['calendario','Fechas acordadas','Un calendario fija las fechas del trabajo.'], ['feria','Resultado previsto','Los puestos muestran lo que se espera entregar.']],
  },
  hibrido: {
    titulo: 'Un plan general y pequeñas pruebas', dialogo: ['La feria ya tiene fecha.', 'Probemos cada minijuego.'],
    pie: 'La organización general convive con versiones que el equipo prueba y mejora.',
    detalles: [['calendario','Fecha de la feria','Un calendario representa los acuerdos generales.'], ['juego','Primera versión','Una versión del minijuego está disponible para probar.'], ['charla','Probar y ajustar','El equipo recoge comentarios para la siguiente versión.']],
  },
  control: {
    titulo: '¿Lo real coincide con el plan?', dialogo: ['Esperábamos tres puestos.', 'Solo hay dos listos.'],
    pie: 'El grupo detecta una diferencia y revisa qué necesita ajustar.',
    detalles: [['documento','Lo previsto','Un documento contiene el avance que se esperaba.'], ['avance','Lo realizado','Una barra muestra el avance real del trabajo.'], ['herramientas','Qué ajustar','Herramientas para atender la diferencia encontrada.']],
  },
  procesos: {
    titulo: 'Organizar una feria de principio a fin', dialogo: ['Hay mucho por preparar.', '¿Cómo se organiza?'],
    pie: 'Estas son actividades del proyecto: ordena los grupos en las respuestas.',
    detalles: [['feria','Construir la feria','Los puestos representan el trabajo de construcción.'], ['documento','Acordar y preparar','Un documento representa acuerdos y preparativos.'], ['avance','Revisar el avance','La revisión del progreso acompaña el proyecto, no solo su final.']],
  },
  acta: {
    titulo: 'La escuela da luz verde', dialogo: ['La feria está aprobada.', '¡Podemos empezar!'],
    pie: 'Un documento firmado deja constancia de la autorización del proyecto.',
    detalles: [['documento','La aprobación','Un documento firmado registra la aprobación de la iniciativa.'], ['equipo','Responsable','El grupo reconoce a quien coordinará el proyecto.'], ['feria','Objetivo acordado','La feria es el objetivo general autorizado.']],
  },
  interesados: {
    titulo: 'El juego importa a varias personas', dialogo: ['Lo usaremos en clase.', 'Necesitamos que sea claro.'],
    pie: 'Alumnos, docentes y directivos tienen distintas necesidades sobre el juego.',
    detalles: [['juego','Alumnos','Los alumnos usan el videojuego para aprender.'], ['libro','Docentes','Los docentes revisan el contenido educativo del juego.'], ['documento','Dirección','La dirección acompaña las decisiones del proyecto escolar.']],
  },
  documentos: {
    titulo: 'Tres documentos sobre la mesa', dialogo: ['Guardemos los acuerdos.', 'Y lo que puede salir mal.'],
    pie: 'Relaciona cada documento con su propósito; las escenas no muestran los pares.',
    detalles: [['documento','Una aprobación','Un documento firmado representa una autorización.'], ['feria','Las partes de la feria','Los distintos puestos representan partes del proyecto.'], ['riesgo','Lluvia el día del evento','Una señal de riesgo recuerda prever problemas y respuestas.']],
  },
};

const iconosContextuales: Record<IconoContextual, () => string> = {
  juego: () => pantalla(80,30), calendario: () => calendario(88,35),
  tareas: tablero, charla: () => charla(65,35)+charla(128,65,azul),
  feria, documento: () => documento(96,30)+linea('M99 82l8-5 7 4 10-3',amarillo),
  obstaculo: () => caja(64,40,96,20,rosa)+caja(72,60,6,32)+caja(146,60,6,32)+linea('M72 42l16 16m10-16 16 16m10-16 16 16',tinta),
  avance: () => caja(32,35,160,16,tinta)+caja(35,38,154,10,azul)+caja(32,72,160,16,tinta)+caja(35,75,97,10,amarillo),
  libro: escenas.guia.dibujo,
  equipo: () => persona(39,48,rosa)+persona(102,38,azul)+persona(165,48,amarillo),
  riesgo: () => `<path d="M112 15L62 100h100z" fill="${amarillo}"/>`+caja(108,40,8,29,'#14213d')+caja(108,78,8,8,'#14213d'),
  herramientas: () => linea('M67 90l80-65m-70 0 70 65',amarillo)+caja(62,19,27,17,azul)+caja(136,16,22,20,rosa),
};

export function ilustracionReto(r: Reto, guia: ClavePersonaje): string {
  const muestra = escenaNarrativa(r.ilustracion);
  if (muestra) return muestra;
  const clave = r.ilustracion as ClaveContextual;
  const contexto = contextos[clave];
  const escena = escenas[clave];
  const companero = escena.companero === guia ? (guia === 'beto' ? 'lili' : 'beto') : escena.companero;
  return `<figure class="reto-visual escena-narrativa"><figcaption>${esc(contexto.titulo)}</figcaption>
    <div class="escena-dialogos"><p>${esc(contexto.dialogo[0])}</p><p>${esc(contexto.dialogo[1])}</p></div>
    <div class="proyecto-protagonista">${sprite(guia)}<div class="feria-central">${dibujo(escena.dibujo(),escena.descripcion)}</div>${sprite(companero)}</div>
    <div class="recursos-proyecto">${contexto.detalles.map(([icono, texto, descripcion])=>`<div>${dibujo(iconosContextuales[icono](),descripcion)}<span>${esc(texto)}</span></div>`).join('')}</div>
    <p class="escena-pie">${esc(contexto.pie)}</p></figure>`;
}
