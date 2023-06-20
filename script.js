'use strict';
// element
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const formEl = document.getElementById('form');
const btnSubmit = document.getElementById('btn-submit');

//  global variables
const inputs = [
  { input: usernameInput, message: 'username' },
  { input: emailInput, message: 'email address' },
  { input: passwordInput, message: 'password' },
  { input: confirmPasswordInput, message: 'password' },
];

//Functions
function showErrorMessage(input, message) {
  // parent element
  const formControlEl = input.parentElement;

  // change border color for input element
  input.classList.remove('success');
  input.classList.add('error-input');
  // child selector
  const errorEl = formControlEl.querySelector('.error');
  // updating the class
  errorEl.classList.add('error-message');
  // display message
  errorEl.innerText = message;
}

function showSuccess(input) {
  input.classList.add('success');

  // parent element
  const formControlEl = input.parentElement;
  // child selector
  const errorEl = formControlEl.querySelector('.error');
  // updating the class
  errorEl.classList.remove('error-message');
}

const checkRequired = function (input, message) {
  if (input.value.trim()) {
    // showSuccess(input);
  } else {
    showErrorMessage(input, `${message} is mandatory`);
  }
};

const checkLength = function (input, message, min, max) {
  if (input.value.trim().length < min) {
    showErrorMessage(input, `${message} should be at least ${min} character`);
  } else if (input.value.trim().length > max) {
    showErrorMessage(input, `${message} should be less than ${max} character`);
  } else {
    showSuccess(input);
  }
};

const isEmailAddress = function (str) {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(str);
};

const checkEmail = function (input) {
  if (isEmailAddress(input.value.trim())) {
    showSuccess(input);
  } else {
    showErrorMessage(input, `Enter the vaild email address`);
  }
};

const comparePassword = function (inputOne, inputTwo) {
  if (inputOne.value.trim() === inputTwo.value.trim()) {
    showSuccess(inputTwo);
  } else {
    showErrorMessage(
      inputTwo,
      'password and confirm password are not matching'
    );
  }
};
// eventListeners
formEl.addEventListener('submit', function (event) {
  event.preventDefault();

  for (let i = 0; i < inputs.length; i++) {
    checkRequired(inputs[i].input, inputs[i].message);
  }

  // check length

  checkLength(usernameInput, 'username', 5, 16);
  checkLength(passwordInput, 'password', 8, 12);
  checkEmail(emailInput);
  comparePassword(passwordInput, confirmPasswordInput);
});
