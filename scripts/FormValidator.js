export class FormValidator {
  constructor(config, formElement) { 
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    } 

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    };
  
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
       this._hideInputError(inputElement);
       
      }
    };
    
    _toggleButtonState() {
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector); 
      if (this._hasInvalidInput()) {
        buttonElement.disabled = true;
        buttonElement.classList.add(this._inactiveButtonClass);

      } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(this._inactiveButtonClass);
      }
    }

    _setEventListeners() {
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    };


    _hasInvalidInput () {
      return this._inputList.some((formElement) => {
        return !formElement.validity.valid;
      });
    }
    
    enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
        
      this._setEventListeners();
    };
}