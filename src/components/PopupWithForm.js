import Popup from "./Popup.js";


export class PopupWithForm extends Popup {
    constructor(popUpSelector, submitHandler) {
        super(popUpSelector);


        this._formSubmit = submitHandler.bind(this);
        this._form = this._popup.querySelector('form')

        this._inputList = this._popup.querySelectorAll('.popup__input');
        
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

         this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            this._formSubmit(this._getInputValues());
        });
    }

    close(){
        super.close();

        this._form.reset();
    }
}



