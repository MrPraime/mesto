
import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popUpSelector){
        super(popUpSelector)
        this._popUpSelector = popUpSelector;
        this._modalImg =  document.querySelector(".popup__image");
        this._modalText =  document.querySelector(".popup__text");
    }

     open(name, link) {
			this._modalImg.setAttribute('src', link);
			this._modalImg.setAttribute('src', link);
			this._modalText.textContent =  name;	
            super.open();	
    }
}   



