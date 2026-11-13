import { personajes } from '@/data/personajes';
import { rutas } from '@/data/rutas';
import { px, ruta } from '@/lib/assets';
import { pixel } from '@/lib/pixel';
import { estrellas, insignias, PUNTOS_MAXIMOS, rango, type Partida } from '@/game/estado';
import { globo } from '@/game/util';

const TOTAL_ESTRELLAS = 3;
const ALTO_ESTRELLA = 64;

/** Partida ganada: estrellas, puntos, rango, insignias y aviso de récord. */
export const final = (p: Partida): string => {
  const n = estrellas(p.puntos);
  const otra = rutas[p.ruta === 'scrum' ? 'pmbok' : 'scrum'];
  const lista = Array.from(
    { length: TOTAL_ESTRELLAS },
    (_, i) =>
      `<span class="estrella${i < n ? '' : ' off'}" style="animation-delay:${(i + 1) * 0.3}s">${pixel('estrella', ALTO_ESTRELLA)}</span>`,
  ).join('');
  return (
    `<p class="pixel kicker blink">Congratulations!</p>` +
    `<h1 class="pixel titulo">Juego completado</h1>` +
    `<div class="st" role="img" aria-label="${n} de ${TOTAL_ESTRELLAS} estrellas">${lista}</div>` +
    `<div class="caja pxb"><p class="pixel puntaje">${p.puntos} <small>de ${PUNTOS_MAXIMOS} puntos</small></p>` +
    `<p class="rango"><b>${rango(p.puntos, p.ruta)}</b>${p.nuevoRecord ? '. Nuevo mejor puntaje' : ''}</p></div>` +
    `<div class="insignias">${insignias(p)
      .map((b) => `<span class="ch pxb pixel">${b}</span>`)
      .join('')}</div>` +
    globo('pau', rutas[p.ruta].cierre) +
    `<section class="celebracion pxb" aria-label="El equipo celebra la ruta completada">` +
    `<div class="celebracion-trofeo"><span aria-hidden="true">${pixel('estrella', 24)}</span>` +
    `<svg viewBox="0 0 80 76" width="96" height="92" role="img" aria-label="Trofeo de misión completada" shape-rendering="crispEdges"><path d="M22 8H8v22h8v8h14M58 8h14v22h-8v8H50" fill="none" stroke="#d9a100" stroke-width="6"/><path d="M20 4h40v30h-6v10h-8v14H34V44h-8V34h-6z" fill="#ffd84d"/><path d="M26 10h6v22h-6z" fill="#fff1a1"/><path d="M39 14l4 8h9l-7 6 3 9-9-5-8 5 3-9-7-6h9z" fill="#a66b00"/><path d="M27 57h26v8H27z" fill="#d9a100"/><path d="M19 65h42v9H19z" fill="#a27a49"/></svg>` +
    `<span aria-hidden="true">${pixel('estrella', 24)}</span></div>` +
    `<p class="pixel celebracion-titulo">¡Misión cumplida!</p><p class="celebracion-ruta">Ruta ${rutas[p.ruta].nombre} completada</p>` +
    `<div class="celebracion-equipo">${Object.values(personajes).map((personaje) => `<img class="px" src="${px(personaje.sprites.base)}" alt="${personaje.nombre}" width="72" height="110">`).join('')}</div>` +
    `<p class="celebracion-cierre">¡El equipo llegó a la meta!</p></section>` +
    `<div class="acciones flex-wrap"><button class="start" data-accion="reiniciar">Jugar de nuevo</button>` +
    `<a class="alt pxb" href="${ruta(`/jugar/?ruta=${otra.clave}`)}">Jugar ${otra.nombre}</a><a class="alt pxb" href="${ruta('/')}">Inicio</a></div>`
  );
};
