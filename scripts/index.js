import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

export {openPopup};


const popupProfile = document.querySelector('.popup_edit-form');
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
const imageCloseButton = document.querySelector(".popup__close-button_modal");
const modal = document.querySelector('.popup_modal');
const titleImput = document.querySelector('.popup__input_type_title');
const urlImput = document.querySelector('.popup__input_type_url');
const formNewCard = document.querySelector('.popup__form_new_card');
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


initialCards.forEach((item) => {
	// Создадим экземпляр карточки
	const card = new Card(item,'.card-template');
	// Создаём карточку и возвращаем наружу
	const cardElement = card.generateCard();
  
	// Добавляем в DOM
	elements.append(cardElement);
  }); 


/* Функции состояние кнопки сабмита */

function handleSubmitBtnDisabled() {
	submitCreateButton.disabled = true;
	submitCreateButton.classList.add('popup__save-button_inactive');
}


/* функция открытия попАпа*/
 function openPopup(popUp) {
	popUp.classList.add('popup_is-opened');
	document.addEventListener('keyup', handlerKeyEsc);
	handleSubmitBtnDisabled()
}


/* функция закрытия попАпа*/
 function closePopup(popUp) {
	popUp.classList.remove('popup_is-opened');
	document.removeEventListener('keyup', handlerKeyEsc);
	document.forms["newItemForm"].reset();
	document.forms["profileForm"].reset();
}

/* Функции добавления новой карточки */

function handleNewCardFormSubmit(evt) {
	evt.preventDefault();
	const newCardUrl = urlImput.value;
	const newCardTitle = titleImput.value;
	const NewCardItem = {
		name: newCardTitle,
		link: newCardUrl
	}

	// Создадим экземпляр карточки
	const newCard = new Card(NewCardItem,'.card-template');
	// Создаём карточку и возвращаем наружу
	const cardElement = newCard.generateCard();
	
	elements.prepend(cardElement); 
	closePopup(popUpNew);

	titleImput.value = "";
	urlImput.value = "";
}


/*Функция внесения новых значений из инпутов*/
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
	
	const name = nameInput.value;
	const job = jobInput.value;
	
	title.textContent = name;
	subtitle.textContent = job;
	
	closePopup(popupProfile)
}

/*Функция закрытия попапа esc */

function handlerKeyEsc(evt) {
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


const formAdd = document.forms.newItemForm;
const formProfile = document.forms.profileForm;

const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__save-button',
	inactiveButtonClass: 'popup__save-button_inactive',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_active',
}

const addFormValidator  = new FormValidator (config, formAdd);
const editProfileFormValidator  = new FormValidator (config, formProfile);

addFormValidator.enableValidation();
editProfileFormValidator.enableValidation();


