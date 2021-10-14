import Popup from "./Popup.js";


export class PopupWithConfirmation extends Popup {
    constructor(popUpSelector){
        super(popUpSelector);
    }


    setSubmitAction(action) {
      this._handleSubmitCallback = action;
      console.log(action)
    }
  
    setEventListeners() {
        super.setEventListeners();

        this._popup.querySelector('.popup__confirm').addEventListener('click', () => {
        this._handleSubmitCallback()
      });


      
    }
  }