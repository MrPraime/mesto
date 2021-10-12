import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popUpSelector){
        super(popUpSelector);
    }

    confirmDeleteCard(confirmDel) {
        this._popup.querySelector('.popup__confirm').addEventListener("click", confirmDel);
    }


}
