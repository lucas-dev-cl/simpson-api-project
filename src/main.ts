// =============================================
// INTERFACES
// =============================================

// Interfaz para la respuesta paginada de la API
export interface IResponseApi {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: SimpsonCharacter[];
}

// Interfaz principal del personaje
export interface SimpsonCharacter {
  id: number;
  age: number | null;
  birthdate: string | null;
  description: string;
  first_appearance_ep_id: number | null;
  first_appearance_sh_id: number | null;
  gender: string;
  name: string;
  occupation: string;
  phrases: string[];
  portrait_path: string;
  status: string;
  first_appearance_ep: FirstAppearance | null;
  first_appearance_sh: FirstAppearance | null;
}

// Interfaz para los detalles de la primera aparición
export interface FirstAppearance {
  id: number;
  airdate: string;
  description: string;
  episode_number: number;
  image_path: string;
  name: string;
  season: number;
  synopsis: string;
}

// =============================================
// CONSTANTES Y VARIABLES
// =============================================

// URL base de la API de los Simpsons
const BASE_URL_API = "https://thesimpsonsapi.com/api/characters";

// URL base para las imágenes de los personajes
const BASE_URL_IMAGE = "https://cdn.thesimpsonsapi.com/500";

// Referencias a los elementos del DOM
const btnCargar = document.getElementById("btn-cargar") as HTMLButtonElement;
const sectionLoading = document.getElementById("loading") as HTMLElement;
const divMensajeError = document.getElementById("mensaje-error") as HTMLDivElement;
const contenedorPersonajes = document.getElementById("contenedor-personajes") as HTMLElement;

// Página actual para la paginación
let paginaActual: number = 1;

// URL de la siguiente página (null si no hay más)
let nextPageUrl: string | null = null;

// =============================================
// FUNCIONES
// =============================================

/**
 * Construye la URL completa de la imagen de un personaje
 */
function obtenerUrlImagen(personaje: SimpsonCharacter): string {
  return `${BASE_URL_IMAGE}${personaje.portrait_path}`;
}

/**
 * Muestra el indicador de carga y oculta mensajes de error previos
 */
function showLoading(): void {
  sectionLoading.hidden = false;
  divMensajeError.hidden = true;
  divMensajeError.textContent = "";
}

/**
 * Oculta el indicador de carga
 */
function hideLoading(): void {
  sectionLoading.hidden = true;
}

/**
 * Muestra un mensaje de error al usuario y lo oculta automáticamente después de 5 segundos
 * @param messageError Mensaje para mostrar al usuario
 */
function showError(messageError: string): void {
  console.error(messageError);
  divMensajeError.textContent = messageError;
  divMensajeError.hidden = false;

  setTimeout(() => {
    divMensajeError.hidden = true;
    divMensajeError.textContent = "";
  }, 5000);
}

/**
 * Crea una tarjeta HTML para un personaje
 * @param character Personaje con el que se construye la tarjeta
 */
function createCharacterCard(character: SimpsonCharacter): HTMLElement {
  const card = document.createElement("div");
  card.classList.add("character-card");

  // Imagen del personaje
  const img = document.createElement("img");
  img.src = obtenerUrlImagen(character);
  img.alt = character.name;

  // Nombre del personaje
  const nombre = document.createElement("h3");
  nombre.textContent = character.name;

  // Primera frase disponible
  const frase = document.createElement("p");
  frase.textContent = character.phrases.length > 0
    ? `"${character.phrases[0]}"`
    : "Sin frases disponibles.";

  card.appendChild(img);
  card.appendChild(nombre);
  card.appendChild(frase);

  return card;
}

/**
 * Agrega los personajes al contenedor, limpiando los anteriores primero
 * @param characters Array de personajes a mostrar
 */
const renderCharacters = (characters: SimpsonCharacter[]): void => {
  contenedorPersonajes.innerHTML = "";
  characters.forEach((character) => {
    const card = createCharacterCard(character);
    contenedorPersonajes.appendChild(card);
  });
};

/**
 * Actualiza el texto y estado del botón según si hay más páginas
 */
function actualizarBoton(): void {
  if (nextPageUrl === null) {
    btnCargar.textContent = "No hay más personajes";
    btnCargar.disabled = true;
  } else {
    btnCargar.textContent = `Cargar más personajes (página ${paginaActual})`;
    btnCargar.disabled = false;
  }
}

/**
 * Obtiene los personajes de la página actual desde la API usando fetch + .then()
 */
function fetchCharacters(): void {
  // En la primera carga usamos la URL base, luego usamos nextPageUrl
  const url = paginaActual === 1
    ? BASE_URL_API
    : `${BASE_URL_API}?page=${paginaActual}`;

  showLoading();
  btnCargar.disabled = true;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.status}`);
      }
      return response.json() as Promise<IResponseApi>;
    })
    .then((data: IResponseApi) => {
      renderCharacters(data.results);
      nextPageUrl = data.next;
      paginaActual++;
      actualizarBoton();
    })
    .catch((error: Error) => {
      showError(`No se pudieron cargar los personajes: ${error.message}`);
      btnCargar.disabled = false;
    })
    .finally(() => {
      hideLoading();
    });
}

// =============================================
// EVENTOS
// =============================================

btnCargar.addEventListener("click", fetchCharacters);
