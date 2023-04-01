// Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты.
// Такой таймер может использоваться в блогах и интернет - магазинах,
//     страницах регистрации событий, во время технического обслуживания и т.д.
//     Посмотри демо видео работы таймера.
// В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки,
//     при клике по которой таймер должен запускаться.
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';
import "notiflix/dist/notiflix-3.2.6.min.css"


const refs = {
    inputDateTimePickerEl: document.querySelector('#datetime-picker'),
    buttonStartEl : document.querySelector('button[data-start]'),
    daysEl: document.querySelector('.value[data-days]'),
    hoursEl: document.querySelector('.value[data-hours]'),
    minutesEl: document.querySelector('.value[data-minutes]'),
    secondsEl : document.querySelector('.value[data-seconds]'),
}

let eventDate = null;
let intervalId = null;
refs.buttonStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
          Report.warning(
  'Event date selection error',
  'You cannot create events for this date as it has already passed. Please choose a date in the future',
  'Close this message',
  {
    width: '460px',
      svgSize: '120px',
      titleFontSize: '30px',
      messageFontSize: '18px',
      buttonFontSize: '18px',
      cssAnimationDuration: '800',
      cssAnimationStyle: 'fade',
  },
        );
    refs.buttonStartEl.disabled = true;    
return
      }
      refs.buttonStartEl.disabled = false;
    eventDate = selectedDates[0].getTime();
    refs.buttonStartEl.classList.add('button-is-active');
  },
};
flatpickr(refs.inputDateTimePickerEl, options)


refs.buttonStartEl.addEventListener('click', handleButtonStartElClick);
function handleButtonStartElClick(event) {
  refs.inputDateTimePickerEl.nextElementSibling.classList.remove('overlay');
    refs.inputDateTimePickerEl.style.borderColor='black';
     intervalId=setInterval(showTimeLeft, 1000);
  showTimeLeft()
}

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours =  addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes =  addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds =  addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    let valueToString = value.toString();
  return  valueToString.padStart(2, 0)
}

function showTimeLeft() {
    refs.inputDateTimePickerEl.disabled = true;
  refs.buttonStartEl.disabled = true;
  
        const dateNow = Date.now();
        let timeLeftInMs =eventDate-dateNow ;
        
        const timeLeftInArrey = convertMs(timeLeftInMs);
        const { days, hours, minutes, seconds }=timeLeftInArrey
        refs.daysEl.textContent = days;
        refs.hoursEl.textContent = hours;
        refs.minutesEl.textContent = minutes;
        refs.secondsEl.textContent = seconds;
        if (days==='00' && hours==='00' && minutes==='00' && seconds==='00') {
            clearInterval(intervalId);
            console.log('Sale time is over. Try next time.')
            return
        }
    }