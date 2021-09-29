const popupProfile = document.querySelector('.popup_edit-form');
const editProfileButton = document.querySelector('.profile__edit-button');
const formProfileElement = document.querySelector('.popup__form-profile'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_about');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const addNewCardPopUp = document.querySelector('.popup_new-item-form');
const elements = document.querySelector('.elements');
const modal = document.querySelector('.popup_modal');
const titleImput = document.querySelector('.popup__input_type_title');
const urlImput = document.querySelector('.popup__input_type_url');
const formNewCard = document.querySelector('.popup__form_new_card');
const cardListSelector = '.elements';

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


  const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__save-button',
	inactiveButtonClass: 'popup__save-button_inactive',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_active',
}

const formAdd = document.forms.newItemForm;
const formProfile = document.forms.profileForm;

export {popupProfile, editProfileButton, formProfileElement, nameInput, jobInput, title, subtitle,addButton, 
    addNewCardPopUp, elements, modal, titleImput, urlImput, formNewCard, cardListSelector, initialCards, config, formAdd,formProfile }