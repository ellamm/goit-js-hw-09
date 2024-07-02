import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
        startBtn.disabled = true;
        Notiflix.Notify.failure('Please choose a date in the future');
        myFun()
    }
    else {
      startBtn.disabled = false;
    }
  },
};

function myFun() {
    let elem = document.querySelector("button");
    elem.classList.add("newclass");        
}

function onStartTimer() {
    let timerId = setInterval(() => {
        
        let newDate = new Date(input.value) - new Date();
        startBtn.disabled = true;
        if (newDate >= 0) {
            let newTime = convertMs(newDate);
            days.textContent = addLeadingZero(newTime.days);
            hours.textContent = addLeadingZero(newTime.hours);
            minutes.textContent = addLeadingZero(newTime.minutes);
            seconds.textContent = addLeadingZero(newTime.seconds);
        } 
        else if (newDate <= 1) {
            Notiflix.Notify.failure('Qui timide rogat docet negare');
            clearInterval(timerId);
        }
    }, 1000);
}

flatpickr(input, options);
startBtn.addEventListener('click', onStartTimer);