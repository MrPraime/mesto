
export class Card {
	constructor({data, handleCardClick}, handleDeleteConfirm, currentName, handleLikeClick, cardSelector) {
		this._name = data.name;
		this._link = data.link;
		this._alt = data.name;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._likes = data.likes.length
		this._id = data._id;
		this._owner = data.owner.name;
		this._currentName = currentName;
		this._handleDeleteConfirm = handleDeleteConfirm.bind(this);
		this._handleLikeClick = handleLikeClick.bind(this);
		this._liked = data.likes.some((item) => {
		  return item.name === this._currentName;
		});
	
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

generateCard(myCard) {
	this._element = this._getTemplate();
	this._element.querySelector('.element__image').src = this._link;
	this._element.querySelector('.element__text').textContent = this._name;
	this._element.querySelector('.element__image').alt = this._name;
	this._setEventListeners();
	this._setLikes(this._likes);
	if (!myCard) {
		this._checkOwner();
	  };

	return this._element;
}


_handleOpenImgage(){ 

	this._handleCardClick({name: this._name, link: this._link});
}


DelCard() {
	this._element.closest('.element').remove();
}

_checkOwner(){
	if ( this._currentName !== this._owner ) {
		this._element.querySelector('.element__delete-button').remove();
	}
}


_setLikes(count) {
	this._element.querySelector(".element__numberLikes").textContent = count;
	if (this._liked) {
		this._element.querySelector(".element__like-button").classList.add("element__like-button_active");
	  }

  }



_setEventListeners() {

	this._element.querySelector('.element__like-button').addEventListener('click',(evt) => {
		let likeCountElement = evt.target.nextElementSibling;
			if (this._handleLikeClick(this._liked)) {
				evt.target.classList.add('element__like-button_active');
				likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
			this._liked = true;
			} else {
				evt.target.classList.remove('element__like-button_active');
				likeCountElement.textContent = parseInt(likeCountElement.textContent) - 1;
			this._liked = false;
			}
});



	this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
		this._handleDeleteConfirm(this._id, evt);
		
	});


	this._element.querySelector('.element__image').addEventListener('click', () =>  this._handleOpenImgage() );
}


}