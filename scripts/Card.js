export class Card {
	constructor(data, cardSelector) {
	this.name = data.name;
	this.link = data.link;
	this.alt = data.name;
	this._cardSelector = cardSelector;
	}

	_getTemplate() {
		const cardElement = document
		.querySelector(this._cardSelector)
		.content
		.querySelector('.element')
		.cloneNode(true);
		
	  // вернём DOM-элемент карточки
		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._element.querySelector('.element__image').src = this.link;
		this._element.querySelector('.element__text').textContent = this.name;
		this._element.querySelector('.element__image').alt = this.name;
		this._setEventListeners();

		return this._element;
	}
	

	_setEventListeners() {
		this._element.querySelector('.element__like-button').addEventListener('click', () => {
			this._handleLikeCard();
		});

		this._element.querySelector('.element__delete-button').addEventListener('click', () => {
			this._handleDelCard();
		});

		this._element.querySelector('.element__image').addEventListener('click', () => {
			modalImg.src = this._element.querySelector('.element__image').src;
			modalImg.alt = this._element.querySelector('.element__text').textContent;
			modalText.textContent = this._element.querySelector('.element__text').textContent;
			
			openPopup(modal);
		});
	}



	_handleLikeCard() { 
		this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
	}
	
	_handleDelCard() {
		this._element.closest('.element').remove();
	}

	
}