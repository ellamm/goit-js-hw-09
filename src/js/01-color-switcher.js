const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.disabled = false;
stopBtn.disabled = true;

let timerId = null;

startBtn.addEventListener("click", onStartBtnClick);
stopBtn.addEventListener("click", onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
  timerId = setInterval(() => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    let color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
}

function onStopBtnClick() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
  console.log('Timer stopped');
}