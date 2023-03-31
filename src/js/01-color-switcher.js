// Напиши скрипт, который после нажатия кнопки «Start», 
// раз в секунду меняет цвет фона < body > на случайное значение используя инлайн стиль.
// При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// ВНИМАНИЕ
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. 
// Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна(disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
buttonStopEl.disabled = true;
let intervalId = null;
// 
buttonStartEl.addEventListener('click', handleButtonStartElClick);
function handleButtonStartElClick(event) {
    intervalId = setInterval(changeBodyColor, 1000);
    console.log(intervalId)
    function changeBodyColor() {
       bodyEl.style.backgroundColor = getRandomHexColor(); 
    }
    // console.log(event)
    event.currentTarget.disabled = true;
    buttonStopEl.disabled = false;
    
}

buttonStopEl.addEventListener('click', handleButtonStopElClick);
function handleButtonStopElClick(event) {
    clearInterval(intervalId);
    event.currentTarget.disabled = true;
    buttonStartEl.disabled = false;
    intervalId = 1;
}




