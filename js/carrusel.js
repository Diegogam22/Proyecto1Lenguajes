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

const carouselImagesContainer = document.getElementById(
  "carousel-images-container"
);
const carouselButtonsContainer = document.getElementById(
  "carousel-buttons-container"
);

const imagesMapped = images
  .map(
    (imageUrl, index) =>
      `<img class="carousel-image ${
        index === 0 ? "active" : ""
      }" src="${imageUrl}" alt="Foto del carrousel" loading="lazy"/>`
  )
  .join("");

const buttonsMapped = images
  .map(
    (imageUrl, index) =>
      `<button type="button" class="carousel-button ${
        index === 0 ? "active" : ""
      }"></button>`
  )
  .join("");

carouselImagesContainer.insertAdjacentHTML("beforeend", imagesMapped);
carouselButtonsContainer.insertAdjacentHTML("beforeend", buttonsMapped);

let currentIndex = 0;
let autoRotateTimeout;

const updateIndex = (newIndex) =>
  (currentIndex = ((newIndex % images.length) + images.length) % images.length);

const showImage = (index) => {
  carouselButtonsContainer
    .querySelector(".carousel-button.active")
    .classList.remove("active");
  carouselButtonsContainer
    .querySelectorAll(".carousel-button")
    [index].classList.add("active");
  carouselImagesContainer.style.transform = `translateX(-${index * 100}%)`;
};

const autoRotateCarousel = () => {
  updateIndex(currentIndex);
  showImage(currentIndex);
  currentIndex++;
  autoRotateTimeout = setTimeout(autoRotateCarousel, 3000);
};

const buttons = document.querySelectorAll(".carousel-button");
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    clearTimeout(autoRotateTimeout);
    updateIndex(index);
    showImage(currentIndex);
    autoRotateTimeout = setTimeout(autoRotateCarousel, 3000);
  });
});

autoRotateCarousel();
