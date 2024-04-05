const images = [
  "../img/dermatologia.jpg",
  "../img/pediatria.jpg",
  "../img/Ginecologia.webp",
  "../img/Cardiologia.webp",
  "../img/cirugia.webp",
  "../img/endocrinologia.jpg",
  "../img/neurologia.jpg",
  "../img/oftalmologia.jpg",
  "../img/ortopedia.jpg",
];

// recupera las imágenes del carrusel y los botones del html
const carouselImagesContainer = document.getElementById(
  "carousel-images-container"
);
const carouselButtonsContainer = document.getElementById(
  "carousel-buttons-container"
);

// recupera las imagenes del array para generar el html
const imagesMapped = images
  .map(
    (imageUrl, index) =>
      `<img class="carousel-image ${
        index === 0 ? "active" : ""
      }" src="${imageUrl}" alt="Foto del carrousel" loading="lazy"/>`
  )
  .join("");

// lo mismo pero para los botones
const buttonsMapped = images
  .map(
    (imageUrl, index) =>
      `<button type="button" class="carousel-button ${
        index === 0 ? "active" : ""
      }"></button>`
  )
  .join("");

// inserta el html con las imagenes y botones
carouselImagesContainer.insertAdjacentHTML("beforeend", imagesMapped);
carouselButtonsContainer.insertAdjacentHTML("beforeend", buttonsMapped);

// sirve para rastrear el índice actual del carrusel y el tiempo de espera de rotación automática mas adelante
let currentIndex = 0;
let autoRotateTimeout;

// actualiza el índice del carrusel, (el que se muestra)
const updateIndex = (newIndex) =>
  (currentIndex = ((newIndex % images.length) + images.length) % images.length);

// muestra la imagen correspondiente según el índice proporcionado
const showImage = (index) => {
  // Desactivar el botón activo actualmente
  carouselButtonsContainer
    .querySelector(".carousel-button.active")
    .classList.remove("active");
  // Activar el botón correspondiente al índice dado
  carouselButtonsContainer
    .querySelectorAll(".carousel-button")
    [index].classList.add("active");
  // Desplazar las imágenes del carrusel al índice proporcionado
  carouselImagesContainer.style.transform = `translateX(-${index * 100}%)`;
};

// rotar automáticamente las imágenes del carrusel
const autoRotateCarousel = () => {
  // Actualizar el índice del carrusel y mostrar la imagen correspondiente
  updateIndex(currentIndex);
  showImage(currentIndex);
  // Incrementar el índice para la próxima rotación automática
  currentIndex++;
  // Establecer un temporizador para la siguiente rotación automática
  autoRotateTimeout = setTimeout(autoRotateCarousel, 3000);
};

// Obtener todos los botones del carrusel y asignarles un evento de clic
const buttons = document.querySelectorAll(".carousel-button");
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Limpiar el temporizador de rotación automática al hacer clic en un botón
    clearTimeout(autoRotateTimeout);
    // Actualizar el índice del carrusel y mostrar la imagen correspondiente
    updateIndex(index);
    showImage(currentIndex);
    // Reiniciar la rotación automática después de un tiempo de espera
    autoRotateTimeout = setTimeout(autoRotateCarousel, 3000);
  });
});

// Iniciar la rotación automática del carrusel al cargar la página
autoRotateCarousel();
