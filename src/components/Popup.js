export default class Popup {
    constructor(popUpSelector){
        this._popUpSelector = popUpSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        }

    open(){
        this._popUpSelector.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
        }

    close(){
        this._popUpSelector.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
        }

    _handleEscClose(evt) {       
        if (evt.key === "Escape"){
            this.close();
        };
    };
        

    setEventListeners(){

        this._popUpSelector.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        });
        
 
        this._popUpSelector.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
              this.close();
            }
          });
    }
}