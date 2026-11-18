import type { ClaveIlustracion, ClavePersonaje, Reto } from '@/data/tipos';
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
const puesto = (x: number, y: number) =>
  caja(x, y, 54, 9, rosa) + caja(x + 4, y + 9, 4, 35, tinta) +
  caja(x + 46, y + 9, 4, 35, tinta) + caja(x + 4, y + 28, 46, 16, '#a27a49') +
  caja(x + 12, y + 19, 12, 9, amarillo) + caja(x + 30, y + 16, 12, 12, azul);

const iconos = {
  calendario: calendario(24, 18),
  juego: pantalla(17, 11),
  fallo: pantalla(17, 11) + linea('M60 19l10 10m0-10L60 29', rosa),
  charla: charla(15, 14) + charla(49, 37, azul),
  tareas: nota(16, 25, rosa) + nota(39, 16) + nota(62, 34, azul),
  equipo: persona(12, 26, rosa) + persona(38, 17, amarillo) + persona(64, 26),
  acceso: '<path d="M35 34V24a13 13 0 0 1 26 0v10" fill="none" stroke="#f2f0e6" stroke-width="4"/>' +
    caja(27, 33, 42, 24, amarillo) + caja(46, 40, 4, 10, '#14213d'),
  plano: caja(23, 13, 50, 50, azul) + linea('M32 22h31v31H32zM47 22v18h16'),
  feria: puesto(21, 16),
  lista: documento(32, 14),
  guia: linea('M48 21Q33 11 14 16v37q19-5 34 5 15-10 34-5V16q-19-5-34 5v37') +
    linea('M21 28h17m-17 9h17m19-9h17m-17 9h17', azul),
  dinero: '<circle cx="48" cy="37" r="23" fill="#ffd84d"/>' +
    linea('M57 27H40v10h16v10H39m9-24v28', '#14213d'),
  herramientas: linea('M26 55l37-37m-34 0 36 36', amarillo) + caja(57, 13, 16, 12, azul),
  firma: documento(25, 12) + linea('M31 49l7-6 6 5 7-4', azul) +
    '<circle cx="62" cy="53" r="11" fill="#ff7aa8"/>',
  decoracion: linea('M12 22h72') +
    '<path d="M18 24h16l-8 15zm22 0h16l-8 15zm22 0h16l-8 15z" fill="#ff7aa8"/>',
  lluvia: '<path d="M28 40a10 10 0 0 1 0-20 17 17 0 0 1 31 4 8 8 0 0 1 6 16z" fill="#f2f0e6"/>' +
    linea('M36 47l-5 9m18-9-5 9m18-9-5 9', azul),
};

interface Escena {
  titulo: string;
  companero: ClavePersonaje;
  detalles: readonly [icono: keyof typeof iconos, texto: string, etiqueta?: string][];
}

/** Las ilustraciones dan contexto sin resolver secuencias ni emparejamientos. */
const escenas: Record<ClaveIlustracion, Escena> = {
  equipo: {
    titulo: 'El equipo mejora el videojuego',
    companero: 'beto',
    detalles: [['juego', 'Prueban el mapa'], ['charla', 'Un jugador se pierde'], ['plano', 'Aclaran la salida']],
  },
  sprints: {
    titulo: 'El equipo crea un videojuego',
    companero: 'riqui',
    detalles: [
      ['calendario', 'Crear el mapa', 'Periodo 1'],
      ['calendario', 'Añadir sonido', 'Periodo 2'],
      ['calendario', 'Probar controles', 'Periodo 3'],
    ],
  },
  evidencia: {
    titulo: 'El personaje se queda en el suelo',
    companero: 'tono',
    detalles: [['juego', 'Pulsan «Saltar»'], ['fallo', 'No se mueve'], ['lista', 'Anotan el fallo']],
  },
  ciclo: {
    titulo: 'Cuatro momentos del trabajo en el juego',
    companero: 'beto',
    detalles: [
      ['juego', 'Invitados prueban el mapa'], ['tareas', 'Eligen qué construir'],
      ['charla', 'Revisan cómo colaboraron'], ['herramientas', 'Programan y prueban'],
    ],
  },
  backlog: {
    titulo: 'Los jugadores dicen que cuesta saltar',
    companero: 'riqui',
    detalles: [['fallo', 'Arreglar el salto', 'Primero'], ['plano', 'Crear otro mapa', 'Después'], ['tareas', 'Añadir música', 'Después']],
  },
  impedimentos: {
    titulo: 'El equipo no puede abrir los archivos',
    companero: 'inge',
    detalles: [['acceso', 'Falta permiso'], ['charla', 'Alguien pide acceso'], ['juego', 'El equipo sigue']],
  },
  desarrollo: {
    titulo: 'Tres personas crean la misma pantalla',
    companero: 'tono',
    detalles: [['plano', 'Diseña la pantalla'], ['juego', 'Programa el menú'], ['lista', 'Prueba los botones']],
  },
  roles: {
    titulo: 'El videojuego tiene tres pendientes',
    companero: 'inge',
    detalles: [['acceso', 'Recuperar acceso'], ['juego', 'Construir un nivel'], ['tareas', 'Elegir qué va primero']],
  },
  planning: {
    titulo: 'El equipo decide qué cabe esta vez',
    companero: 'lili',
    detalles: [['plano', 'Meta: mapa jugable'], ['calendario', 'Hay 5 días'], ['tareas', 'Eligen las tareas']],
  },
  daily: {
    titulo: 'El equipo se reúne antes de seguir',
    companero: 'tono',
    detalles: [['plano', 'Mapa listo'], ['herramientas', 'Sonido en curso'], ['fallo', 'Controles bloqueados']],
  },
  review: {
    titulo: 'Un invitado prueba el mapa',
    companero: 'lili',
    detalles: [['juego', 'Juega el nivel'], ['charla', '«No encuentro la salida»'], ['lista', 'El equipo toma nota']],
  },
  eventos: {
    titulo: 'El equipo se reúne en distintas situaciones',
    companero: 'tono',
    detalles: [['charla', 'Hablan de cómo colaboran'], ['equipo', 'Comentan un bloqueo'], ['juego', 'Invitan a probar el mapa']],
  },
  proyecto: {
    titulo: 'La escuela prepara una feria',
    companero: 'beto',
    detalles: [['plano', 'Hoy: patio vacío'], ['calendario', 'Feria el viernes'], ['feria', 'Patio con puestos']],
  },
  guia: {
    titulo: 'El equipo consulta un manual para organizar la feria',
    companero: 'inge',
    detalles: [['guia', 'Cómo planear'], ['lluvia', 'Qué podría fallar'], ['charla', 'A quién avisar']],
  },
  triangulo: {
    titulo: '¿Cabe un cuarto puesto en la feria?',
    companero: 'pau',
    detalles: [['feria', '3 puestos previstos'], ['calendario', '10 días'], ['dinero', '$2,000 disponibles']],
  },
  conceptos: {
    titulo: 'Tres trabajos en la escuela',
    companero: 'inge',
    detalles: [['equipo', 'Coordinar al equipo'], ['feria', 'Montar la feria del viernes'], ['calendario', 'Limpiar cada semana']],
  },
  predictivo: {
    titulo: 'Todo acordado antes de montar los puestos',
    companero: 'lili',
    detalles: [['plano', 'Plano aprobado'], ['calendario', 'Fechas fijadas'], ['dinero', 'Presupuesto cerrado']],
  },
  hibrido: {
    titulo: 'La feria tiene una fecha fija y un diseño a prueba',
    companero: 'riqui',
    detalles: [['calendario', 'Fecha fija'], ['dinero', 'Presupuesto fijo'], ['plano', 'Ajustan la maqueta tras probarla']],
  },
  control: {
    titulo: 'Hoy falta un puesto por montar',
    companero: 'tono',
    detalles: [['lista', '3 puestos previstos'], ['feria', '2 puestos listos'], ['equipo', 'Una persona se suma al montaje']],
  },
  procesos: {
    titulo: 'Sobre la mesa hay borradores, fotos y acuerdos',
    companero: 'lili',
    detalles: [['feria', 'Fotos del montaje'], ['firma', 'Acuerdos de la feria'], ['lista', 'Registro de avance durante todo el trabajo']],
  },
  acta: {
    titulo: 'La feria tiene un plan y espera el visto bueno',
    companero: 'inge',
    detalles: [['plano', 'Boceto de la feria'], ['firma', 'Dirección firma'], ['herramientas', 'Arranca el montaje']],
  },
  edt: {
    titulo: 'La feria se divide en partes',
    companero: 'pau',
    detalles: [['feria', 'Puestos'], ['decoracion', 'Decoración'], ['lista', 'Actividades']],
  },
  interesados: {
    titulo: 'La feria afecta a varias personas',
    companero: 'tono',
    detalles: [['equipo', 'Alumnos organizan'], ['feria', 'Familias visitan'], ['charla', 'Vecinos piden menos ruido']],
  },
  documentos: {
    titulo: 'Tres asuntos pendientes antes de la feria',
    companero: 'pau',
    detalles: [['lluvia', 'Puede llover'], ['plano', 'Hay que dividir el trabajo'], ['firma', 'Falta autorización']],
  },
};

const sprite = (clave: ClavePersonaje) =>
  `<img class="px escena-actor" src="${px(clave)}" alt="" width="90" height="120">`;

export function ilustracionReto(r: Reto, guia: ClavePersonaje): string {
  const { titulo, companero, detalles } = escenas[r.ilustracion];
  const segundo = companero === guia ? (guia === 'beto' ? 'lili' : 'beto') : companero;

  return `<figure class="reto-visual">
    <figcaption>${esc(titulo)}</figcaption>
    <div class="escena-ejemplo">
      ${sprite(guia)}
      <ul class="pizarra-ejemplo${detalles.length === 4 ? ' cuatro' : ''}">${detalles.map(([icono, texto, etiqueta]) => `
        <li>
          <svg viewBox="0 0 96 72" aria-hidden="true" shape-rendering="crispEdges">${iconos[icono]}</svg>
          ${etiqueta ? `<strong>${esc(etiqueta)}</strong>` : ''}
          <span>${esc(texto)}</span>
        </li>`).join('')}
      </ul>
      ${sprite(segundo)}
    </div>
  </figure>`;
}
