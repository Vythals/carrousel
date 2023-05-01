const images = document.querySelectorAll(".galerie__img");
const carrousel = document.querySelector(".carrousel");
const carrouselImg = document.querySelector(".carrousel__img");
const carrouselClose = document.querySelector(".carrousel__x");
let currentIndex = 0;

// Ajout des images au carrousel
function addImages() {
  images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.dataset.index = index;
    img.addEventListener("click", () => {
      currentIndex = index;
      showCarrousel();
    });
    carrousel.appendChild(img);
  });
}

// Affichage du carrousel
function showCarrousel() {
  carrouselImg.src = images[currentIndex].src;
  carrouselImg.alt = images[currentIndex].alt;
  carrousel.classList.add("carrousel--activer");
}

// Fermeture du carrousel
function closeCarrousel() {
  carrousel.classList.remove("carrousel--activer");
}

// Navigation dans le carrousel
function navigateCarrousel(event) {
  if (event.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    carrouselImg.src = images[currentIndex].src;
    carrouselImg.alt = images[currentIndex].alt;
  } else if (event.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % images.length;
    carrouselImg.src = images[currentIndex].src;
    carrouselImg.alt = images[currentIndex].alt;
  }
}

// Ajout des écouteurs d'événements
addImages();
carrouselClose.addEventListener("click", closeCarrousel);
document.addEventListener("keydown", navigateCarrousel);
