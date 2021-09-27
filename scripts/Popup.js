import {handleSubmitBtnDisabled} from "./index.js";

export default class Popup {
    constructor(popUpSelector){
        this._popUpSelector = popUpSelector;
        }

    open(){
        this._popUpSelector.classList.add('popup_is-opened');
        	handleSubmitBtnDisabled()
        }

    close(){
        this._popUpSelector.classList.remove('popup_is-opened');
        	// document.forms["newItemForm"].reset();
        	// document.forms["profileForm"].reset();
        }

    setEventListeners(){

        this._popUpSelector.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        });

        document.addEventListener('keydown', (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        });

        this._popUpSelector.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
              this.close();
            }
          });
    }
}