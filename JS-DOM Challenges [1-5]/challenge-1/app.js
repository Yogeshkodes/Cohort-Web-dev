/**
 * Write your challenge solution here
 */

const bulb = document.getElementById("bulb");
const button = document.getElementById("toggleButton");
const body = document.getElementById("body");
const Status = document.getElementById("status");
console.log(bulb);

button.addEventListener("click", () => {
  bulb.classList.toggle("off");
  body.classList.toggle("dark-mode");
  button.textContent =
    button.textContent === "Turn On" ? "Turn Off" : "Turn On";
  if (Status.textContent === `Status: Off`) {
    Status.textContent = `Status: On`;
  } else {
    Status.textContent = `Status: Off`;
  }
  console.log(bulb);
});
