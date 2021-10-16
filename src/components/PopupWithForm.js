import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popUpSelector, submitHandler) {
    super(popUpSelector);

    this._formSubmit = submitHandler.bind(this);
    this._form = this._popup.querySelector("form");

    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._submitBtn = this._popup.querySelector(".popup__save-button");
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  loading(wait) {
  const btnText = this._submitBtn.textContent;

  if (wait) {
    this._submitBtn.textContent += "...";
  } else {
    this._submitBtn.textContent = btnText.slice(0, btnText.length - 3);
  }
}

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._formSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._form.reset();
  }
}
