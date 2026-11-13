export type ClavePersonaje = 'beto' | 'riqui' | 'lili' | 'inge' | 'tono' | 'pau';
export type ClaveSprite = ClavePersonaje | `${ClavePersonaje}1` | `${ClavePersonaje}2`;
export type ClaveFondo = 'b0' | 'b1' | 'b2';
export type ClaveImagen = ClaveSprite | ClaveFondo | 'group';

export interface Personaje {
  clave: ClavePersonaje;
  nombre: string;
  color: string;
  sprites: { base: ClaveSprite; feliz: ClaveSprite; triste: ClaveSprite };
}

interface RetoBase {
  pregunta: string;
  explicacion: string;
}
export interface RetoOpcionMultiple extends RetoBase {
  tipo: 'mc';
  correcta: string;
  incorrectas: [string, string];
}
export interface RetoOrdenar extends RetoBase {
  tipo: 'ord';
  /** Pasos en el orden correcto. */
  pasos: string[];
}
export interface RetoRelacionar extends RetoBase {
  tipo: 'rel';
  /** [izquierda, derecha] correctos. */
  pares: [string, string][];
}
export type Reto = RetoOpcionMultiple | RetoOrdenar | RetoRelacionar;

export interface Linea {
  personaje: ClavePersonaje;
  texto: string;
}
export interface Escenario {
  titulo: string;
  tema: string;
  fondo: ClaveFondo;
  guia: ClavePersonaje;
  intro: Linea[];
  retos: Reto[];
}

export type ClaveRuta = 'scrum' | 'pmbok';
export interface Ruta {
  clave: ClaveRuta;
  nombre: string;
  escenarios: Escenario[];
  /** Rango con 100 puntos o más. */
  maestro: string;
  /** Globo del resultado de escenario con 40 puntos y con menos. */
  perfecto: string;
  bien: string;
  /** Globo de Pau en la pantalla final. */
  cierre: string;
}
