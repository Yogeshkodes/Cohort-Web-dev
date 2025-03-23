const InputValue = document.getElementById("number");
const btn = document.querySelector(".btn");
const showCountdown = document.getElementById("countdowndisplay");
const pausebutton = document.querySelector(".stop");
function showCount() {
  let input = parseInt(InputValue.value);

  if (isNaN(input)) {
    showCountdown.textContent = `Please input Valid Number`;
    InputValue.value = "";
    return;
  }

  if (input < 0) {
    showCountdown.textContent = `Please input Valid Seconds`;
    InputValue.value = "";
    return;
  }

  let isPaused = false;

  pausebutton.addEventListener("click", () => {
    isPaused = !isPaused;
    pausebutton.textContent = isPaused ? "Resume" : "Pause";
  });
  const intervalID = setInterval(() => {
    if (isPaused) return;
    input--;
    showCountdown.textContent = input;
    if (input <= 0) {
      showCountdown.textContent = `Time's Up ⏰`;
      clearInterval(intervalID);
    }
  }, 1000);
}

btn.addEventListener("click", showCount);

//button pe jb click ho rha hai tb input se valuee uthake
// input se value uthaake p tag me daaal
// then countdown turant start hona chahiye and it should decrease

// We have to add Pause and play button to stop and start countdown
