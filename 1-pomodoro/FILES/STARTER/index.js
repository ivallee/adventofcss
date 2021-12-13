const timer = document.querySelector('.timer__input');
const circle = document.querySelector('.timer__ring-circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  return offset;
}

function updateCountdown(endDate, range) {
  const diff = Math.max(0, endDate - new Date());

  const percentComplete = Math.floor(100 - 100 * diff / range);
  console.log(percentComplete)
  circle.style.strokeDashoffset = setProgress(percentComplete);
  // TODO: Update timer input
  
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