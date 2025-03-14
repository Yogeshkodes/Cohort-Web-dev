/**
 * Write your challenge solution here
 */

const digitalClock = document.querySelector(".digital-clock");
const date = document.querySelector(".date");

const Clock = document.querySelectorAll(".hand");
const Hour = document.querySelector(".hour");
const Minute = document.querySelector(".minute");
const Second = document.querySelector(".second");

function createClockNumbers() {
  const clock = document.querySelector(".clock");

  for (let i = 1; i <= 12; i++) {
    const numberElement = document.createElement("div");
    numberElement.classList.add("number");
    // rotation angle for the number
    const angle = i * 30 * (Math.PI / 180);
    const radius = 125;
    const x = Math.cos(angle - Math.PI / 2) * radius;
    const y = Math.sin(angle - Math.PI / 2) * radius;
    // Position the number
    numberElement.style.transform = `translate(${x}px, ${y}px) 
    translate(0%, 36%)`;
    numberElement.innerHTML = `<span>${i}</span>`;
    clock.appendChild(numberElement);
  }
}

function showTime() {
  setInterval(() => {
    const Time = new Date();
    const Twelvehour = Time.getHours() - 12 === 0 ? 12 : Time.getHours() - 12;
    const hour = Twelvehour < 10 ? `0${Twelvehour}` : `${Twelvehour}`;
    const minute =
      Time.getMinutes() < 10 ? `0${Time.getMinutes()}` : `${Time.getMinutes()}`;
    const seconds =
      Time.getSeconds() < 10 ? `0${Time.getSeconds()}` : `${Time.getSeconds()}`;

    const hourDeg = hour * 30 + minute / 2;
    const minuteDeg = minute * 6;
    const secondDeg = seconds * 6;

    Hour.style.transform = `rotate(${hourDeg}deg)`;
    Minute.style.transform = `rotate(${minuteDeg}deg)`;
    Second.style.transform = `rotate(${secondDeg}deg)`;

    digitalClock.textContent = `${hour}:${minute}:${seconds}`;
  }, 1000);
}
createClockNumbers();
showTime();
