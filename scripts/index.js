const popupProfile = document.querySelector('.popup_edit-form');
const popUp = document.querySelector('.popup');
const closePopupProfileButton = document.querySelector('.popup__close-button-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const formProfileElement = document.querySelector('.popup__form-profile'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_about');
const profileName = popupProfile.querySelector('.popup__form').elements.name;
const about = popupProfile.querySelector('.popup__form').elements.about;
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const popUpNew = document.querySelector('.popup_new-item-form');
const closePopupButtonNew = document.querySelector('.popup__close-button-new');
const elements = document.querySelector('.elements');
const createButton = document.querySelector('.popup__create-button');
const likeButton = document.querySelector('.element__like-button');
const cardTemplate = document.querySelector('#cards').content;
const imageCloseButton = document.querySelector(".popup__close-button_modal");
const modal = document.querySelector('.popup_modal');
const modalImg = document.querySelector(".popup__image");
const modalText = document.querySelector(".popup__text");
const titleImput = document.querySelector('.popup__input_type_title');
const urlImput = document.querySelector('.popup__input_type_url');
const formNewCard = document.querySelector('.popup__form_new_card');
const popupCloseBtn = document.querySelector('.popup__close-button')
const popupList =  Array.from(document.querySelectorAll('.popup'));
const submitCreateButton = document.querySelector('.popup__create-button');


const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	},
	
  ]; 

/* функция создания карточки */
  function createCard(cards) {
	const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

	cardElement.querySelector('.element__image').src = cards.link;
	cardElement.querySelector('.element__text').textContent = cards.name;
	cardElement.querySelector('.element__image').alt = cards.name;
	
	
	cardElement.querySelector('.element__like-button').addEventListener('click', like);
	cardElement.querySelector('.element__delete-button').addEventListener('click', del);
	cardElement.querySelector('.element__image').addEventListener('click', function() {
		modalImg.src = this.src;
		modalImg.alt = this.parentElement.querySelector('.element__text').textContent;
		modalText.textContent = this.parentElement.querySelector('.element__text').textContent;
		openPopup(modal)
	});

	return cardElement;
}

/* функция загрузка созданных карточек из массива*/

  initialCards.forEach(function(cards) {
	elements.prepend(createCard(cards));
  });


/* Функции создания новой карточки */

function handleNewCardFormSubmit(evt) {
	evt.preventDefault();
	const card = { 
		name: titleImput.value,
		link: urlImput.value
	}
	
	elements.prepend(createCard(card));
	closePopup(popUpNew);

	titleImput.value = "";
	urlImput.value = "";

}


/* функция открытия попАпа*/
function openPopup(popUp) {
	popUp.classList.add('popup_is-opened');
	document.addEventListener('keyup', HandlerkeyEsc);
	submitCreateButton.disabled = true;
	submitCreateButton.classList.add('popup__save-button_inactive');
}


/* функция закрытия попАпа*/
function closePopup(popUp) {
	popUp.classList.remove('popup_is-opened');
	document.removeEventListener('keyup', HandlerkeyEsc);
}

/*Функция внесения новых значений из инпуто  в*/
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
	
	const name = nameInput.value;
	const job = jobInput.value;
	
	title.textContent = name;
	subtitle.textContent = job;
	
	closePopup(popupProfile)
}

/*Функция лайков*/
function like(e) {
	e.target.classList.toggle('element__like-button_active');
}

/*Функция удаления карточки */
function del(e) {
	e.target.closest('.element').remove();
}

/*Функция закрытия попапа esc */

function HandlerkeyEsc(evt) {
	if (evt.key === "Escape") {
		const popupActive = document.querySelector('.popup_is-opened')
		closePopup(popupActive);
	}
}

/* закрытие попапап по оверлею*/
function closeOnOverlay(evt) {	
    if (
      evt.target.matches(".popup__close-button-profile") ||
      !evt.target.closest(".popup__content")
    ) {
		const popupActive = document.querySelector('.popup_is-opened')
		closePopup(popupActive);
    }
}

popupList.forEach(function (evt) {
	evt.addEventListener('mousedown', closeOnOverlay);
});


editProfileButton.addEventListener('click', function() {
	profileName.value = title.textContent;
	about.value = subtitle.textContent;
	openPopup(popupProfile)});


	
addButton.addEventListener('click', function() {
	  openPopup(popUpNew);
});
closePopupProfileButton.addEventListener('click',  function() {closePopup(popupProfile) });
closePopupButtonNew.addEventListener('click', function() 
{closePopup(popUpNew)});
imageCloseButton.addEventListener('click', function() {closePopup(modal)});
formNewCard.addEventListener('submit', handleNewCardFormSubmit);
formProfileElement.addEventListener('submit', handleProfileFormSubmit);


const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__save-button',
	inactiveButtonClass: 'popup__save-button_inactive',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_active',
}

enableValidation(config);
