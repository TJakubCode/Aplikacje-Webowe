const images = [
  "https://kotando.pl/wp-content/uploads/2022/11/koty-syberyjskie.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/NevaMasqueradeFiona_%28cropped%29.jpg/1024px-NevaMasqueradeFiona_%28cropped%29.jpg",
  "https://nasze-zwierzaki.pl/wp-content/uploads/2021/02/ile-zyja-koty-syberyjskie.jpg",
];
let imageRef = [];

const cycleTime = 4000;

const container = document.getElementById("top-image");
const strip = document.getElementById("slide-image-container");
const dotsContainer = document.getElementById("slide-dots");
let dots = [];

for (let i = 0; i < images.length; i++) {
  const imageUrl = images[i];
  const img = document.createElement("img");
  img.src = imageUrl;
  imageRef.push(img);
  strip.appendChild(img);

  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.dataset.index = i;
  dot.addEventListener("click", () => {
    goToSlide(i);
  });
  dotsContainer.appendChild(dot);
  dots.push(dot);
}

strip.style.width = `${images.length * container.offsetWidth}px`;
let currentIndex = 0;
let slideInterval;

function setSlidePosition(useTransition = true) {
  const imageWidth = container.offsetWidth;
  for (let img of imageRef) {
    img.style.width = `${imageWidth}px`;
  }
  strip.style.width = `${images.length * container.offsetWidth}px`;
  const newPosition = -currentIndex * imageWidth;

  strip.style.transition = useTransition
    ? "transform 0.5s ease-in-out"
    : "none";
  strip.style.transform = `translateX(${newPosition}px)`;
  updateDots();
}

function updateDots() {
  for (let i = 0; i < 3; i++) {
    if (i == currentIndex) {
      dots[i].classList.add("active");
    } else {
      dots[i].classList.remove("active");
    }
  }
}

function updateSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  setSlidePosition(true);
  updateDots();
}

function goToSlide(index) {
  currentIndex = index;
  setSlidePosition(true);
  clearInterval(slideInterval);
  slideInterval = setInterval(updateSlide, cycleTime);
}

function handleResize() {
  setSlidePosition(false);
}

window.addEventListener("resize", handleResize);

setSlidePosition();

slideInterval = setInterval(updateSlide, cycleTime);

const topBar = document.querySelector(".top-bar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    topBar.classList.add("scrolled");
  } else {
    topBar.classList.remove("scrolled");
  }
});

document.getElementById("chevron-right").addEventListener("click", () => {
  updateSlide();
  clearInterval(slideInterval);
  slideInterval = setInterval(updateSlide, cycleTime);
});

document.getElementById("chevron-left").addEventListener("click", () => {
  currentIndex = (currentIndex + images.length - 1) % images.length;
  setSlidePosition(true);
  clearInterval(slideInterval);
  slideInterval = setInterval(updateSlide, cycleTime);
});
