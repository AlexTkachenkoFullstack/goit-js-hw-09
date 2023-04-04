// В HTML есть разметка формы, в поля которой пользователь будет вводить 
// первую задержку в миллисекундах, шаг увеличения задержки для каждого 
// промиса после первого и количество промисов которое необходимо создать.

// Напиши скрипт, который при сабмите формы вызывает функцию
// createPromise(position, delay) столько раз, сколько ввели в поле amount.
// При каждом вызове передай ей номер создаваемого промиса(position) 
// и задержку учитывая введенную пользователем первую задержку(delay) и шаг(step).

// Дополни код функции createPromise так, чтобы она возвращала один промис,
//   который выполянется или отклоняется через delay времени.
//   Значением промиса должен быть объект, в котором будут свойства position 
//   и delay со значениями одноименных параметров.
//   Используй начальный код функции для выбора того, что нужно сделать 
//   с промисом - выполнить или отклонить.
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handleFormElSubmit)

function handleFormElSubmit(event) {
  event.preventDefault();
  const inputDelayValue = Number(event.target.elements.delay.value);
  const inputStepValue = Number(event.target.elements.step.value);
  const inputAmountValue = Number(event.target.elements.amount.value);
  
  for (let i = 1; i <= inputAmountValue; i += 1) {
    let currentDelay = inputDelayValue + (i - 1) * inputStepValue;
  
    createPromise(i, currentDelay).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,
        {
          opacity: '0.9',
          timeout: 3000,
          backOverlay: false,
          clickToClose: 'true',
    
        });
  })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,
          {
          opacity: '0.9',
          timeout: 3000,
          clickToClose: 'true',
        });
  }); 
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  }
  );
}

  

