
export class Card {
	constructor({data, handleCardClick}, handleDeleteConfirm, currentUserId, handleLikeClick, cardSelector) {
		this._name = data.name;
		this._link = data.link;
		this._alt = data.name;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._likes = data.likes
		this._card_id = data._id;
		this._owner = data.owner._id;
		this._currentUserId = currentUserId;
		this._handleDeleteConfirm = handleDeleteConfirm.bind(this);
		this._handleLikeClick = handleLikeClick.bind(this);
		this.setLikesInfo = this.setLikesInfo.bind(this);
		
		this._toggleLike = this._toggleLike.bind(this);
		
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
	const statusLikeNewCard = this.isLiked();
	
    this.setLikesInfo(this._likes, !statusLikeNewCard);


	
	if (!myCard) {
		this._checkOwner();
	  };

	return this._element;
}


_handleOpenImgage(){ 

	this._handleCardClick({name: this._name, link: this._link});
}


delCard() {
	this._element.closest('.element').remove();
}

_checkOwner(){
	if ( this._owner != this._currentUserId ) {
		this._element.querySelector('.element__delete-button').remove();
	}
}


isLiked() {
    let status = false;
    for (let i = 0; i < this._likes.length; i++) { 

      if (this._currentUserId == this._likes[i]._id) {
        status = true;
        break;
      }
    }
    return status;

  }



setLikesInfo(likes, status) {

    if (status) {
		this._element.querySelector('.element__like-button').classList.remove('element__like-button_active');
    } else {
		this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
    }
	this._element.querySelector('.element__numberLikes').textContent = likes.length;


    this._likes = likes;

  }
  

  _toggleLike(evt) {
    this._handleLikeClick(evt.target, this._card_id);
  }


_setEventListeners() {

	this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeClick);



	this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
		this._handleDeleteConfirm(this._card_id, evt);
		
	});


	this._element.querySelector('.element__image').addEventListener('click', () =>  this._handleOpenImgage() );
}


}