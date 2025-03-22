const displaytime = document.querySelector(".time");

const displaydate = document.querySelector(".date");

setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const Twelevehours = hours % 12 === 0 ? 12 : hours % 12;
  const correctedhours = Twelevehours.toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const options = {
    year: "numeric",
    weekday: "long",
    day: "numeric",
  };
  const date = now.toLocaleDateString("en-US", options);
  displaytime.textContent = `${correctedhours}:${minutes}:${seconds} ${ampm}`;
  displaydate.textContent = date;
}, 100);
