/**
 * Write your challenge solution here
 */

const button = document.querySelector(".toggle-btn");
const panel = document.querySelector(".panel");
const close = document.querySelector(".close-btn");
const menuItem = document.querySelectorAll(".menu-item");
button.addEventListener("click", () => {
  panel.classList.toggle("active");
});

close.addEventListener("click", () => {
  panel.classList.remove("active");
});

menuItem.forEach((item) => {
  item.addEventListener("click", () => {
    alert(`You clicked ${item.textContent}`);
  });
});
