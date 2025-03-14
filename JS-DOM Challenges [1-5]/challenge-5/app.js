/**
 * Write your challenge solution here
 */
//Image data
const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Beautiful Mountain Landscape",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Ocean Sunset View",
  },
  {
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Autumn Forest Path",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Urban City Skyline",
  },
];

const carouselTrack = document.getElementById("carouselTrack");
const caption = document.getElementById("caption");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const carouselNav = document.getElementById("carouselNav");
const autoPlayButton = document.getElementById("autoPlayButton");
const timerDisplay = document.getElementById("timerDisplay");

images.forEach((image, index) => {
  const img = document.createElement("img");
  img.setAttribute("src", `${image.url}`);
  img.setAttribute("alt", `${image.caption}`);
  img.classList.add("carousel-slide");
  if (index === 0) {
    img.classList.add("active");
    caption.textContent = `${image.caption}`;
  }

  const indicator = document.createElement("div");
  indicator.classList.add("carousel-indicator");
  if (index === 0) indicator.classList.add("active");
  indicator.addEventListener("click", () => nextButton.click());
  carouselNav.appendChild(indicator);

  carouselTrack.appendChild(img);
});

let currentIndex = 0;
nextButton.addEventListener("click", () => {
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const carouselindicator = document.querySelectorAll(".carousel-indicator");

  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  slides.forEach((slide, index) => {
    if (index === currentIndex) {
      slide.style.display = "block";
      carouselindicator[index].classList.add("active");
      caption.textContent = slide.getAttribute("alt");
    } else {
      carouselindicator[index].classList.remove("active");
      slide.style.display = "none";
    }
  });
});

prevButton.addEventListener("click", () => {
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  slides.forEach((slide, index) => {
    if (index === currentIndex) {
      slide.style.display = "block";
      caption.textContent = slide.getAttribute("alt");
    } else {
      slide.style.display = "none";
    }
  });
});
let isStart = false; // Tracks if auto-play is running
let intervalID; // For the combined interval
let counter = 5; // Countdown timer in seconds

autoPlayButton.addEventListener("click", () => {
  isStart = !isStart; // Toggle auto-play state
  autoPlayButton.textContent = isStart ? "Stop Auto Play" : "Start Auto Play";

  if (isStart) {
    // Reset counter and show initial countdown
    counter = 5;
    timerDisplay.textContent = `Next slide in ${counter}s`;

    // Start a single interval for both countdown and slide changing
    intervalID = setInterval(() => {
      if (counter < 1) {
        counter = 5; // Reset countdown after reaching 0
        nextButton.click(); // Simulate the "Next" button click
      }
      timerDisplay.textContent = `Next slide in ${counter}s`;
      counter--; // Decrement counter
    }, 1000); // Runs every second
  } else {
    // Stop the interval when auto-play is stopped
    clearInterval(intervalID);
    timerDisplay.textContent = ""; // Clear the timer display
  }
});
