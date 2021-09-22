import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(data, popUpSelector){
        super(popUpSelector)
        this._popUpSelector = popUpSelector;
        this._modalImg =  document.querySelector(".popup__image");
        this._modalText =  document.querySelector(".popup__text");
        this._link = data.link;
        this._name = data.name;
    }

     open(){
			this._modalImg.src = this._link;
			this._modalImg.alt =  this._name;
			this._modalText.textContent =  this._name;	
            super.open();	
    }
}   


