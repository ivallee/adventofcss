const timerInput = document.querySelector('.timer__input');
const startButton = document.querySelector('.timer__start');
const circle = document.querySelector('.timer__ring-circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  return offset;
}

function leadingZeroes(number) {
  return number < 10 ? `0${number}` : number;
}

function updateCountdown(endDate, range) {
  const diff = Math.max(0, endDate - new Date());
  const minutesRemain = Math.floor((diff / 1000 / 60) % 60);
  const secondsRemain = Math.floor((diff / 1000) % 60);

  const percentComplete = Math.ceil(100 - 100 * diff / range);
  circle.style.strokeDashoffset = setProgress(percentComplete);
  timerInput.value = `${leadingZeroes(minutes)}:${leadingZeroes(seconds)}`;
  
  if (diff >= 0) {
    requestAnimationFrame(() => updateCountdown(endDate, range));
  }  
}

function startTimer(input) {
  const startDate = new Date();
  // TODO: make endDate dynamic based on timer input
  const endDate = new Date(startDate.getTime() + 10000); // + 10 seconds
  const range = endDate - startDate;
  updateCountdown(endDate, range);
}

startTimer();