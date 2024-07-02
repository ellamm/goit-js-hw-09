import Notiflix from 'notiflix';

const form = document.querySelector('form');
let delay = document.querySelector('input[name="delay"]');
let step = document.querySelector('input[name="step"]');
let amount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
  }, delay)})
};

function onSubmitForm(e) {
  e.preventDefault();
  delay = Number(e.currentTarget.delay.value);
  console.log(delay)
  step = Number(e.currentTarget.step.value);
  console.log(step)
  amount = Number(e.currentTarget.amount.value);
  console.log(amount)
  if (delay >= 0 && step >= 0 && amount > 0) {
    for (let position = 1; position <= amount; position += 1) {
      delay += step;
      createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(
    `✅ Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(
    `❌ Rejected promise ${position} in ${delay}ms`);
    console.log(`❌ Rejected promise ${position} in ${delay}ms`)
  }) } } else {
    Notiflix.Notify.warning('Memento te hominem esse');} 
  }