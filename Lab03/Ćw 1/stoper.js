const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let time = 0;
let isRunning = false;

start.addEventListener("click", () => {
  isRunning = true;
});

stop.addEventListener("click", () => {
  isRunning = false;
});

reset.addEventListener("click", () => {
  isRunning = false;
  time = 0;
  displayTime();
});

function displayTime() {
  if (time < 60) {
    timer.innerHTML = time + "s";
  } else {
    timer.innerHTML = Math.floor(time / 60) + "min " + (time % 60) + "s";
  }
}

const oneSecondInterval = setInterval(() => {
  if (isRunning) time++;
  displayTime();
}, 1000);
