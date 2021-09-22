import {FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";
// import  PopUp  from "./Popup.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {PopupWithForm} from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js"
import Section from "./Section.js";


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
const addNewCardPopUp = document.querySelector('.popup_new-item-form');
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




const cardListSelector = '.elements';

const cardList = new Section({
	data: initialCards, 
	renderer: (item)=> {
		const card = new Card({
			data: item,
			handleCardClick: () => {
				const openedImage = new PopupWithImage(item, modal);
				openedImage.setEventListeners()
				openedImage.open();
			}
		}, '.card-template');
        const cardElement = card.generateCard();

        cardList.addItem(cardElement);
	}
 }, 
 cardListSelector);
 
cardList.rendererItem();


/* Функции состояние кнопки сабмита */

export function handleSubmitBtnDisabled() {
	submitCreateButton.disabled = true;
	submitCreateButton.classList.add('popup__save-button_inactive');
}



const userInfo = new UserInfo({
	nameSelector: title,
	aboutSelector: subtitle
});


const setUserInfo = () => {
	const userData = userInfo.getUserInfo();
	
	nameInput.value = userData.name;
	jobInput.value = userData.about;
  };

const openedProfileForm = new PopupWithForm({
	popUpSelector: popupProfile,
	formSelector: formProfileElement,
	handleFormSubmit: (data) => {
		userInfo.setUserInfo(data);

		openedProfileForm.close();
	}
});


openedProfileForm.setEventListeners();

editProfileButton.addEventListener('click', ()=> {
	setUserInfo();
	openedProfileForm.open()
});





const openedAddCardForm = new PopupWithForm({ 
	popUpSelector: addNewCardPopUp,
	formSelector: formNewCard,
	handleFormSubmit: (data) => { 
		const newCard = new Card(data, '.card-template');
		const cardElement = newCard.generateCard();
		elements.prepend(cardElement); 
		console.log(data)
    	openedAddCardForm.close();
}
});



openedAddCardForm.setEventListeners();
	
addButton.addEventListener('click', () => {
	openedAddCardForm.open();
});





const formAdd = document.forms.newItemForm;
const formProfile = document.forms.profileForm;

export const config = {
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


