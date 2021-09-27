
export class Card {
		constructor({data, handleCardClick}, cardSelector) {
			this._name = data.name;
			this._link = data.link;
			this._alt = data.name;
			this._cardSelector = cardSelector;
			this._handleCardClick = handleCardClick;
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
		this._element.querySelector('.element__image').src = this._link;
		this._element.querySelector('.element__text').textContent = this._name;
		this._element.querySelector('.element__image').alt = this._name;
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

		this._element.querySelector('.element__image').addEventListener('click', () =>  this._handleOpenImgage(this._link, this._name) );
}

	_handleOpenImgage(){ 
		// const image = this._element.querySelector('.element__image');
		// const title = this._element.querySelector('.element__text')

	    this._handleCardClick({name: this._name, link: this._link});
	}

	_handleLikeCard() { 
		this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
	}
	
	_handleDelCard() {
		this._element.closest('.element').remove();
	}

	
}

