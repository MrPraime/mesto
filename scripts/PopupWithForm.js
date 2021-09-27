import Popup from "./Popup.js";


export class PopupWithForm extends Popup {
    constructor({popUpSelector, formSelector, handleFormSubmit}) {
        super(popUpSelector);

        this._formSelector = formSelector;

        this._handleFormSubmit = handleFormSubmit;

        this._inputList = this._formSelector.querySelectorAll('.popup__input');
        
    }
    
    _getInputValues(){
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
          });
      
          return this._formValues;
    }
    

    setEventListeners() {
         super.setEventListeners();

        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close(){
        super.close();

       this._formSelector.reset();
    }
}
