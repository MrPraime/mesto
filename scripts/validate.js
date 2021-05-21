
// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const {inputErrorClass, errorClass} = config;

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const {inputErrorClass, errorClass} = config;

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

function toggleButtonState (inputList, buttonElement) {
  const {inactiveButtonClass} = config;

  if (hasInvalidInput(inputList)) {
    
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}
 
const setEventListeners = (formElement, config) => {
  const {inputSelector, submitButtonSelector, ...restConfig} = config;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector); 

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, restConfig);
      toggleButtonState(inputList, buttonElement);
    });
  });
  toggleButtonState (inputList, buttonElement);
}; 


function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}



const enableValidation = (config) => {
  const {formSelector, ...restConfig} = config;
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  setEventListeners(formElement, restConfig);
  });
    };