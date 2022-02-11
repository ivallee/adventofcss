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
  timerInput.value = `${leadingZeroes(minutesRemain)}:${leadingZeroes(secondsRemain)}`;
  if (diff > 0) {
    requestAnimationFrame(() => {
      updateCountdown(endDate, range);
    });
  } else {
    circle.classList.add('timer__ring-circle--complete');
    console.log('Timer up!');
  }
}

function convertToMs(time) {
  const [minutes, seconds] = time.split(':').map(parseFloat);
  return (minutes * 60000) + (seconds * 1000);
}

function startTimer(input) {
  const startDate = new Date();
  const ms = convertToMs(input.value);
  const endDate = new Date(startDate.getTime() + ms);
  const range = endDate - startDate;
  updateCountdown(endDate, range);
}

startButton.addEventListener('click', ({ target }) => {
  // TODO: convert to toggle off / on
  target.innerHTML = 'Stop';
  startTimer(timerInput);
});

/**
 * TODOS:
 * - Pause / stop timer
 * - Reset timer and ring class
 * - Validation for input to protect against missing : character
 * - Settings button to disable/enable input
 */