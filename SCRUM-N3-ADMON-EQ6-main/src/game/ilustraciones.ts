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

export function ilustracionReto(r: Reto, guia: ClavePersonaje): string {
  const escena = escenas[r.ilustracion];
  if (!escena) return '';
  const companero = escena.companero === guia ? 'beto' : escena.companero;
  return `<figure class="reto-visual pxb"><div class="reto-visual-escena"><img class="px visual-personaje" src="${px(guia)}" alt="${esc(personajes[guia].nombre)}" width="90" height="120"><div class="visual-pizarra"><svg viewBox="0 0 224 124" role="img" aria-label="${esc(escena.descripcion)}" shape-rendering="crispEdges">${escena.dibujo()}</svg></div><img class="px visual-personaje" src="${px(companero)}" alt="${esc(personajes[companero].nombre)}" width="90" height="120"></div><figcaption>${esc(escena.titulo)}</figcaption></figure>`;
}
