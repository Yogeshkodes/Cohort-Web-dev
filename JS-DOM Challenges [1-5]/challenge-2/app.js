/**
 * Write your challenge solution here
 */

const button = document.querySelectorAll(".color-buttons button");
const h1 = document.getElementById("mainHeading");
button.forEach((button) => {
  button.addEventListener("click", (e) => {
    h1.style.color = `${button.textContent}`;
  });
});

